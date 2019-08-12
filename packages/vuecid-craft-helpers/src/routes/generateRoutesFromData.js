import gql from 'graphql-tag'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'node-fetch'

export default async function generateRoutesFromData(
  options = {
    api: [],
    query: '',
    token: '',
    bundle: '',
    homeSlug: 'home',
    errorPrefix: 'error-'
  }
) {
  const uri = 'https://cms.lucid.build/api'
  const token =
    'Uzwv98bNdEu0JNyOUtxxhD5d8ub6-DPXZfPsvYQXXmlWgb3Xyc6txbX92PaslqVj'

  const httpLink = createHttpLink({ uri, fetch })

  const authLink = setContext((_, { headers }) => {
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`
      }
    }
  })

  const cache = new InMemoryCache()

  const GET_PAGES = gql`
    {
      entries(section: [pages]) {
        slug
        uri
      }
    }
  `

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache
  })

  let routes = ['default/default']

  await client
    .query({
      query: GET_PAGES
    })
    .then(result => {
      routes = result.data.entries.map(r => r.uri)
    })
    .catch(error => {
      console.log('error: ', error) // eslint-disable-line no-console
    })

  return routes
}
