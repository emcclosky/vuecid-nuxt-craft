import axios from 'axios'

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

    const endpoint = `${env.BACKENDURLPRODUCTION}${env.GRAPHQL_PATH}?token=${query.token}`

    const previewData = await axios
      .post(
        endpoint,
        {
          query: graphQLQuery.loc.source.body,
          variables: { slug: specificSlug || params.slug }
        },
        { headers: { Authorization: `Bearer ${env.GRAPHQL_TOKEN}` } }
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
