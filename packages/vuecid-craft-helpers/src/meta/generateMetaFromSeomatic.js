/* eslint-disable no-console */

/**
 * Generate meta info from seomatic.
 *
 * hid in meta tags is needed to prevent duplicate properties
 * https://nuxtjs.org/faq/duplicated-meta-tags/
 * also they have to override nuxt.configs manifest infos, which sets an hid
 * therefore the og:description hid has to be called 'hid: "og:description"' and so on
 *
 */

/* eslint-disable no-console */
// import removeTrailingSlash from '../../url/removeTrailingSlash'
// import removeLeadingSlash from '../../url/removeLeadingSlash'
// import verifyTrailingSlash from '../../url/verifyTrailingSlash'
// import generateHreflangs from './generateHreflangs'
// import generateMetaImageInfo from './generateMetaImageInfo'

export default function generateMetaFromSeomatic({
  seomaticMeta = {},
  ogImage = false
} = {}) {
  console.log('ogImage: ', ogImage)

  if (!seomaticMeta) {
    console.warn('Your meta info cannot be generated, because the seomatic object is falsey.') // prettier-ignore
    return
  }

  // // Apollo parses the first level of our seomatic object
  // // But unfortunately everything that is nested is just a JSON String and needs to be parsed
  const metaTagContainer = JSON.parse(seomaticMeta.metaTagContainer)
  // // const metaLinkContainer = JSON.parse(seomaticMeta.metaLinkContainer)
  const metaTitleContainer = JSON.parse(seomaticMeta.metaTitleContainer)
  // // const metaJsonLdContainer = JSON.parse(seomaticMeta.metaJsonLdContainer)

  // console.log('metaTitleContainer: ', metaTitleContainer)
  // console.log('metaTagContainer: ', metaTagContainer)

  // // const siteName = metaTagContainer.site_name.content

  const title = metaTitleContainer.title.title
  // sidenote: if Craft runs in dev mode we get a «construction» emoji in the site name: 🚧

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

//   const metaInfo = {
//     title: titlePattern
//       ? `${title}${titlePatternSeparator}${siteName}`
//       : siteName,
//     htmlAttrs: {
//       lang: locale
//     },
//     meta: [
//       { name: 'application-name', content: siteName },
//       { hid: 'description', name: 'description', content: description },
//       { hid: 'og:title', property: 'og:title', content: title },
//       {
//         hid: 'og:description',
//         property: 'og:description',
//         content: description
//       },
//       { hid: 'og:url', property: 'og:url', content: canonicalUrl },
//       { hid: 'og:type', property: 'og:type', content: 'website' },
//       { hid: 'og:site_name', property: 'og:site_name', content: siteName },
//       { hid: 'og:locale', property: 'og:locale', content: locale },
//       { hid: 'twitter:title', name: 'twitter:title', content: title },
//       {
//         hid: 'twitter:description',
//         name: 'twitter:description',
//         content: description
//       },
//       {
//         hid: 'twitter:site',
//         name: 'twitter:site',
//         content: _siteSettings.meta_publisher_twitter_handle
//       },
//       {
//         hid: 'fb:admins',
//         property: 'fb:admins',
//         content: _siteSettings.meta_facebook_admins_id
//       },
//       // Generate meta image:
//       ...generateMetaImageInfo({ siteSettings: _siteSettings, post: post })
//     ],
//     link: [
//       { rel: 'canonical', href: canonicalUrl },
//       // Generate hreflangs from post:
//       ...generateHreflangs(post)
//     ]
//   }

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
