import config from './config.js'
import generateNavigationsJSON from './packages/vuecid-craft-helpers/src/navigation/generateNavigationsJSON.js'
import pages from './apollo/queries/navigations'

export default function fetchNavigations() {
  console.log('📡 Fetch navigations...')
  // List the craft sections that should be fetched to generate the navigations JSON
  const sections = ['pages']
  const endpoint = `${config.env.BACKENDURLLOCAL}${config.env.GRAPHQL_PATH}`
  const graphQLQuery = pages

  generateNavigationsJSON({ sections, endpoint, graphQLQuery })
}
