import axios from 'axios'
import { print } from 'graphql/language/printer'
import saveFile from '../utilities/saveFile.js'

export default async function generateNavigationsJSON({
  endpoint,
  graphQLQuery,
  sections = [],
  fileName,
  savePath
}) {
  const navigations = {}

  try {
    // load all entries for each section
    for (const section of sections) {
      const pages = await axios
        .post(endpoint, {
          // have to retransform AST gql template literal back to query string:
          // https://stackoverflow.com/a/57873339/1121268
          query: print(graphQLQuery),
          variables: {
            section
          }
        })
        .then(({ data }) => {
          return data.data.entries
        })

      navigations[section] = pages
    }

    console.log('📡 Fetched navigations: ', navigations)

    saveFile(navigations, fileName, savePath)

    // // filter out sections which match ignoreProperties
    // if (payload.ignore) {
    //   payload.ignore.forEach(propertyToIgnore => {
    //     navigations[section] = pages.filter(page => {
    //       // if the entry does not even have the key we return
    //       if (!(propertyToIgnore.key in page)) return true
    //       // leave in array if the key is != the value
    //       return page[propertyToIgnore.key] !== propertyToIgnore.value
    //     })
    //   })
    // } else {
    //   navigations[section] = pages
    // }
  } catch (e) {
    console.log(
      'generateNavigationJSON: 💾❌ loadNavigations() action failed 😢: ',
      e
    )
  }
}
