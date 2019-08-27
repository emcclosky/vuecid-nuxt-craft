import axios from 'axios'
import {
  removeTrailingSlash,
  verifyLeadingSlash
} from '@wearelucid/vuecid-helpers'

async function generateRoutesFromData(
  options = {
    endpoint: '',
    section: 'pages',
    token: '',
    homeSlug: 'home'
  }
) {
  const { token, endpoint, section } = options

  // Fetch all sections with the specified section name from your GraphQL API
  let routes = await axios
    .post(
      endpoint,
      { query: `{ entries (section: [${section}]) { uri } }` },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(result => {
      if (result.data.data.entries) {
        return result.data.data.entries.map(r => r.uri)
      } else {
        throw new Error(
          'No sections found with this query. -> check return value from axios request: ',
          result
        )
      }
    })
    .catch(error => {
      console.log('error: ', error) // eslint-disable-line no-console
    })

  if (!routes) {
    throw new Error('❌ No routes could be fetched')
  } else {
    console.log('📩 uccessfully fetch routes: ', routes) // eslint-disable-line no-console
  }

  // Kick out all the pages containing the home slug
  // This could also delete a page that contains a string like '…/home…'
  // maybe a page with the permalink /pages/something/home-sweet-home
  // Sadly this step is necessary since we can not redirect() with our middleware during generate
  routes = routes
    .filter(r => !r.includes(`/${options.homeSlug}`))
    .map(r => verifyLeadingSlash(removeTrailingSlash(r)))

  return routes
}

export default generateRoutesFromData
