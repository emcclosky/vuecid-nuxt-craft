/* eslint-disable no-console */

/**
 * Generate meta image. Working specifically with Craft's SEOmatic plugin
 *
 * hid in meta tags is needed to prevent duplicate properties
 * https://nuxtjs.org/faq/duplicated-meta-tags/
 * also they have to override nuxt.configs manifest infos, which sets an hid
 * therefore the og:description hid has to be called 'hid: "og:description"' and so on
 *
 */

export default function generateMetaImageFromSeomatic({
  specificImage = false,
  fallbackImage = {}
} = {}) {
  // Check if we have a page specific OG image, where we can use a specific image size optimized for social sharing
  const imageUrl = specificImage || fallbackImage
  const imageWidth = specificImage ? '1280' : fallbackImage.width
  const imageHeight = specificImage ? '720' : fallbackImage.height

  return [
    { hid: 'og:image', property: 'og:image', content: imageUrl },
    { hid: 'og:image:width', name: 'og:image:width', content: imageWidth },
    { hid: 'og:image:height', name: 'og:image:height', content: imageHeight },
    { hid: 'twitter:image', name: 'twitter:image', content: imageUrl },
    { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' } // prettier-ignore
  ]
}
