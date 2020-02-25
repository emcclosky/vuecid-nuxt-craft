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
  _regenerator["default"].mark(function _callee2() {
    var _ref,
        endpoint,
        graphQLQuery,
        _ref$compressJSON,
        compressJSON,
        _ref$sections,
        sections,
        _ref$graphQLQueryName,
        graphQLQueryName,
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
        _args3 = arguments;

    return _regenerator["default"].wrap(function _callee2$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _ref = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {}, endpoint = _ref.endpoint, graphQLQuery = _ref.graphQLQuery, _ref$compressJSON = _ref.compressJSON, compressJSON = _ref$compressJSON === void 0 ? true : _ref$compressJSON, _ref$sections = _ref.sections, sections = _ref$sections === void 0 ? [] : _ref$sections, _ref$graphQLQueryName = _ref.graphQLQueryName, graphQLQueryName = _ref$graphQLQueryName === void 0 ? 'entries' : _ref$graphQLQueryName, _ref$propertiesToFilt = _ref.propertiesToFilter, propertiesToFilter = _ref$propertiesToFilt === void 0 ? [] : _ref$propertiesToFilt, savePath = _ref.savePath, bundleName = _ref.bundleName, _ref$langs = _ref.langs, langs = _ref$langs === void 0 ? [] : _ref$langs;
            entries = {};
            _context3.prev = 2;
            // Actually for each language is equal to each craft site in a multisite setup!
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context3.prev = 6;
            _iterator = langs[Symbol.iterator]();

          case 8:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context3.next = 43;
              break;
            }

            language = _step.value;
            entries[language.lang] = {}; // check if we have to fetch section specific content

            if (!sections.length) {
              _context3.next = 39;
              break;
            }

            // load all entries for each section
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context3.prev = 15;
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
                        return data.data[graphQLQueryName];
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

          case 18:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context3.next = 23;
              break;
            }

            return _context3.delegateYield(_loop(), "t0", 20);

          case 20:
            _iteratorNormalCompletion2 = true;
            _context3.next = 18;
            break;

          case 23:
            _context3.next = 29;
            break;

          case 25:
            _context3.prev = 25;
            _context3.t1 = _context3["catch"](15);
            _didIteratorError2 = true;
            _iteratorError2 = _context3.t1;

          case 29:
            _context3.prev = 29;
            _context3.prev = 30;

            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }

          case 32:
            _context3.prev = 32;

            if (!_didIteratorError2) {
              _context3.next = 35;
              break;
            }

            throw _iteratorError2;

          case 35:
            return _context3.finish(32);

          case 36:
            return _context3.finish(29);

          case 37:
            _context3.next = 40;
            break;

          case 39:
            return _context3.delegateYield(
            /*#__PURE__*/
            _regenerator["default"].mark(function _callee() {
              var result;
              return _regenerator["default"].wrap(function _callee$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return _axios["default"].post(endpoint, {
                        // have to retransform AST gql template literal back to query string:
                        // https://stackoverflow.com/a/57873339/1121268
                        query: (0, _printer.print)(graphQLQuery),
                        variables: {
                          site: language.handle || 'default'
                        }
                      }).then(function (_ref3) {
                        var data = _ref3.data;
                        return data.data[graphQLQueryName];
                      });

                    case 2:
                      result = _context2.sent;

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
                      } // save sections in language object


                      entries[language.lang] = result;

                    case 5:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee);
            })(), "t2", 40);

          case 40:
            _iteratorNormalCompletion = true;
            _context3.next = 8;
            break;

          case 43:
            _context3.next = 49;
            break;

          case 45:
            _context3.prev = 45;
            _context3.t3 = _context3["catch"](6);
            _didIteratorError = true;
            _iteratorError = _context3.t3;

          case 49:
            _context3.prev = 49;
            _context3.prev = 50;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 52:
            _context3.prev = 52;

            if (!_didIteratorError) {
              _context3.next = 55;
              break;
            }

            throw _iteratorError;

          case 55:
            return _context3.finish(52);

          case 56:
            return _context3.finish(49);

          case 57:
            console.log("\uD83D\uDCE1 Fetched entries: ", entries); // save entries for each site in one file

            (0, _saveFile["default"])({
              data: entries,
              bundleName: bundleName,
              savePath: savePath,
              compressJSON: compressJSON
            });
            _context3.next = 64;
            break;

          case 61:
            _context3.prev = 61;
            _context3.t4 = _context3["catch"](2);
            console.log('generateDataJSON: 💾❌ loadentries() action failed 😢: ', _context3.t4);

          case 64:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee2, null, [[2, 61], [6, 45, 49, 57], [15, 25, 29, 37], [30,, 32, 36], [50,, 52, 56]]);
  }));
  return _generateDataJSON.apply(this, arguments);
}