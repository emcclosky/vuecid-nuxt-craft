"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = fetchFromGraphQL;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

var _printer = require("graphql/language/printer");

/* eslint-disable no-console */
function fetch(_x) {
  return _fetch.apply(this, arguments);
}

function _fetch() {
  _fetch = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(_ref) {
    var endpoint, graphQLQuery, section, graphQLQueryName, language, propertiesToFilter, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            endpoint = _ref.endpoint, graphQLQuery = _ref.graphQLQuery, section = _ref.section, graphQLQueryName = _ref.graphQLQueryName, language = _ref.language, propertiesToFilter = _ref.propertiesToFilter;
            _context.next = 3;
            return _axios["default"].post(endpoint, {
              // have to retransform AST gql template literal back to query string:
              // https://stackoverflow.com/a/57873339/1121268
              query: (0, _printer.print)(graphQLQuery),
              variables: {
                section: section,
                // may be undefined...
                site: language.handle || 'default'
              }
            }).then(function (_ref2) {
              var data = _ref2.data;
              return data.data[graphQLQueryName];
            });

          case 3:
            result = _context.sent;

            // filter out entries, that should not appear in JSON
            // Assuming that the property is a checkbox, where craft returns an empty array if false.
            // e.g.: "appearsInNavigation": [] || "appearsInNavigation": ["true"],
            if (propertiesToFilter && propertiesToFilter.length) {
              propertiesToFilter.forEach(function (property) {
                result = result.filter(function (entry) {
                  // if the entry does not even have the key we return
                  if (!entry[property]) return true; // check if first array item is true, then leave entry in array

                  return entry[property][0] ? entry[property][0] : false;
                });
              });
            }

            return _context.abrupt("return", result);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _fetch.apply(this, arguments);
}

function fetchFromGraphQL() {
  return _fetchFromGraphQL.apply(this, arguments);
}

function _fetchFromGraphQL() {
  _fetchFromGraphQL = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    var _ref3,
        endpoint,
        graphQLQuery,
        _ref3$sections,
        sections,
        _ref3$graphQLQueryNam,
        graphQLQueryName,
        _ref3$langs,
        langs,
        _ref3$transforms,
        transforms,
        propertiesToFilter,
        entries,
        _iteratorNormalCompletion,
        _didIteratorError,
        _iteratorError,
        _iterator,
        _step,
        language,
        _iteratorNormalCompletion2,
        _didIteratorError2,
        _iteratorError2,
        _iterator2,
        _step2,
        section,
        _args2 = arguments;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _ref3 = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {}, endpoint = _ref3.endpoint, graphQLQuery = _ref3.graphQLQuery, _ref3$sections = _ref3.sections, sections = _ref3$sections === void 0 ? [] : _ref3$sections, _ref3$graphQLQueryNam = _ref3.graphQLQueryName, graphQLQueryName = _ref3$graphQLQueryNam === void 0 ? 'entries' : _ref3$graphQLQueryNam, _ref3$langs = _ref3.langs, langs = _ref3$langs === void 0 ? [] : _ref3$langs, _ref3$transforms = _ref3.transforms, transforms = _ref3$transforms === void 0 ? [] : _ref3$transforms, propertiesToFilter = _ref3.propertiesToFilter;
            entries = {};
            _context2.prev = 2;
            // Actually for each language is equal to each craft site in a multisite setup!
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 6;
            _iterator = langs[Symbol.iterator]();

          case 8:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context2.next = 47;
              break;
            }

            language = _step.value;
            entries[language.lang] = {}; // check if we have to fetch section specific content

            if (!sections.length) {
              _context2.next = 41;
              break;
            }

            // load all entries for each section
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context2.prev = 15;
            _iterator2 = sections[Symbol.iterator]();

          case 17:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context2.next = 25;
              break;
            }

            section = _step2.value;
            _context2.next = 21;
            return fetch({
              endpoint: endpoint,
              graphQLQuery: graphQLQuery,
              section: section,
              graphQLQueryName: graphQLQueryName,
              language: language,
              propertiesToFilter: propertiesToFilter
            });

          case 21:
            entries[language.lang][section] = _context2.sent;

          case 22:
            _iteratorNormalCompletion2 = true;
            _context2.next = 17;
            break;

          case 25:
            _context2.next = 31;
            break;

          case 27:
            _context2.prev = 27;
            _context2.t0 = _context2["catch"](15);
            _didIteratorError2 = true;
            _iteratorError2 = _context2.t0;

          case 31:
            _context2.prev = 31;
            _context2.prev = 32;

            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }

          case 34:
            _context2.prev = 34;

            if (!_didIteratorError2) {
              _context2.next = 37;
              break;
            }

            throw _iteratorError2;

          case 37:
            return _context2.finish(34);

          case 38:
            return _context2.finish(31);

          case 39:
            _context2.next = 44;
            break;

          case 41:
            _context2.next = 43;
            return fetch({
              endpoint: endpoint,
              graphQLQuery: graphQLQuery,
              graphQLQueryName: graphQLQueryName,
              language: language,
              propertiesToFilter: propertiesToFilter
            });

          case 43:
            entries[language.lang] = _context2.sent;

          case 44:
            _iteratorNormalCompletion = true;
            _context2.next = 8;
            break;

          case 47:
            _context2.next = 53;
            break;

          case 49:
            _context2.prev = 49;
            _context2.t1 = _context2["catch"](6);
            _didIteratorError = true;
            _iteratorError = _context2.t1;

          case 53:
            _context2.prev = 53;
            _context2.prev = 54;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 56:
            _context2.prev = 56;

            if (!_didIteratorError) {
              _context2.next = 59;
              break;
            }

            throw _iteratorError;

          case 59:
            return _context2.finish(56);

          case 60:
            return _context2.finish(53);

          case 61:
            console.log("\uD83D\uDCE1 Fetched entries: ", entries);
            return _context2.abrupt("return", entries);

          case 65:
            _context2.prev = 65;
            _context2.t2 = _context2["catch"](2);
            console.log('fetchFromGraphQL: 📡❌ fetching failed 😢: ', _context2.t2);

          case 68:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 65], [6, 49, 53, 61], [15, 27, 31, 39], [32,, 34, 38], [54,, 56, 60]]);
  }));
  return _fetchFromGraphQL.apply(this, arguments);
}