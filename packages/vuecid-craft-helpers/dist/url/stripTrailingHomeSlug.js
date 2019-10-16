"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = stripTrailingHomeSlug;

/**
 * Test if input string ends with a homeSlug.
 * This is done with this regex: https: //regex101.com/r/KbNmJj/2
 * If yes, we remove it.
 * @param  {string} slug
 * @param  {string} [homeSlug]
 * @return {Boolean}
 */
function stripTrailingHomeSlug(slug) {
  var homeSlug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'home';

  if (typeof slug === 'string' || slug instanceof String) {
    // https://regex101.com/r/KbNmJj/2
    var regex = new RegExp("^([a-zA-Z-0-9]*)(/)(".concat(homeSlug, ")$"));
    var match = slug.match(regex);

    if (match) {
      // replace third capture group (=home) with ''
      return slug.replace(match[3], '');
    }

    return slug;
  } // eslint-disable-next-line no-console


  console.warn('removeHomeSlug(): Your slug was no string: ', slug);
  return slug;
}