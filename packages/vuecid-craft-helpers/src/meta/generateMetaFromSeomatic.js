import { verifyTrailingSlash } from '@wearelucid/vuecid-helpers'
import generateMetaImageFromSeomatic from './generateMetaImageFromSeomatic'

/* eslint-disable no-console */

/**
 * Generate meta info from seomatic.
 *
 * hid in meta tags is needed to prevent duplicate properties
 * https://nuxtjs.org/faq/duplicated-meta-tags/
 * also they have to override nuxt.configs manifest infos, which sets an hid
 * therefore the og:description hid has to be called 'hid: "og:description"' and so on
 *
 * @param {Object} seomaticMeta
 * @param {String} frontendUrl
 * @return {Array}
 */

export default function generateMetaFromSeomatic({
  seomaticMeta = false,
  frontendUrl = false,
  lang = 'de',
  debug = false
} = {}) {
  if (!seomaticMeta) {
    console.warn('Your meta info cannot be generated, because the seomatic object is falsey.') // prettier-ignore
    // Just return anything to not have an empty head()
    return {
      title: '❌ SEO: generateMetaFromSeomatic has failed!'
    }
  }

  if (!frontendUrl)
    throw new Error(
      'You need to pass your frontend url into the generateMetaFromSeomatic!'
    )

  // // Apollo parses the first level of our seomatic object
  // // But unfortunately everything that is nested is just a JSON String and needs to be parsed
  const metaTagContainer = JSON.parse(seomaticMeta.metaTagContainer)
  const metaLinkContainer = JSON.parse(seomaticMeta.metaLinkContainer)
  const metaTitleContainer = JSON.parse(seomaticMeta.metaTitleContainer)

  if (debug) {
    console.log('metaTagContainer: ', metaTagContainer)
    console.log('metaLinkContainer: ', metaLinkContainer)
    console.log('metaTitleContainer: ', metaTitleContainer)
  }

  // not needed at this point:
  // const metaJsonLdContainer = JSON.parse(seomaticMeta.metaJsonLdContainer)

  // sidenote: if Craft runs in dev mode we get a «construction» emoji in the site name: e.g. 🚧
  // This can be changed in seomatics settings
  const title = metaTitleContainer.title.title || ''

  // using the locale is not possible, because lang="de_CH" is not a valid language
  const language = lang

  const locale = metaTagContainer['og:locale'].content || ''
  const siteName = metaTagContainer['og:site_name'].content || ''
  const description = metaTagContainer.description.content || ''
  const keywords = metaTagContainer.keywords.content || ''
  const referrer = metaTagContainer.referrer.content || ''
  const ogType = metaTagContainer['og:type'].content || ''
  const ogTitle = metaTagContainer['og:title'].content || title
  const ogDescription = metaTagContainer['og:description'].content || description // prettier-ignore
  // const ogSeeAlso = metaTagContainer['og:see_also'].content || ''

  // SEOMatic allows to set a specific url pattern for every section
  // Per default it sets '{entry.uri}' within the setting SEOMatic > Content SEO > Canonical URL
  // This will point to the backend url, which is wrong.
  // Because we don't want to change this for every section we extract the site's home url and replace it with the frontend url
  const homeUrl = metaLinkContainer.home.href
  const seomaticOgUrl = metaTagContainer['og:url'].content || ''
  const ogUrl = seomaticOgUrl.replace(homeUrl, verifyTrailingSlash(frontendUrl))

  const seomaticOgImage = {
    url: metaTagContainer['og:image'].content || false,
    width: metaTagContainer['og:image:width'].content || false,
    height: metaTagContainer['og:image:height'].content || false,
    alt: metaTagContainer['og:image:alt'].content || ''
  }
  const ogImage = generateMetaImageFromSeomatic(seomaticOgImage)

  const twitterTitle = metaTagContainer['twitter:title'] ? metaTagContainer['twitter:title'].content : title // prettier-ignore
  const twitterDescription = metaTagContainer['twitter:description'] ? metaTagContainer['twitter:description'].content : description // prettier-ignore
  const twitterSite = metaTagContainer['twitter:site'] ? metaTagContainer['twitter:site'].content : '' // prettier-ignore
  const twitterCreator = metaTagContainer['twitter:creator'] ? metaTagContainer['twitter:creator'].content : '' // prettier-ignore

  const metaInfo = {
    title,
    htmlAttrs: {
      lang: language
    },
    meta: [
      { name: 'application-name', content: siteName },
      { name: 'lang', content: siteName },
      { hid: 'description', name: 'description', content: description },
      { hid: 'keywords', name: 'keywords', content: keywords },
      { hid: 'og:title', property: 'og:title', content: ogTitle },
      { hid: 'og:description', property: 'og:description', content: ogDescription }, // prettier-ignore
      { hid: 'og:url', property: 'og:url', content: ogUrl },
      { hid: 'og:type', property: 'og:type', content: ogType },
      { hid: 'og:site_name', property: 'og:site_name', content: siteName },
      { hid: 'og:locale', property: 'og:locale', content: locale },
      { hid: 'twitter:title', name: 'twitter:title', content: twitterTitle },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' }, // prettier-ignore
      { hid: 'twitter:description', name: 'twitter:description', content: twitterDescription }, // prettier-ignore
      { hid: 'twitter:site', name: 'twitter:site', content: twitterSite },
      { hid: 'twitter:creator', property: 'twitter:creator', content: twitterCreator }, // prettier-ignore
      { hid: 'referrer', property: 'referrer', content: referrer }, // prettier-ignore
      ...ogImage
    ],
    link: [{ rel: 'canonical', href: ogUrl }]
  }

  if (debug) {
    console.table(metaInfo)
    console.table(metaInfo.meta)
    console.table(metaInfo.link)
  }

  return metaInfo
}
