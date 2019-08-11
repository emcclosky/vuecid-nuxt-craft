import {
  IntrospectionFragmentMatcher,
  InMemoryCache
} from 'apollo-cache-inmemory'
import config from '../../config'
import introspectionQueryResultData from '../fragmentTypes.json'

export default function(context) {
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
  })
  const token =
    'Uzwv98bNdEu0JNyOUtxxhD5d8ub6-DPXZfPsvYQXXmlWgb3Xyc6txbX92PaslqVj'
  const endpoint = `${config.env.BACKENDURLPRODUCTION}/api`
  const cache = new InMemoryCache({ fragmentMatcher })

  return {
    httpEndpoint: endpoint,
    // httpEndpoint: 'https://cms.lucid.build/api',
    getAuth: () => `Bearer ${token}`, // use this method to overwrite functions
    cache
  }
}
