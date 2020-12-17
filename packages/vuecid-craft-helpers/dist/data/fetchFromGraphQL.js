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

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/* eslint-disable no-console */
function fetch(_x) {
  return _fetch.apply(this, arguments);
}

function _fetch() {
  _fetch = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
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
            }).then(function (_ref3) {
              var data = _ref3.data;
              return data.data[graphQLQueryName];
            });

          case 3:
            result = _context.sent;

            // filter out entries, that should not appear in JSON
            // Assuming that the property is a checkbox, where craft returns an empty array if false.
            // e.g.: "appearsInNavigation": [] || "appearsInNavigation": ["true"],
            if (propertiesToFilter && propertiesToFilter.length) {
              propertiesToFilter.forEach(function (property) {
                result = filterByProperty(result, property);
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

function filterByProperty() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var property = arguments.length > 1 ? arguments[1] : undefined;
  return data.filter(function (entry) {
    // check for children and call function recursively
    if (entry.children) {
      entry.children = filterByProperty(entry.children, property);
    } // if the entry does not even have the key we return


    if (!entry[property]) return true; // check if first array item is true, then leave entry in array
    // this is because a simple boolean value is still return as array

    return entry[property][0] ? entry[property][0] : false;
  });
}

function fetchFromGraphQL() {
  return _fetchFromGraphQL.apply(this, arguments);
}

function _fetchFromGraphQL() {
  _fetchFromGraphQL = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var _ref2,
        endpoint,
        graphQLQuery,
        _ref2$sections,
        sections,
        _ref2$graphQLQueryNam,
        graphQLQueryName,
        _ref2$langs,
        langs,
        _ref2$transforms,
        transforms,
        propertiesToFilter,
        entries,
        _iterator,
        _step,
        language,
        _iterator2,
        _step2,
        section,
        _args2 = arguments;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _ref2 = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {}, endpoint = _ref2.endpoint, graphQLQuery = _ref2.graphQLQuery, _ref2$sections = _ref2.sections, sections = _ref2$sections === void 0 ? [] : _ref2$sections, _ref2$graphQLQueryNam = _ref2.graphQLQueryName, graphQLQueryName = _ref2$graphQLQueryNam === void 0 ? 'entries' : _ref2$graphQLQueryNam, _ref2$langs = _ref2.langs, langs = _ref2$langs === void 0 ? [] : _ref2$langs, _ref2$transforms = _ref2.transforms, transforms = _ref2$transforms === void 0 ? [] : _ref2$transforms, propertiesToFilter = _ref2.propertiesToFilter;
            entries = {};
            _context2.prev = 2;
            // Actually for each language is equal to each craft site in a multisite setup!
            _iterator = _createForOfIteratorHelper(langs);
            _context2.prev = 4;

            _iterator.s();

          case 6:
            if ((_step = _iterator.n()).done) {
              _context2.next = 35;
              break;
            }

            language = _step.value;
            entries[language.lang] = {}; // check if we have to fetch section specific content

            if (!sections.length) {
              _context2.next = 30;
              break;
            }

            // load all entries for each section
            _iterator2 = _createForOfIteratorHelper(sections);
            _context2.prev = 11;

            _iterator2.s();

          case 13:
            if ((_step2 = _iterator2.n()).done) {
              _context2.next = 20;
              break;
            }

            section = _step2.value;
            _context2.next = 17;
            return fetch({
              endpoint: endpoint,
              graphQLQuery: graphQLQuery,
              section: section,
              graphQLQueryName: graphQLQueryName,
              language: language,
              propertiesToFilter: propertiesToFilter
            });

          case 17:
            entries[language.lang][section] = _context2.sent;

          case 18:
            _context2.next = 13;
            break;

          case 20:
            _context2.next = 25;
            break;

          case 22:
            _context2.prev = 22;
            _context2.t0 = _context2["catch"](11);

            _iterator2.e(_context2.t0);

          case 25:
            _context2.prev = 25;

            _iterator2.f();

            return _context2.finish(25);

          case 28:
            _context2.next = 33;
            break;

          case 30:
            _context2.next = 32;
            return fetch({
              endpoint: endpoint,
              graphQLQuery: graphQLQuery,
              graphQLQueryName: graphQLQueryName,
              language: language,
              propertiesToFilter: propertiesToFilter
            });

          case 32:
            entries[language.lang] = _context2.sent;

          case 33:
            _context2.next = 6;
            break;

          case 35:
            _context2.next = 40;
            break;

          case 37:
            _context2.prev = 37;
            _context2.t1 = _context2["catch"](4);

            _iterator.e(_context2.t1);

          case 40:
            _context2.prev = 40;

            _iterator.f();

            return _context2.finish(40);

          case 43:
            console.log("\uD83D\uDCE1 Fetched entries: ", entries);
            return _context2.abrupt("return", entries);

          case 47:
            _context2.prev = 47;
            _context2.t2 = _context2["catch"](2);
            console.log('fetchFromGraphQL: 📡❌ fetching failed 😢: ', _context2.t2);

          case 50:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 47], [4, 37, 40, 43], [11, 22, 25, 28]]);
  }));
  return _fetchFromGraphQL.apply(this, arguments);
}