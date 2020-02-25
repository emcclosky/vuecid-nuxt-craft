/* eslint-disable no-console */
import { generateDataJSON } from '@wearelucid/vuecid-craft-helpers'
// import generateDataJSON from './packages/vuecid-craft-helpers/dist/data/generateDataJSON.js'
import config from './config.js'

// gql files can't just be imported in node: https://github.com/ardatan/graphql-import-node
import 'graphql-import-node'
import pages from './apollo/queries/navigations.gql'
import allEntries from './apollo/queries/allEntries.gql'
import globals from './apollo/queries/globals.gql'

// Parse terminal arguments with minimist
const argv = require('minimist')(process.argv.slice(2))

// By default we use local Db, only if command `$ yarn fetch --production` is used, we fetch from remote
const useLocalDB = !argv.production

const endpoint = useLocalDB
  ? `${config.env.BACKENDURLLOCAL}${config.env.GRAPHQL_PATH}`
  : `${config.env.BACKENDURLPRODUCTION}${config.env.GRAPHQL_PATH}`

console.log('endpoint: ', endpoint)

function fetchNavigations() {
  console.log('📡 Fetch navigations...')
  // List the craft sections that should be fetched to generate the navigations JSON
  const sections = config.sections
  const langs = config.env.LANGS
  const graphQLQuery = pages

  const settings = {
    endpoint,
    graphQLQuery,
    compressJSON: true, // setting this to false may help debugging :-)
    sections,
    propertiesToFilter: ['appearsInNavigation'],
    bundleName: 'navigations',
    savePath: './static/data',
    langs
  }

  generateDataJSON(settings)
}

function fetchGlobalSettings() {
  console.log('📡 Fetch global settings...')
  // List the craft sections that should be fetched to generate the navigations JSON
  const langs = config.env.LANGS
  const graphQLQuery = globals

  const settings = {
    endpoint,
    graphQLQuery,
    compressJSON: true, // setting this to false may help debugging :-)
    bundleName: 'globals',
    graphQLQueryName: 'globalSet', // if passed specifically this property of object is returned, if not defined 'entries' is taken
    savePath: './static/data',
    langs
  }

  generateDataJSON(settings)
}

function fetchAllEntriesWithRoute() {
  console.log('📡 Fetch all entries...')
  // List the craft sections that should be fetched to generate the navigations JSON
  const sections = config.sectionsWithRoute
  const langs = config.env.LANGS
  const graphQLQuery = allEntries

  const settings = {
    endpoint,
    graphQLQuery,
    compressJSON: true, // setting this to false may help debugging :-)
    sections,
    bundleName: 'allEntries',
    savePath: './static/data',
    langs
  }

  generateDataJSON(settings)
}

fetchNavigations()
fetchGlobalSettings()
fetchAllEntriesWithRoute()
