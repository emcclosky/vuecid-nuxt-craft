"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = addLanguagePrefixes;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

/*
 * Adds a language prefix to all non default language entries' URIs.
 * For better understanding: This is how the data that should be passed into this function should look like:
 * {
 *   "en": {
 *     "pages": [
 *       {
 *         "slug": "home",
 *         "uri": "home", ===> for the non default language we want to change this to 'en/home'
 *         ...
 *       },
 *       ...
 *     ]
 *   },
 *   "de": {
 *     "pages": [
 *       {
 *         "slug": "home",
 *         "uri": "home",
 *         ...
 *       },
 *       ...
 *     ]
 *   }
 * }
 */

/* eslint-disable no-console */
function addLanguagePrefixes() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$data = _ref.data,
      data = _ref$data === void 0 ? {} : _ref$data,
      _ref$defaultLanguage = _ref.defaultLanguage,
      defaultLanguage = _ref$defaultLanguage === void 0 ? false : _ref$defaultLanguage;

  if (!isObject(data)) {
    throw new Error('addLanguagePrefixes: 👨🏽‍✈️❌ Your data is not an object!: ', data);
  }

  if (!defaultLanguage) {
    throw new Error('addLanguagePrefixes: 👨🏽‍✈️❌ Your default Language is not defined! Please provide your default language like "de" or "en": ');
  }

  try {
    // go through each propery to find URIs and rewrite them to include a language prefix
    var prefixedData = Object.entries(data).reduce(function (acc, _ref2) {
      var _ref3 = (0, _slicedToArray2["default"])(_ref2, 2),
          lang = _ref3[0],
          value = _ref3[1];

      if (lang !== defaultLanguage) {
        // loop through each section array
        var languageData = Object.entries(value).reduce(function (sectionObj, _ref4) {
          var _ref5 = (0, _slicedToArray2["default"])(_ref4, 2),
              sectionName = _ref5[0],
              sectionData = _ref5[1];

          sectionObj[sectionName] = changeEntries(sectionData, lang);
          return sectionObj;
        }, {});
        acc[lang] = languageData;
        return acc;
      }

      acc[lang] = value;
      return acc;
    }, {});
    return prefixedData;
  } catch (e) {
    console.log('addLanguagePrefixes: 👨🏽‍✈️❌ addLanguagePrefixes() failed: ', e);
  }
}

function isObject(data) {
  return (0, _typeof2["default"])(data) === 'object' && data !== null;
}

function addLanguagePrefix(entry, prefix) {
  if (!entry || !entry.uri) {
    throw new Error('addLanguagePrefix: 👨🏽‍✈️❌ Your entry does not have a "uri". Please check your data (and maybe your graphQL query)! Entry: ', entry);
  }

  entry.uri = "".concat(prefix, "/").concat(entry.uri);
  return entry;
}

function changeEntries(data, prefix) {
  return data.map(function (entry) {
    // some files are not flattened. e.g. navigations.js
    if (entry.children && entry.children.length) {
      entry.children = changeEntries(entry.children, prefix);
    }

    return addLanguagePrefix(entry, prefix);
  });
}