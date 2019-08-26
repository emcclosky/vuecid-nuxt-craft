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
 * @param {String} specificOgImage
 * @param {String} frontendUrl
 * @return {Array}
 */


export default function generateMetaFromSeomatic({
  seomaticMeta = {},
  specificOgImage = false,
  frontendUrl = false
} = {}) {
  console.log('specificOgImage: ', specificOgImage)

  if (!seomaticMeta) {
    console.warn('Your meta info cannot be generated, because the seomatic object is falsey.') // prettier-ignore
    return
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
  // const metaJsonLdContainer = JSON.parse(seomaticMeta.metaJsonLdContainer)

  console.log('metaTitleContainer: ', metaTitleContainer)
  console.log('metaTagContainer: ', metaTagContainer)
  console.log('metaLinkContainer: ', metaLinkContainer)

  // // const siteName = metaTagContainer.site_name.content

  //   const _siteSettings = {
  //     meta_site_name: '',
  //     meta_description_default: '',
  //     website_url: '',
  //     ...siteSettings.global.meta_global_site_settings,
  //     ...siteSettings.localized
  //   }

  //   // Site Name: Use site settings
  //   const siteName = _siteSettings.meta_site_name

  //   // Title: Use post meta title or fallback to post title
  //   const title = post.meta_title ? post.meta_title : post.title || ''

  //   // Description: Use post meta description or fallback to site settings
  //   const description = post.meta_description
  //     ? post.meta_description
  //     : _siteSettings.meta_description_default

  //   //  Canonical: Construct canonical and ensure we don't mess up the slashes
  //   const canonicalUrl = removeTrailingSlash(
  //     `${verifyTrailingSlash(_siteSettings.meta_website_url)}${removeLeadingSlash(
  //       path
  //     )}`
  //   )

  // sidenote: if Craft runs in dev mode we get a «construction» emoji in the site name: 🚧
  const title = metaTitleContainer.title.title || ''

  const locale = metaTagContainer['og:locale'].content || ''
  const siteName = metaTagContainer['og:site_name'].content || ''
  const description = metaTagContainer.description.content || ''
  const keywords = metaTagContainer.keywords.content || ''
  const referrer = metaTagContainer.referrer.content || ''
  const ogLocale = metaTagContainer['og:locale'].content || ''
  const ogType = metaTagContainer['og:type'].content || ''

  // SEOMatic allows to set a specific url pattern for every section
  // Per default it sets '{entry.uri}' within the setting SEOMatic > Content SEO > Canonical URL
  // This will point to the backend url, which is wrong.
  // Because we don't want to change this for every section we extract the site's home url and replace it with the frontend url
  const homeUrl = metaLinkContainer.home.href
  const ogUrl = metaTagContainer['og:url'].content || ''
  const realOgUrl = ogUrl.replace(homeUrl, verifyTrailingSlash(frontendUrl))

  const ogTitle = metaTagContainer['og:title'].content || title
  const ogDescription = metaTagContainer['og:description'].content || description
  const ogImageWidth = metaTagContainer['og:image:width'].content || ''
  const ogImageHeight = metaTagContainer['og:image:height'].content || ''
  const ogImageA = metaTagContainer['og:image:alt'].content || ''
  const ogSeeAlso = metaTagContainer['og:see_also'].content || ''

  const seomaticOgImage = {
    image: metaTagContainer['og:image'].content || false,
    width: metaTagContainer['og:image:width'].content || false,
    height: metaTagContainer['og:image:height'].content || false
  }
  const ogImage = generateMetaImageFromSeomatic({
    specificImage: specificOgImage,
    fallbackImage: seomaticOgImage
  })

  console.log('checkNested(metaTagContainer, \'twitter:title', 'content\'): ', checkNested(metaTagContainer, 'twitter:title', 'content'))

  const twitterTitleTest = checkNested(metaTagContainer, 'twitter:title', 'content') ? metaTagContainer['twitter:title'].content : title
  const twitterTitle = metaTagContainer['twitter:title'] ? metaTagContainer['twitter:title'].content : title

  // const twitterTitle = metaTagContainer['twitter:title'].content || title
  // const twitterDescription = metaTagContainer['twitter:description'].content || description
  // const twitterSite = metaTagContainer['twitter:site'].content || ''
  // const twitterCreator = metaTagContainer['twitter:creator'].content || ''


  // twitter:card
  // twitter:url
  // twitter:title
  // twitter:description
  // twitter:site
  // twitter:creator

  // <meta name="title" content="My site title">
  // <meta name="description" content="My site description">
  // <meta name="keywords" content="keyowrd1, keyword2">
  // <meta name="robots" content="index, follow">
  // <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  // <meta name="language" content="Spanish">
  // <meta name="revisit-after" content="3 days">
  // <meta name="author" content="werarelucid">



  const metaInfo = {
    title,
    htmlAttrs: {
      lang: locale
    },
    meta: [
      { name: 'application-name', content: siteName },
      { hid: 'description', name: 'description', content: description },
    ]
  }

  // const metaInfo = {
  //   title: titlePattern
  //     ? `${title}${titlePatternSeparator}${siteName}`
  //     : siteName,
  //   htmlAttrs: {
  //     lang: locale
  //   },
  //   meta: [
  //     { name: 'application-name', content: siteName },
  //     { hid: 'description', name: 'description', content: description },
  //     { hid: 'og:title', property: 'og:title', content: title },
  //     {
  //       hid: 'og:description',
  //       property: 'og:description',
  //       content: description
  //     },
  //     { hid: 'og:url', property: 'og:url', content: canonicalUrl },
  //     { hid: 'og:type', property: 'og:type', content: 'website' },
  //     { hid: 'og:site_name', property: 'og:site_name', content: siteName },
  //     { hid: 'og:locale', property: 'og:locale', content: locale },
  //     { hid: 'twitter:title', name: 'twitter:title', content: title },
  //     { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' }

  //     {
  //       hid: 'twitter:description',
  //       name: 'twitter:description',
  //       content: description
  //     },
  //     {
  //       hid: 'twitter:site',
  //       name: 'twitter:site',
  //       content: _siteSettings.meta_publisher_twitter_handle
  //     },
  //     {
  //       hid: 'fb:admins',
  //       property: 'fb:admins',
  //       content: _siteSettings.meta_facebook_admins_id
  //     },
  //     // Generate meta image:
  //     ...generateMetaImageInfo({ siteSettings: _siteSettings, post: post })
  //   ],
  //   link: [
  //     { rel: 'canonical', href: canonicalUrl },
  //     // Generate hreflangs from post:
  //     ...generateHreflangs(post)
  //   ]
  // }

//   // Log output
//   if (debug) {
//     console.table(metaInfo)
//     console.table(metaInfo.meta)
//     console.table(metaInfo.link)
//   }

//   return metaInfo
// }


  return {
    title
  }
}

function checkNested(obj, level, ...rest) {
  if (obj === undefined) return false
  if (rest.length === 0 && obj.hasOwnProperty(level)) return true
  return checkNested(obj[level], ...rest)
}
