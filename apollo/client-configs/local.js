import { createLogger } from '@wearelucid/vue-bows'
import {
  IntrospectionFragmentMatcher,
  InMemoryCache
} from 'apollo-cache-inmemory'
import introspectionQueryResultData from '../fragmentTypes.json'
import config from '~/config.js'

const log = createLogger('Default Apollo Config') // replace name with something meaningful

export default function({ isDev }) {
  console.log('arguments: ', arguments)

  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
  })
  // Even if we have this set as local we don't want to use a
  // local backend when deploying...
  const token = isDev
    ? config.env.GRAPHQL_TOKEN_LOCAL
    : config.env.GRAPHQL_TOKEN
  const endpoint = isDev
    ? `${config.env.BACKENDURLLOCAL}${config.env.GRAPHQL_PATH}`
    : `${config.env.BACKENDURLPRODUCTION}${config.env.GRAPHQL_PATH}`
  const cache = new InMemoryCache({ fragmentMatcher })

  log('token: ', token.substring(0, 10))
  log('endpoint: ', endpoint)

  return {
    httpEndpoint: endpoint,
    getAuth: () => `Bearer ${token}`,
    cache
  }
}
