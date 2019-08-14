import {
  IntrospectionFragmentMatcher,
  InMemoryCache
} from 'apollo-cache-inmemory'
import introspectionQueryResultData from '../fragmentTypes.json'

export default function({ env }) {
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
  })
  const token = env.GRAPHQL_TOKEN
  const endpoint = `${env.BACKEND_URL_PRODUCTION}${env.GRAPHQL_PATH}`
  const cache = new InMemoryCache({ fragmentMatcher })

  return {
    httpEndpoint: endpoint,
    // httpEndpoint: 'https://cms.lucid.build/api',
    getAuth: () => `Bearer ${token}`, // use this method to overwrite functions
    cache
  }
}
