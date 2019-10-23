import axios from 'axios'
import { print } from 'graphql/language/printer'
import saveFile from '../utilities/saveFile.js'

/* eslint-disable no-console */

export default async function generateDataJSON({
  endpoint,
  graphQLQuery,
  compressJSON = true,
  sections = [],
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
        const pages = await axios
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

    // // filter out sections which match ignoreProperties
    // if (payload.ignore) {
    //   payload.ignore.forEach(propertyToIgnore => {
    //     entries[section] = pages.filter(page => {
    //       // if the entry does not even have the key we return
    //       if (!(propertyToIgnore.key in page)) return true
    //       // leave in array if the key is != the value
    //       return page[propertyToIgnore.key] !== propertyToIgnore.value
    //     })
    //   })
    // } else {
    //   entries[section] = pages
    // }
  } catch (e) {
    console.log('generateDataJSON: 💾❌ loadentries() action failed 😢: ', e)
  }
}
