export default function(context) {
  const token =
    'Uzwv98bNdEu0JNyOUtxxhD5d8ub6-DPXZfPsvYQXXmlWgb3Xyc6txbX92PaslqVj'

  return {
    httpEndpoint: 'https://cms.lucid.build/api',
    getAuth: () => `Bearer ${token}` // use this method to overwrite functions
  }
}

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
