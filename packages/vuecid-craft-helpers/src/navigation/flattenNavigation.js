/* eslint-disable no-console */
function flattenSection(data = []) {
  const flattenedData = []

  data.forEach(entry => {
    flattenedData.push(entry)
    if (entry.children && entry.children.length) {
      entry.children.map(child => flattenedData.push(child))
    }
  })

  return flattenedData
}

export default function flattenNavigation({
  navigationData = {},
  sections = ['pages']
} = {}) {
  try {
    const flattenedNavigations = {}

    // go through each language
    Object.keys(navigationData).map((lang, index) => {
      const localizedNavigation = navigationData[lang]
      flattenedNavigations[lang] = {}

      sections.forEach(section => {
        const flattenedNavigation = flattenSection(localizedNavigation[section])
        flattenedNavigations[lang][section] = flattenedNavigation
        return flattenedNavigation
      })
    })

    return flattenedNavigations
  } catch (e) {
    console.log('flattenNavigation: 👨🏽‍✈️❌ flattenNavigations() failed: ', e)
  }
}
