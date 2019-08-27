import config from '../config'
const fs = require('fs')
const fetch = require('node-fetch')
// Parse terminal arguments with minimist
const argv = require('minimist')(process.argv.slice(2))

const useLocalDB = argv.local

// See if the fragments should be builded from a local craft installation
const endpoint = useLocalDB
  ? `${config.env.BACKENDURLLOCAL}${config.env.GRAPHQL_PATH}`
  : `${config.env.BACKENDURLPRODUCTION}${config.env.GRAPHQL_PATH}`
const token = useLocalDB
  ? config.env.GRAPHQL_TOKEN_LOCAL
  : config.env.GRAPHQL_TOKEN

fetch(endpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  },
  body: JSON.stringify({
    variables: {},
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `
  })
})
  .then(result => result.json())
  .then(result => {
    // here we're filtering out any type information unrelated to unions or interfaces
    const filteredData = result.data.__schema.types.filter(
      type => type.possibleTypes !== null
    )

    result.data.__schema.types = filteredData

    fs.writeFileSync(
      './apollo/fragmentTypes.json',
      JSON.stringify(result.data),
      err => {
        if (err) {
          console.error('Error writing fragmentTypes file', err) // eslint-disable-line no-console
        } else {
          console.log('Fragment types successfully extracted!') // eslint-disable-line no-console
        }
      }
    )
  })
  .catch(error => {
    console.warn('❌ – Error while generating apollo fragmentTypes: ', error) // eslint-disable-line
  })
