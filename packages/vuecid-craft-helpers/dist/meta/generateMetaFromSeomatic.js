"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generateMetaFromSeomatic;

var _generateMetaImageFromSeomatic = _interopRequireDefault(require("./generateMetaImageFromSeomatic"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
function generateMetaFromSeomatic() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$seomaticMeta = _ref.seomaticMeta,
      seomaticMeta = _ref$seomaticMeta === void 0 ? false : _ref$seomaticMeta,
      _ref$specificOgImage = _ref.specificOgImage,
      specificOgImage = _ref$specificOgImage === void 0 ? false : _ref$specificOgImage,
      _ref$frontendUrl = _ref.frontendUrl,
      frontendUrl = _ref$frontendUrl === void 0 ? false : _ref$frontendUrl,
      _ref$debug = _ref.debug,
      debug = _ref$debug === void 0 ? false : _ref$debug;

  if (!seomaticMeta) {
    console.warn('Your meta info cannot be generated, because the seomatic object is falsey.'); // prettier-ignore

    return;
  }

  if (!frontendUrl) throw new Error('You need to pass your frontend url into the generateMetaFromSeomatic!'); // // Apollo parses the first level of our seomatic object
  // // But unfortunately everything that is nested is just a JSON String and needs to be parsed

  var metaTagContainer = JSON.parse(seomaticMeta.metaTagContainer);
  var metaLinkContainer = JSON.parse(seomaticMeta.metaLinkContainer);
  var metaTitleContainer = JSON.parse(seomaticMeta.metaTitleContainer);

  if (debug) {
    console.log('metaTagContainer: ', metaTagContainer);
    console.log('metaLinkContainer: ', metaLinkContainer);
    console.log('metaTitleContainer: ', metaTitleContainer);
  } // not needed at this point:
  // const metaJsonLdContainer = JSON.parse(seomaticMeta.metaJsonLdContainer)
  // sidenote: if Craft runs in dev mode we get a «construction» emoji in the site name: e.g. 🚧
  // This can be changed in seomatics settings


  var title = metaTitleContainer.title.title || '';
  var locale = metaTagContainer['og:locale'].content || '';
  var siteName = metaTagContainer['og:site_name'].content || '';
  var description = metaTagContainer.description.content || '';
  var keywords = metaTagContainer.keywords.content || '';
  var referrer = metaTagContainer.referrer.content || '';
  var ogType = metaTagContainer['og:type'].content || '';
  var ogUrl = metaTagContainer['og:url'].content || '';
  var ogTitle = metaTagContainer['og:title'].content || title;
  var ogDescription = metaTagContainer['og:description'].content || description; // prettier-ignore
  // const ogSeeAlso = metaTagContainer['og:see_also'].content || ''

  var seomaticOgImage = {
    url: metaTagContainer['og:image'].content || false,
    width: metaTagContainer['og:image:width'].content || false,
    height: metaTagContainer['og:image:height'].content || false,
    alt: metaTagContainer['og:image:alt'].content || ''
  };
  var ogImage = (0, _generateMetaImageFromSeomatic["default"])({
    specificImage: specificOgImage,
    fallbackImage: seomaticOgImage
  });
  var twitterTitle = metaTagContainer['twitter:title'] ? metaTagContainer['twitter:title'].content : title; // prettier-ignore

  var twitterDescription = metaTagContainer['twitter:description'] ? metaTagContainer['twitter:description'].content : description; // prettier-ignore

  var twitterSite = metaTagContainer['twitter:site'] ? metaTagContainer['twitter:site'].content : ''; // prettier-ignore

  var twitterCreator = metaTagContainer['twitter:creator'] ? metaTagContainer['twitter:creator'].content : ''; // prettier-ignore

  var metaInfo = {
    title: title,
    htmlAttrs: {
      lang: locale
    },
    meta: [{
      name: 'application-name',
      content: siteName
    }, {
      hid: 'description',
      name: 'description',
      content: description
    }, {
      hid: 'keywords',
      name: 'keywords',
      content: keywords
    }, {
      hid: 'og:title',
      property: 'og:title',
      content: ogTitle
    }, {
      hid: 'og:description',
      property: 'og:description',
      content: ogDescription
    }, // prettier-ignore
    {
      hid: 'og:url',
      property: 'og:url',
      content: ogUrl
    }, {
      hid: 'og:type',
      property: 'og:type',
      content: ogType
    }, {
      hid: 'og:site_name',
      property: 'og:site_name',
      content: siteName
    }, {
      hid: 'og:locale',
      property: 'og:locale',
      content: locale
    }, {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: twitterTitle
    }, {
      hid: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image'
    }, // prettier-ignore
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: twitterDescription
    }, // prettier-ignore
    {
      hid: 'twitter:site',
      name: 'twitter:site',
      content: twitterSite
    }, {
      hid: 'twitter:creator',
      property: 'twitter:creator',
      content: twitterCreator
    }, // prettier-ignore
    {
      hid: 'referrer',
      property: 'referrer',
      content: referrer
    }].concat(_toConsumableArray(ogImage)),
    link: [{
      rel: 'canonical',
      href: ogUrl
    }]
  };

  if (debug) {
    console.table(metaInfo);
    console.table(metaInfo.meta);
    console.table(metaInfo.link);
  }

  return metaInfo;
}