// Routes utilities
import isHomeSlug from './url/isHomeSlug'
import stripTrailingHomeSlug from './url/stripTrailingHomeSlug'
import generateLocalizedRoutes from './routes/generateLocalizedRoutes'
import generateRoutesFromData from './routes/generateRoutesFromData'
import generateDataJSON from './data/generateDataJSON'
import loadPreview from './preview/loadPreview'
import flattenNavigation from './navigation/flattenNavigation'
import generateMetaFromSeomatic from './meta/generateMetaFromSeomatic'

export {
  isHomeSlug,
  stripTrailingHomeSlug,
  generateLocalizedRoutes,
  generateRoutesFromData,
  flattenNavigation,
  loadPreview,
  generateDataJSON,
  generateMetaFromSeomatic
}
