import axios from 'axios'
import { print } from 'graphql/language/printer'

export default async function generateNavigationsJSON({
  endpoint,
  graphQLQuery,
  sections = []
}) {
  console.log('📡 generate navigations JSON...')
  const navigations = {}

  try {
    // load all entries for each section
    for (const section of sections) {
      const pages = await axios
        .post(
          endpoint,
          {
            // have to retransform AST gql template literal back to query string:
            // https://stackoverflow.com/a/57873339/1121268
            query: print(graphQLQuery),
            variables: { section }
          }
          // {
          //   headers: {
          //     Authorization: `Bearer ${env.GRAPHQL_TOKEN_LOCAL}`
          //   }
          // }
        )
        .then(({ data }) => {
          return data.entries
        })

      navigations[section] = pages
    }

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
