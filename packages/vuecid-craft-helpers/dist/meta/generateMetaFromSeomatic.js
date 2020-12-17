"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generateMetaFromSeomatic;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _generateMetaImageFromSeomatic = _interopRequireDefault(require("./generateMetaImageFromSeomatic"));

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
 * @return {Array}
 */
function generateMetaFromSeomatic() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$seomaticMeta = _ref.seomaticMeta,
      seomaticMeta = _ref$seomaticMeta === void 0 ? false : _ref$seomaticMeta,
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
    console.log('metaTagContainer: ', metaTagContainer);
    console.log('metaLinkContainer: ', metaLinkContainer);
    console.log('metaTitleContainer: ', metaTitleContainer);
  } // not needed at this point:
  // const metaJsonLdContainer = JSON.parse(seomaticMeta.metaJsonLdContainer)
  // sidenote: if Craft runs in dev mode we get a «construction» emoji in the site name: e.g. 🚧
  // This can be changed in seomatics settings


  var title = metaTitleContainer.title.title || ''; // using the locale is not possible, because lang="de_CH" is not a valid language

  var language = lang; // generate alternate links for each language

  var hrefLangLinks = metaLinkContainer.alternate || false;
  var locale = metaTagContainer['og:locale'].content || '';
  var siteName = metaTagContainer['og:site_name'].content || '';
  var description = metaTagContainer.description.content || '';
  var keywords = metaTagContainer.keywords.content || '';
  var referrer = metaTagContainer.referrer.content || '';
  var ogType = metaTagContainer['og:type'].content || '';
  var ogTitle = metaTagContainer['og:title'].content || title;
  var ogDescription = metaTagContainer['og:description'].content || description; // prettier-ignore
  // const ogSeeAlso = metaTagContainer['og:see_also'].content || ''

  var ogUrl = metaTagContainer['og:url'].content || '';
  var canonicalUrl = metaLinkContainer.canonical.href;
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
    console.table(metaInfo);
    console.table(metaInfo.meta);
    console.table(metaInfo.link);
  }

  return metaInfo;
}