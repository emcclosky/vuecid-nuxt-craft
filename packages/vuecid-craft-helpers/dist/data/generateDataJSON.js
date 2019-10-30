"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generateDataJSON;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

var _printer = require("graphql/language/printer");

var _saveFile = _interopRequireDefault(require("../utilities/saveFile.js"));

/* eslint-disable no-console */
function generateDataJSON() {
  return _generateDataJSON.apply(this, arguments);
}

function _generateDataJSON() {
  _generateDataJSON = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var _ref,
        endpoint,
        graphQLQuery,
        _ref$compressJSON,
        compressJSON,
        _ref$sections,
        sections,
        _ref$propertiesToFilt,
        propertiesToFilter,
        savePath,
        bundleName,
        _ref$langs,
        langs,
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
        _loop,
        _iterator2,
        _step2,
        _args2 = arguments;

    return _regenerator["default"].wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _ref = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {}, endpoint = _ref.endpoint, graphQLQuery = _ref.graphQLQuery, _ref$compressJSON = _ref.compressJSON, compressJSON = _ref$compressJSON === void 0 ? true : _ref$compressJSON, _ref$sections = _ref.sections, sections = _ref$sections === void 0 ? [] : _ref$sections, _ref$propertiesToFilt = _ref.propertiesToFilter, propertiesToFilter = _ref$propertiesToFilt === void 0 ? [] : _ref$propertiesToFilt, savePath = _ref.savePath, bundleName = _ref.bundleName, _ref$langs = _ref.langs, langs = _ref$langs === void 0 ? [] : _ref$langs;
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
              _context2.next = 39;
              break;
            }

            language = _step.value;
            entries[language.lang] = {}; // load all entries for each section

            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context2.prev = 14;
            _loop =
            /*#__PURE__*/
            _regenerator["default"].mark(function _loop() {
              var section, pages;
              return _regenerator["default"].wrap(function _loop$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      section = _step2.value;
                      _context.next = 3;
                      return _axios["default"].post(endpoint, {
                        // have to retransform AST gql template literal back to query string:
                        // https://stackoverflow.com/a/57873339/1121268
                        query: (0, _printer.print)(graphQLQuery),
                        variables: {
                          section: section,
                          site: language.handle || 'default'
                        }
                      }).then(function (_ref2) {
                        var data = _ref2.data;
                        return data.data.entries;
                      });

                    case 3:
                      pages = _context.sent;

                      // filter out entries, that should not appear in JSON
                      // Assuming that the property is a checkbox, where craft returns an empty array if false.
                      // e.g.: "appearsInNavigation": [] || "appearsInNavigation": ["true"],
                      if (propertiesToFilter && propertiesToFilter.length) {
                        propertiesToFilter.forEach(function (property) {
                          pages = pages.filter(function (page) {
                            // if the entry does not even have the key we return
                            if (!page[property]) return true; // check if first array item is true, then leave entry in array

                            return page[property][0] ? page[property][0] : false;
                          });
                        });
                      } // save sections in language object


                      entries[language.lang][section] = pages;

                    case 6:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _loop);
            });
            _iterator2 = sections[Symbol.iterator]();

          case 17:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context2.next = 22;
              break;
            }

            return _context2.delegateYield(_loop(), "t0", 19);

          case 19:
            _iteratorNormalCompletion2 = true;
            _context2.next = 17;
            break;

          case 22:
            _context2.next = 28;
            break;

          case 24:
            _context2.prev = 24;
            _context2.t1 = _context2["catch"](14);
            _didIteratorError2 = true;
            _iteratorError2 = _context2.t1;

          case 28:
            _context2.prev = 28;
            _context2.prev = 29;

            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }

          case 31:
            _context2.prev = 31;

            if (!_didIteratorError2) {
              _context2.next = 34;
              break;
            }

            throw _iteratorError2;

          case 34:
            return _context2.finish(31);

          case 35:
            return _context2.finish(28);

          case 36:
            _iteratorNormalCompletion = true;
            _context2.next = 8;
            break;

          case 39:
            _context2.next = 45;
            break;

          case 41:
            _context2.prev = 41;
            _context2.t2 = _context2["catch"](6);
            _didIteratorError = true;
            _iteratorError = _context2.t2;

          case 45:
            _context2.prev = 45;
            _context2.prev = 46;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 48:
            _context2.prev = 48;

            if (!_didIteratorError) {
              _context2.next = 51;
              break;
            }

            throw _iteratorError;

          case 51:
            return _context2.finish(48);

          case 52:
            return _context2.finish(45);

          case 53:
            console.log("\uD83D\uDCE1 Fetched entries: ", entries); // save entries for each site in one file

            (0, _saveFile["default"])({
              data: entries,
              bundleName: bundleName,
              savePath: savePath,
              compressJSON: compressJSON
            });
            _context2.next = 60;
            break;

          case 57:
            _context2.prev = 57;
            _context2.t3 = _context2["catch"](2);
            console.log('generateDataJSON: 💾❌ loadentries() action failed 😢: ', _context2.t3);

          case 60:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee, null, [[2, 57], [6, 41, 45, 53], [14, 24, 28, 36], [29,, 31, 35], [46,, 48, 52]]);
  }));
  return _generateDataJSON.apply(this, arguments);
}