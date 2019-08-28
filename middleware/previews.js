import gql from 'graphql-tag'
import logV from '~/util/logV'
const m = 'middleware/previews'

export default async function ({ isServer, req, route, redirect, env, $axios }) {
  // logV(m, '📞 Middleware called!')
  // logV(m, 'route: ', route)

  // console.log('arguments: ', arguments)

  // If nuxt generate, pass this middleware
  if (isServer && !req) return
  if (route.query['x-craft-preview'] && route.query.token) {
    const endpoint = `${env.BACKENDURLPRODUCTION}${env.GRAPHQL_PATH}?token=${route.query.token}`
    console.log('endpoint: ', endpoint)

    const routes = await $axios
      .post(
        endpoint,
        { query: `{ entries(section: [pages], slug: "bart-simpson-loves-skateboarding") {
            slug
            title
            ...on Pages {
              richtext {
                totalPages
                content
              }
            }
            }
          }`
        },
        { headers: { Authorization: `Bearer ${env.GRAPHQL_TOKEN}` } }
      )
      .then(result => {
        console.log('result: ', result.data.data.entries)
      })
      .catch(error => {
        console.error('error: ', error)
      })

    // await $axios
    //   .post(
    //     endpoint,
    //     {
    //       query: gql`
    //         query Page($slug: String!) {
    //           entries(section: [pages], slug: "bart-simpson-loves-skateboarding") {
    //             slug
    //             title
    //             ...on Pages {
    //               richtext {
    //                 totalPages
    //                 content
    //               }
    //             }
    //           }
    //         }
    //       `
    //     },
    //     { headers: { Authorization: 'Bearer ' + env.GRAPHQL_TOKEN } }
    //   )
    //   .then(result => {
    //     console.log('result: ', result.data)
    //   })
    //   .catch(error => {
    //     console.error('error: ', error)
    //   })

    // const {data} = await axios.post(
    //   process.env.BACKEND_URL + process.env.GRAPHQL_PATH,
    //   {query: '{entries(section: []) {uri}}'},
    //   {headers: {'Authorization': 'Bearer ' + process.env.GRAPHQL_TOKEN}},
    // );

    return redirect(`${route.path}?preview=true`)
  }
}
