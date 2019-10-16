"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = flattenNavigation;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

/* eslint-disable no-console */
function flattenSection() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var flattenedData = [];
  data.forEach(function (entry) {
    flattenedData.push(entry);

    if (entry.children && entry.children.length) {
      entry.children.map(function (child) {
        return flattenedData.push(child);
      });
    }
  });
  return flattenedData;
}

function isObject(data) {
  return (0, _typeof2["default"])(data) === 'object' && data !== null;
}

function flattenNavigation() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$navigationData = _ref.navigationData,
      navigationData = _ref$navigationData === void 0 ? {} : _ref$navigationData,
      _ref$sections = _ref.sections,
      sections = _ref$sections === void 0 ? ['pages'] : _ref$sections;

  if (!isObject(navigationData)) {
    throw new Error('flattenNavigation: 👨🏽‍✈️❌ Your passed data is not an object!: ', navigationData);
  }

  try {
    var flattenedNavigations = {}; // go through each language

    Object.keys(navigationData).map(function (lang, index) {
      var localizedNavigation = navigationData[lang];
      flattenedNavigations[lang] = {};
      sections.forEach(function (section) {
        var flattenedNavigation = flattenSection(localizedNavigation[section]);
        flattenedNavigations[lang][section] = flattenedNavigation;
        return flattenedNavigation;
      });
    });
    return flattenedNavigations;
  } catch (e) {
    console.log('flattenNavigation: 👨🏽‍✈️❌ flattenNavigations() failed: ', e);
  }
}