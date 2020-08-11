// Routes utilities
import isHomeSlug from './url/isHomeSlug'
import stripTrailingHomeSlug from './url/stripTrailingHomeSlug'
import generateLocalizedRoutes from './routes/generateLocalizedRoutes'
import generateRoutesFromData from './routes/generateRoutesFromData'
import generateDataJSON from './data/generateDataJSON'
import fetchFromGraphQL from './data/fetchFromGraphQL'
import loadPreview from './preview/loadPreview'
import flattenNavigation from './navigation/flattenNavigation'
import addLanguagePrefixes from './navigation/addLanguagePrefixes'
import generateMetaFromSeomatic from './meta/generateMetaFromSeomatic'
import saveFile from './utilities/saveFile'

export {
  isHomeSlug,
  stripTrailingHomeSlug,
  generateLocalizedRoutes,
  generateRoutesFromData,
  flattenNavigation,
  addLanguagePrefixes,
  loadPreview,
  generateDataJSON,
  fetchFromGraphQL,
  generateMetaFromSeomatic,
  saveFile,
}
