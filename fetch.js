/* eslint-disable no-console, import/no-duplicates */

import { saveFile } from '@wearelucid/vuecid-craft-helpers'
// import saveFile from './packages/vuecid-craft-helpers/dist/utilities/saveFile.js'

import { fetchFromGraphQL } from '@wearelucid/vuecid-craft-helpers'
// import fetchFromGraphQL from './packages/vuecid-craft-helpers/dist/data/fetchFromGraphQL.js'

import { generateDataJSON } from '@wearelucid/vuecid-craft-helpers'
// import generateDataJSON from './packages/vuecid-craft-helpers/dist/data/generateDataJSON.js'

import { addLanguagePrefixes } from '@wearelucid/vuecid-craft-helpers'
// import addLanguagePrefixes from './packages/vuecid-craft-helpers/dist/navigation/addLanguagePrefixes.js'

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

async function fetchNavigations() {
  console.log('📡 Fetch navigations...')
  // List the craft sections that should be fetched to generate the navigations JSON
  const sections = config.sections
  const langs = config.env.LANGS
  const graphQLQuery = pages

  const settings = {
    endpoint,
    graphQLQuery,
    sections,
    propertiesToFilter: ['appearsInNavigation'],
    langs
  }

  // fetch data without saving (we need to run some specific transforms first)
  // also it is impossible to pass on the transforms to the generateDataJSON function,
  // because some options that we need to pass are very speficic
  let data = await fetchFromGraphQL(settings)

  // transform the data
  // all the entries which belong non-default language, should be prefixed with the locale
  data = addLanguagePrefixes({
    data,
    defaultLanguage: config.env.DEFAULTLANG
  })

  // and now save file to .json, which is normally done by generateDataJSON()
  saveFile({
    data,
    bundleName: 'navigations',
    savePath: './static/data',
    compressJSON: true // setting this to false may help debugging :-)
  })
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

  // fetch and save
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

  // fetch and save
  generateDataJSON(settings)
}

fetchNavigations()
fetchGlobalSettings()
fetchAllEntriesWithRoute()
