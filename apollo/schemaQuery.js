import config from '../config'
const fs = require('fs')
const fetch = require('node-fetch')

const endpoint = `${config.env.BACKENDURLPRODUCTION}/api`

fetch(endpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer Uzwv98bNdEu0JNyOUtxxhD5d8ub6-DPXZfPsvYQXXmlWgb3Xyc6txbX92PaslqVj'
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
