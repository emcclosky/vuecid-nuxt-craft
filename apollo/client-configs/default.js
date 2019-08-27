import {
  IntrospectionFragmentMatcher,
  InMemoryCache
} from 'apollo-cache-inmemory'
import introspectionQueryResultData from '../fragmentTypes.json'
import config from '~/config.js'

export default function({ isDev }) {
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
  })
  const token = isDev
    ? config.env.GRAPHQL_TOKEN_LOCAL
    : config.env.GRAPHQL_TOKEN
  const endpoint = isDev
    ? `${config.env.BACKENDURLLOCAL}${config.env.GRAPHQL_PATH}`
    : `${config.env.BACKENDURLPRODUCTION}${config.env.GRAPHQL_PATH}`
  const cache = new InMemoryCache({ fragmentMatcher })

  console.log('token: ', token)
  console.log('endpoint: ', endpoint)

  return {
    httpEndpoint: endpoint,
    // httpLinkOptions: {
    //   fetchOptions: {
    //     mode: 'cors' // Cors Needed for external Cross origins, need to allow headers from server
    //   },
    //   credentials: 'omit' // must be omit to support application/json content type
    // },
    // httpEndpoint: 'https://cms.lucid.build/api',
    getAuth: () => `Bearer ${token}`, // use this method to overwrite functions
    cache
  }
}
