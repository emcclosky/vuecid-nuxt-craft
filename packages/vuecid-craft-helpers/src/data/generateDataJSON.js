import axios from 'axios'
import { print } from 'graphql/language/printer'
import saveFile from '../utilities/saveFile.js'

/* eslint-disable no-console */

export default async function generateDataJSON({
  endpoint,
  graphQLQuery,
  compressJSON = true,
  sections = [],
  propertiesToFilter = [],
  savePath,
  bundleName,
  langs = []
} = {}) {
  const entries = {}
  try {
    // Actually for each language is equal to each craft site in a multisite setup!
    for (const language of langs) {
      entries[language.lang] = {}
      // load all entries for each section
      for (const section of sections) {
        let pages = await axios
          .post(endpoint, {
            // have to retransform AST gql template literal back to query string:
            // https://stackoverflow.com/a/57873339/1121268
            query: print(graphQLQuery),
            variables: {
              section,
              site: language.handle || 'default'
            }
          })
          .then(({ data }) => {
            return data.data.entries
          })

        // filter out entries, that should not appear in JSON
        // Assuming that the property is a checkbox, where craft returns an empty array if false.
        // e.g.: "appearsInNavigation": [] || "appearsInNavigation": ["true"],
        if (propertiesToFilter && propertiesToFilter.length) {
          propertiesToFilter.forEach(property => {
            pages = pages.filter(page => {
              // if the entry does not even have the key we return
              if (!page[property]) return true
              // check if first array item is true, then leave entry in array
              return page[property][0] ? page[property][0] : false
            })
          })
        }

        // save sections in language object
        entries[language.lang][section] = pages
      }
    }
    console.log(`📡 Fetched entries: `, entries)

    // save entries for each site in one file
    saveFile({
      data: entries,
      bundleName,
      savePath,
      compressJSON
    })
  } catch (e) {
    console.log('generateDataJSON: 💾❌ loadentries() action failed 😢: ', e)
  }
}
