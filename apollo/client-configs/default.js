
// export default function(context) {
//   const token =
//     'Uzwv98bNdEu0JNyOUtxxhD5d8ub6-DPXZfPsvYQXXmlWgb3Xyc6txbX92PaslqVj'
//   const endpoint = `${config.env.BACKENDURLPRODUCTION}/api`
//
//   return {
//     httpEndpoint: endpoint,
//     // httpEndpoint: 'https://cms.lucid.build/api',
//     getAuth: () => `Bearer ${token}` // use this method to overwrite functions
//   }
// }

import ApolloClient from 'apollo-client'
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { HttpLink } from 'apollo-link-http'
import introspectionQueryResultData from '../fragmentTypes.json'
import config from '../../config'

const token = 'Uzwv98bNdEu0JNyOUtxxhD5d8ub6-DPXZfPsvYQXXmlWgb3Xyc6txbX92PaslqVj'
const endpoint = `${config.env.BACKENDURLPRODUCTION}/api`

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
})

// const cookies = new Cookies()
const httpLink = new HttpLink({ uri: endpoint })
const cache = new InMemoryCache({ fragmentMatcher })

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      authorization: `Bearer ${token}`
    }
  }
})

export const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink)
})

// import { ApolloLink } from 'apollo-link'
// import { HttpLink } from 'apollo-link-http'
// import { InMemoryCache } from 'apollo-cache-inmemory'
//
// export default ctx => {
//   const httpLink = new HttpLink({ uri: 'https://cms.lucid.build/api' })
//
//   // middleware
//   const middlewareLink = new ApolloLink((operation, forward) => {
//     // This function is called before every request. Update ctx.req.session and window.__NUXT__.state.session
//     // To point to wherever you store your token
//     // const token = process.server
//     //   ? ctx.req.session
//     //   : window.__NUXT__.state.session
//
//     const token = 'Uzwv98bNdEu0JNyOUtxxhD5d8ub6-DPXZfPsvYQXXmlWgb3Xyc6txbX92PaslqVj'
//
//     operation.setContext({
//       headers: {
//         authorization: `Bearer ${token}`
//       }
//     })
//     return forward(operation)
//   })
//   const link = middlewareLink.concat(httpLink)
//
//   return {
//     link,
//     cache: new InMemoryCache()
//   }
// }
