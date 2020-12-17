"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generateMetaFromSeomatic;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _vuecidHelpers = require("@wearelucid/vuecid-helpers");

var _generateMetaImageFromSeomatic = _interopRequireDefault(require("./generateMetaImageFromSeomatic"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/* eslint-disable no-console */

/**
 * Generate meta info from seomatic.
 *
 * hid in meta tags is needed to prevent duplicate properties
 * https://nuxtjs.org/faq/duplicated-meta-tags/
 * also they have to override nuxt.configs manifest infos, which sets an hid
 * therefore the og:description hid has to be called 'hid: "og:description"' and so on
 *
 * @param {object} options
 * @return {object}
 */
function generateMetaFromSeomatic() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$seomaticMeta = _ref.seomaticMeta,
      seomaticMeta = _ref$seomaticMeta === void 0 ? false : _ref$seomaticMeta,
      _ref$homeSlug = _ref.homeSlug,
      homeSlug = _ref$homeSlug === void 0 ? 'home' : _ref$homeSlug,
      _ref$lang = _ref.lang,
      lang = _ref$lang === void 0 ? 'de' : _ref$lang,
      _ref$debug = _ref.debug,
      debug = _ref$debug === void 0 ? false : _ref$debug;

  if (!seomaticMeta) {
    // For a short moment when changing the route seomatic is undefined all the time...
    // Just return anything to not have an empty head()
    return {
      title: 'Loading…'
    };
  } // Apollo parses the first level of our seomatic object
  // But unfortunately everything that is nested is just a JSON String and needs to be parsed


  var metaTagContainer = JSON.parse(seomaticMeta.metaTagContainer);
  var metaLinkContainer = JSON.parse(seomaticMeta.metaLinkContainer);
  var metaTitleContainer = JSON.parse(seomaticMeta.metaTitleContainer);

  if (debug) {
    console.log('Data Input:', {
      homeSlug: homeSlug,
      lang: lang,
      metaTagContainer: metaTagContainer,
      metaLinkContainer: metaLinkContainer,
      metaTitleContainer: metaTitleContainer
    });
  } // not needed at this point:
  // const metaJsonLdContainer = JSON.parse(seomaticMeta.metaJsonLdContainer)
  // sidenote: if Craft runs in dev mode we get a «construction» emoji in the site name: e.g. 🚧
  // This can be changed in seomatics settings


  var title = metaTitleContainer.title.title || ''; // using the locale is not possible, because lang="de_CH" is not a valid language

  var language = lang;
  var locale = metaTagContainer['og:locale'].content || '';
  var siteName = metaTagContainer['og:site_name'].content || '';
  var description = metaTagContainer.description.content || '';
  var keywords = metaTagContainer.keywords.content || '';
  var referrer = metaTagContainer.referrer.content || '';
  var ogType = metaTagContainer['og:type'].content || '';
  var ogTitle = metaTagContainer['og:title'].content || title;
  var ogDescription = metaTagContainer['og:description'].content || description; // prettier-ignore
  // const ogSeeAlso = metaTagContainer['og:see_also'].content || ''

  var ogUrl = metaTagContainer['og:url'].content || ''; // Remove home slug from canonical link for home pages

  var canonicalUrl = (0, _vuecidHelpers.removeHomeSlug)(metaLinkContainer.canonical.href, homeSlug); // generate alternate links for each language

  var hrefLangLinks = metaLinkContainer.alternate || false; // Remove home slug from canonical link for alternate pages

  if (hrefLangLinks.length) {
    hrefLangLinks = hrefLangLinks.map(function (x) {
      return _objectSpread(_objectSpread({}, x), {}, {
        href: (0, _vuecidHelpers.removeHomeSlug)(x.href, homeSlug)
      });
    });
  }

  var seomaticOgImage = {
    url: metaTagContainer['og:image'].content || false,
    width: metaTagContainer['og:image:width'].content || false,
    height: metaTagContainer['og:image:height'].content || false,
    alt: metaTagContainer['og:image:alt'].content || ''
  };
  var ogImage = (0, _generateMetaImageFromSeomatic["default"])(seomaticOgImage);
  var twitterTitle = metaTagContainer['twitter:title'] ? metaTagContainer['twitter:title'].content : title; // prettier-ignore

  var twitterDescription = metaTagContainer['twitter:description'] ? metaTagContainer['twitter:description'].content : description; // prettier-ignore

  var twitterSite = metaTagContainer['twitter:site'] ? metaTagContainer['twitter:site'].content : ''; // prettier-ignore

  var twitterCreator = metaTagContainer['twitter:creator'] ? metaTagContainer['twitter:creator'].content : ''; // prettier-ignore

  var metaInfo = {
    title: title,
    htmlAttrs: {
      lang: language
    },
    meta: [{
      name: 'application-name',
      content: siteName
    }, {
      name: 'lang',
      content: language
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
    }].concat((0, _toConsumableArray2["default"])(ogImage)),
    link: [{
      rel: 'canonical',
      href: canonicalUrl
    }].concat((0, _toConsumableArray2["default"])(hrefLangLinks))
  };

  if (debug) {
    console.log('Data Output:', {
      metaInfo: metaInfo
    });
    console.table(metaInfo.meta);
    console.table(metaInfo.link);
  }

  return metaInfo;
}