/* eslint-disable no-console */
function isObject(data) {
  return typeof data === 'object' && data !== null
}

function addLanguagePrefix(entry, prefix) {
  if (!entry || !entry.uri) {
    throw new Error(
      'addLanguagePrefix: 👨🏽‍✈️❌ Your entry does not have a "uri". Please check your data (and maybe your graphQL query)! Entry: ',
      entry
    )
  }
  entry.uri = `${prefix}/${entry.uri}`
  return entry
}

function changeEntries(data, prefix) {
  return data.map(entry => {
    return addLanguagePrefix(entry, prefix)
  })
}

/*
 * Adds a language prefix to all non default language entries' URIs.
 * For better understanding: This is how the data that should be passed into this function should look like:
 * {
 *   "en": {
 *     "pages": [
 *       {
 *         "slug": "home",
 *         "uri": "home", ===> for the non default language we want to change this to 'en/home'
 *         ...
 *       },
 *       ...
 *     ]
 *   },
 *   "de": {
 *     "pages": [
 *       {
 *         "slug": "home",
 *         "uri": "home",
 *         ...
 *       },
 *       ...
 *     ]
 *   }
 * }
 */

export default function addLanguagePrefixes({
  navigationData = {},
  defaultLanguage = false
} = {}) {
  if (!isObject(navigationData)) {
    throw new Error(
      'addLanguagePrefixes: 👨🏽‍✈️❌ Your data is not an object!: ',
      navigationData
    )
  }
  if (!defaultLanguage) {
    throw new Error(
      'addLanguagePrefixes: 👨🏽‍✈️❌ Your default Language is not defined! Please provide your default language like "de" or "en": '
    )
  }
  try {
    // go through each propery to find URIs and rewrite them to include a language prefix
    const prefixedData = Object.entries(navigationData).reduce(
      (acc, [lang, value]) => {
        if (lang !== defaultLanguage) {
          // loop through each section array
          const languageData = Object.entries(value).reduce(
            (sectionObj, [sectionName, sectionData]) => {
              sectionObj[sectionName] = changeEntries(sectionData, lang)
              return sectionObj
            },
            {}
          )

          acc[lang] = languageData
          return acc
        }
        acc[lang] = value
        return acc
      },
      {}
    )
    return prefixedData
  } catch (e) {
    console.log('addLanguagePrefixes: 👨🏽‍✈️❌ addLanguagePrefixes() failed: ', e)
  }
}
