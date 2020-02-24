/**
 * Test if input string ends with a homeSlug.
 * This is done with this regex: https: //regex101.com/r/KbNmJj/2
 * If yes, we remove it.
 * @param  {string} slug
 * @param  {string} [homeSlug]
 * @return {Boolean}
 */

export default function stripTrailingHomeSlug(slug, homeSlug = 'home') {
  if (typeof slug === 'string' || slug instanceof String) {
    // https://regex101.com/r/KbNmJj/2
    const regex = new RegExp(`^([a-zA-Z-0-9]*)(/)(${homeSlug})$`)
    const match = slug.match(regex)

    if (match) {
      // replace third capture group (=home) with ''
      return slug.replace(match[3], '')
    }

    return slug
  }
  // eslint-disable-next-line no-console
  console.warn('removeHomeSlug(): Your slug was no string: ', slug)
  return slug
}
