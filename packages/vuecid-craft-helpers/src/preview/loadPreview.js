/* eslint-disable no-console */

/*
 * Load preview data from Craft CMS.
 * Craft CMS opens an iframe in the LivePreview window
 * and sends two extra url parameters: 'x-craft-live-preview'' & 'token'.
 * If we send these parameters with our axios call, we get back the latest draft of the entry.
 *
 * @param {Object} options - The options object to pass in
 * @param {string} options.slug – includes the slug of the entry
 * @param {string} options.query – the graphql query that loads the data of the page
 * @param {Object} options.env – includes env variables like backend url and graphql endpoint
 * @param {boolean} options.isDev – when true we fetch from local endpoint
 * @param {string} options.graphQLQuery – includes, what should be fetched from the graphql service
 * @return {(Object|boolean)} - including preview data or returns false
 */

import axios from 'axios'
import { print } from 'graphql/language/printer'

export default async function loadPreview(
  options = {
    slug: '',
    query: '', // query params, we are looking for tokens
    env: {},
    isDev: false,
    graphQLQuery: '' // the passed .gql files content
  }
) {
  const { query, slug, env, graphQLQuery, isDev } = options

  // If we see a preview token we need axios to fetch the data
  // Because with apollo we can't send the bearer token AND the craft token at the same time
  if (query['x-craft-live-preview'] && query.token) {
    console.info('Preview is displayed!')

    // ⚠️ If you use `nuxt generate` to test live preview locally
    // isDev is undefined and it will try to fetch from remote (which will fail)
    // to test this, use the BACKENDURLLOCAL in all cases
    const endpointBase = isDev
      ? `${env.BACKENDURLLOCAL}${env.GRAPHQL_PATH}`
      : `${env.BACKENDURLPRODUCTION}${env.GRAPHQL_PATH}`

    const endpoint = `${endpointBase}?x-craft-live-preview=${query['x-craft-live-preview']}&token=${query.token}`

    const previewData = await axios
      .post(endpoint, {
        // have to retransform AST gql template literal back to query string:
        // https://stackoverflow.com/a/57873339/1121268
        query: print(graphQLQuery),
        variables: {
          slug,
          site: query.site || 'default'
        }
      })
      .then(result => {
        if (
          result &&
          result.data &&
          result.data.data &&
          result.data.data.entries[0]
        ) {
          return result.data.data.entries[0]
        } else {
          console.warn(
            'Tried to fetch a preview, but no entries found from axios request'
          )
          if (!isDev && endpointBase.startsWith(env.BACKENDURLPRODUCTION)) {
            console.warn('You seem to fetch from remote. Are you you requesting the remote frontend as well?...') // prettier-ignore
          }
          return false
        }
      })
      .catch(error => {
        console.log('error: ', error)
      })
    return {
      ...previewData,
      preview: true
    }
  }

  return false
}
