import {
  IntrospectionFragmentMatcher,
  InMemoryCache
} from 'apollo-cache-inmemory'
import introspectionQueryResultData from '../fragmentTypes.json'
import config from '~/config.js'

export default function() {
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
  })
  const token = config.env.GRAPHQL_TOKEN
  const endpoint = `${config.env.BACKENDURLPRODUCTION}${config.env.GRAPHQL_PATH}`
  const cache = new InMemoryCache({ fragmentMatcher })

  return {
    httpEndpoint: endpoint,
    // httpEndpoint: 'https://cms.lucid.build/api',
    getAuth: () => `Bearer ${token}`, // use this method to overwrite functions
    cache
  }
}
