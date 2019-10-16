/* eslint-disable no-console */
import { generateNavigationsJSON } from '@wearelucid/vuecid-craft-helpers'
import config from './config.js'

// gql files can't just be imported in node: https://github.com/ardatan/graphql-import-node
import 'graphql-import-node'
import pages from './apollo/queries/navigations.gql'

function fetchNavigations() {
  console.log('📡 Fetch navigations...')
  // List the craft sections that should be fetched to generate the navigations JSON
  const sections = config.sections
  const langs = config.env.LANGS
  const endpoint = `${config.env.BACKENDURLLOCAL}${config.env.GRAPHQL_PATH}`
  const graphQLQuery = pages

  const settings = {
    endpoint,
    graphQLQuery,
    compressJSON: true, // setting this to false may help debugging :-)
    sections,
    bundleName: 'navigations',
    savePath: './static/data',
    langs
  }

  generateNavigationsJSON(settings)
}

fetchNavigations()
