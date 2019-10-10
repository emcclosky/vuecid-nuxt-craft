import axios from 'axios'
import { print } from 'graphql/language/printer'

export default async function(
  options = {
    params: {}, // we need the slug
    query: '', // query params, we are looking for tokens
    env: {},
    graphQLQuery: '', // the passed .gql files content
    specificSlug: false // if we want to pass a specific slug, like 'home'
  }
) {
  const { query, params, env, graphQLQuery, specificSlug } = options

  // If we see a preview token we need axios to fetch the data
  // Because with apollo we can't send the bearer token AND the craft token at the same time
  if (query['x-craft-preview'] && query.token) {
    console.info('Preview is displayed!') // eslint-disable-line

    // const endpoint = `${env.BACKENDURLPRODUCTION}${env.GRAPHQL_PATH}?token=${query.token}`
    const endpoint = `${env.BACKENDURLLOCAL}${env.GRAPHQL_PATH}?token=${query.token}`

    const previewData = await axios
      .post(
        endpoint,
        {
          // have to retransform AST gql template literal back to query string:
          // https://stackoverflow.com/a/57873339/1121268
          query: print(graphQLQuery),
          variables: {
            slug: specificSlug || params.slug
          }
        },
        {
          headers: {
            Authorization: `Bearer ${env.GRAPHQL_TOKEN_LOCAL}`
          }
        }
      )
      .then(result => {
        if (
          result &&
          result.data &&
          result.data.data &&
          result.data.data.entries[0]
        ) {
          return result.data.data.entries[0]
        } else {
          console.warn('Tried to fetch a preview, but no entries found from axios request') // eslint-disable-line
          return false
        }
      })
      .catch(error => {
        console.log('error: ', error) // eslint-disable-line
      })

    return {
      page: previewData,
      preview: true
    }
  }
  return false
}
