/**
 * Test if slug is homeSlug ('home').
 * In a craft multisite setup we need to check for locales in front as well
 * Using a regex pattern to determine whether we have a locale with a following home slug
 * https: //regex101.com/r/zoFFxg/2
 *
 * @param  {string} slug
 * @param  {string} [homeSlug]
 * @return {Boolean}
 */

export default function isHomeSlug(slug, homeSlug = 'home') {
  if (typeof slug === 'string' || slug instanceof String) {
    const regex = new RegExp(`([a-zA-Z0-9]{2}/)?(${homeSlug})`) // https: //regex101.com/r/zoFFxg/2
    const foundHomeSlug = slug.match(regex)
    return !!foundHomeSlug
  }
  // eslint-disable-next-line no-console
  console.warn('removeHomeSlug(): Your slug was no string: ', slug)
  return slug
}
