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
        _iterator2,
        _step2,
        section,
        pages,
        _args = arguments;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, endpoint = _ref.endpoint, graphQLQuery = _ref.graphQLQuery, _ref$compressJSON = _ref.compressJSON, compressJSON = _ref$compressJSON === void 0 ? true : _ref$compressJSON, _ref$sections = _ref.sections, sections = _ref$sections === void 0 ? [] : _ref$sections, savePath = _ref.savePath, bundleName = _ref.bundleName, _ref$langs = _ref.langs, langs = _ref$langs === void 0 ? [] : _ref$langs;
            entries = {};
            _context.prev = 2;
            // Actually for each language is equal to each craft site in a multisite setup!
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 6;
            _iterator = langs[Symbol.iterator]();

          case 8:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 42;
              break;
            }

            language = _step.value;
            entries[language.lang] = {}; // load all entries for each section

            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 14;
            _iterator2 = sections[Symbol.iterator]();

          case 16:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context.next = 25;
              break;
            }

            section = _step2.value;
            _context.next = 20;
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

          case 20:
            pages = _context.sent;
            // save sections in language object
            entries[language.lang][section] = pages;

          case 22:
            _iteratorNormalCompletion2 = true;
            _context.next = 16;
            break;

          case 25:
            _context.next = 31;
            break;

          case 27:
            _context.prev = 27;
            _context.t0 = _context["catch"](14);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t0;

          case 31:
            _context.prev = 31;
            _context.prev = 32;

            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }

          case 34:
            _context.prev = 34;

            if (!_didIteratorError2) {
              _context.next = 37;
              break;
            }

            throw _iteratorError2;

          case 37:
            return _context.finish(34);

          case 38:
            return _context.finish(31);

          case 39:
            _iteratorNormalCompletion = true;
            _context.next = 8;
            break;

          case 42:
            _context.next = 48;
            break;

          case 44:
            _context.prev = 44;
            _context.t1 = _context["catch"](6);
            _didIteratorError = true;
            _iteratorError = _context.t1;

          case 48:
            _context.prev = 48;
            _context.prev = 49;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 51:
            _context.prev = 51;

            if (!_didIteratorError) {
              _context.next = 54;
              break;
            }

            throw _iteratorError;

          case 54:
            return _context.finish(51);

          case 55:
            return _context.finish(48);

          case 56:
            console.log("\uD83D\uDCE1 Fetched entries: ", entries); // save entries for each site in one file

            (0, _saveFile["default"])({
              data: entries,
              bundleName: bundleName,
              savePath: savePath,
              compressJSON: compressJSON
            }); // // filter out sections which match ignoreProperties
            // if (payload.ignore) {
            //   payload.ignore.forEach(propertyToIgnore => {
            //     entries[section] = pages.filter(page => {
            //       // if the entry does not even have the key we return
            //       if (!(propertyToIgnore.key in page)) return true
            //       // leave in array if the key is != the value
            //       return page[propertyToIgnore.key] !== propertyToIgnore.value
            //     })
            //   })
            // } else {
            //   entries[section] = pages
            // }

            _context.next = 63;
            break;

          case 60:
            _context.prev = 60;
            _context.t2 = _context["catch"](2);
            console.log('generateDataJSON: 💾❌ loadentries() action failed 😢: ', _context.t2);

          case 63:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 60], [6, 44, 48, 56], [14, 27, 31, 39], [32,, 34, 38], [49,, 51, 55]]);
  }));
  return _generateDataJSON.apply(this, arguments);
}