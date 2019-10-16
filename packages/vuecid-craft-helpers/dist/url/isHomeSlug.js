"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isHomeSlug;

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
function isHomeSlug(slug) {
  var homeSlug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'home';
  var regex = new RegExp("([a-zA-Z0-9]{2}/)?(".concat(homeSlug, ")")); // https: //regex101.com/r/zoFFxg/2

  var foundHomeSlug = slug.match(regex);
  return !!foundHomeSlug;
}