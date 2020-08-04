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

export default function generateMetaImageFromSeomatic(ogImage) {
  const imageUrl = ogImage.url
  const imageWidth = ogImage.width
  const imageHeight = ogImage.height
  const alt = ogImage.alt

  return [
    { hid: 'og:image', property: 'og:image', content: imageUrl },
    { hid: 'og:image:width', name: 'og:image:width', content: imageWidth },
    { hid: 'og:image:height', name: 'og:image:height', content: imageHeight },
    { hid: 'og:image:alt', name: 'og:image:alt', content: alt },
    { hid: 'twitter:image', name: 'twitter:image', content: imageUrl },
    { hid: 'twitter:image:width', name: 'twitter:image:width', content: imageWidth }, // prettier-ignore
    { hid: 'twitter:image:height', name: 'twitter:image:height', content: imageHeight }, // prettier-ignore
  ]
}
