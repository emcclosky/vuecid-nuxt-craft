// import { createLogger } from '@wearelucid/vue-bows'
import { onError } from 'apollo-link-error'
// import { RetryLink } from 'apollo-link-retry'
import {
  IntrospectionFragmentMatcher,
  InMemoryCache
} from 'apollo-cache-inmemory'
import introspectionQueryResultData from '../fragmentTypes.json'
import config from '~/config.js'

// const log = createLogger('Default Apollo Config') // replace name with something meaningful

export default function(ctx) {
  console.log('ctx: ', ctx)

  console.log('process.env: ', process.env)
  console.log('process.env.NETLIFY: ', process.env.NETLIFY)

  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
  })

  // const retryLink = new RetryLink({
  //   delay: {
  //     initial: 300,
  //     max: Infinity,
  //     jitter: true
  //   },
  //   attempts: {
  //     max: 5,
  //     retryIf: (error, _operation) => !!error
  //   }
  // })

  const endpoint = ctx.isDev
    ? `${config.env.BACKENDURLLOCAL}${config.env.GRAPHQL_PATH}`
    : `${config.env.BACKENDURLPRODUCTION}${config.env.GRAPHQL_PATH}`

  const cache = new InMemoryCache({
    fragmentMatcher
  })

  const errorLink = onError(
    ({ graphQLErrors, networkError, response, operation }) => {
      console.log('response: ', response) // eslint-disable-line no-console
      console.log('operation: ', operation) // eslint-disable-line no-console
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) => {
          console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`) // eslint-disable-line
        })
      }
      if (networkError) {
        console.log('networkError: ', networkError) // eslint-disable-line
      }
    }
  )

  return {
    link: errorLink,
    // link: retryLink,
    httpEndpoint: endpoint,
    httpLinkOptions: {
      credentials: 'include',
      fetchOptions: {
        mode: 'cors' // Cors Needed for external Cross origins, need to allow headers from server
      }
    },
    // getAuth: () => `Bearer ${token}`,
    cache
  }
}
