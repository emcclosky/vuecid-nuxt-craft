# Apollo

This directory contains config and GraphQL queries in order to fetch data with apollo from a Craft CMS.

## client-configs
**This directory is most likely already configured to your needs. Only touch it if you really need to**
This contains specific apollo configs merged with our global `config.js` settings.
If you need to change endpoints for example, you would do that in the global `config.js` file.

## plugins
Apollo related plugins.

## queries
This is were our GraphQL queries are defined. You will need to edit these files to match the fetch results to you needs.
Fragments are smaller chunks that then again can be reused in your .gql files at multiple places (better readable and dynamic). 
