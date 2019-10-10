/* eslint-disable no-console */
import axios from 'axios'
import { print } from 'graphql/language/printer'
import gql from 'graphql-tag'
import config from './config.js'
import { generateNavigationsJSON } from './packages/vuecid-craft-helpers/dist/index.js'

// gql files can't just be imported in node: https://github.com/ardatan/graphql-import-node
import 'graphql-import-node'
import pages from './apollo/queries/navigations.gql'

function fetchNavigations() {
  console.log('📡 Fetch navigations...')
  // List the craft sections that should be fetched to generate the navigations JSON
  const sections = ['pages']
  const endpoint = `${config.env.BACKENDURLLOCAL}${config.env.GRAPHQL_PATH}`
  const graphQLQuery = pages

  const settings = {
    endpoint,
    graphQLQuery,
    compressJSON: true, // setting this to false may help debugging :-)
    sections,
    fileName: 'navigations.json',
    savePath: './static/data'
  }

  generateNavigationsJSON(settings)
}

fetchNavigations()
