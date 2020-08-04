import axios from 'axios'
import { print } from 'graphql/language/printer'
/* eslint-disable no-console */

async function fetch({
  endpoint,
  graphQLQuery,
  section,
  graphQLQueryName,
  language,
  propertiesToFilter,
}) {
  let result = await axios
    .post(endpoint, {
      // have to retransform AST gql template literal back to query string:
      // https://stackoverflow.com/a/57873339/1121268
      query: print(graphQLQuery),
      variables: {
        section, // may be undefined...
        site: language.handle || 'default',
      },
    })
    .then(({ data }) => {
      return data.data[graphQLQueryName]
    })

  // filter out entries, that should not appear in JSON
  // Assuming that the property is a checkbox, where craft returns an empty array if false.
  // e.g.: "appearsInNavigation": [] || "appearsInNavigation": ["true"],
  if (propertiesToFilter && propertiesToFilter.length) {
    propertiesToFilter.forEach((property) => {
      result = result.filter((entry) => {
        // if the entry does not even have the key we return
        if (!entry[property]) return true
        // check if first array item is true, then leave entry in array
        return entry[property][0] ? entry[property][0] : false
      })
    })
  }

  return result
}

export default async function fetchFromGraphQL({
  endpoint,
  graphQLQuery,
  sections = [],
  graphQLQueryName = 'entries', // normally 'entries' are returned, but in other cases we need to pass the query name like 'globalSet'
  langs = [],
  transforms = [],
  propertiesToFilter,
} = {}) {
  const entries = {}
  try {
    // Actually for each language is equal to each craft site in a multisite setup!
    for (const language of langs) {
      entries[language.lang] = {}

      // check if we have to fetch section specific content
      if (sections.length) {
        // load all entries for each section
        for (const section of sections) {
          // save sections in language object
          entries[language.lang][section] = await fetch({
            endpoint,
            graphQLQuery,
            section,
            graphQLQueryName,
            language,
            propertiesToFilter,
          })
        }
      } else {
        // for example when fetching globals
        // save sections in language object
        entries[language.lang] = await fetch({
          endpoint,
          graphQLQuery,
          graphQLQueryName,
          language,
          propertiesToFilter,
        })
      }
    }
    console.log(`📡 Fetched entries: `, entries)
    return entries
  } catch (e) {
    console.log('fetchFromGraphQL: 📡❌ fetching failed 😢: ', e)
  }
}
