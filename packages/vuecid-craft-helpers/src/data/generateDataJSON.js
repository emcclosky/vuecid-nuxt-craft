import saveFile from '../utilities/saveFile.js'
import fetchFromGraphQL from './fetchFromGraphQL.js'

/* eslint-disable no-console */
export default async function generateDataJSON({
  endpoint,
  graphQLQuery,
  compressJSON = true,
  sections = [],
  graphQLQueryName = 'entries', // normally 'entries' are returned, but in other cases we need to pass the query name like 'globalSet'
  propertiesToFilter = [],
  savePath,
  bundleName,
  langs = [],
  transforms = []
} = {}) {
  let entries = {}

  try {
    entries = await fetchFromGraphQL({
      endpoint,
      graphQLQuery,
      sections,
      graphQLQueryName,
      langs,
      propertiesToFilter
    })

    // save entries for each site in one file
    saveFile({
      data: entries,
      bundleName,
      savePath,
      compressJSON
    })
  } catch (e) {
    console.log('generateDataJSON: 📡💾❌ fetching and generating data json failed 😢: ', e) // prettier-ignore
  }
}
