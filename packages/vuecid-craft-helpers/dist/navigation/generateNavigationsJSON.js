"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generateNavigationsJSON;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

var _printer = require("graphql/language/printer");

var _saveFile = _interopRequireDefault(require("../utilities/saveFile.js"));

/* eslint-disable no-console */
function generateNavigationsJSON() {
  return _generateNavigationsJSON.apply(this, arguments);
}

function _generateNavigationsJSON() {
  _generateNavigationsJSON = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var _ref,
        endpoint,
        graphQLQuery,
        _ref$compressJSON,
        compressJSON,
        _ref$sections,
        sections,
        bundleName,
        savePath,
        _ref$langs,
        langs,
        navigations,
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
            _ref = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, endpoint = _ref.endpoint, graphQLQuery = _ref.graphQLQuery, _ref$compressJSON = _ref.compressJSON, compressJSON = _ref$compressJSON === void 0 ? true : _ref$compressJSON, _ref$sections = _ref.sections, sections = _ref$sections === void 0 ? [] : _ref$sections, bundleName = _ref.bundleName, savePath = _ref.savePath, _ref$langs = _ref.langs, langs = _ref$langs === void 0 ? [] : _ref$langs;
            navigations = {};
            _context.prev = 2;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 6;
            _iterator = langs[Symbol.iterator]();

          case 8:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 43;
              break;
            }

            language = _step.value;
            // load all entries for each section
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 13;
            _iterator2 = sections[Symbol.iterator]();

          case 15:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context.next = 24;
              break;
            }

            section = _step2.value;
            _context.next = 19;
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

          case 19:
            pages = _context.sent;
            navigations[section] = pages;

          case 21:
            _iteratorNormalCompletion2 = true;
            _context.next = 15;
            break;

          case 24:
            _context.next = 30;
            break;

          case 26:
            _context.prev = 26;
            _context.t0 = _context["catch"](13);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t0;

          case 30:
            _context.prev = 30;
            _context.prev = 31;

            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }

          case 33:
            _context.prev = 33;

            if (!_didIteratorError2) {
              _context.next = 36;
              break;
            }

            throw _iteratorError2;

          case 36:
            return _context.finish(33);

          case 37:
            return _context.finish(30);

          case 38:
            console.log("\uD83D\uDCE1 Fetched ".concat(language.lang, " navigations: "), navigations);
            (0, _saveFile["default"])({
              data: navigations,
              bundleName: bundleName,
              savePath: savePath,
              compressJSON: compressJSON,
              lang: language.lang
            });

          case 40:
            _iteratorNormalCompletion = true;
            _context.next = 8;
            break;

          case 43:
            _context.next = 49;
            break;

          case 45:
            _context.prev = 45;
            _context.t1 = _context["catch"](6);
            _didIteratorError = true;
            _iteratorError = _context.t1;

          case 49:
            _context.prev = 49;
            _context.prev = 50;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 52:
            _context.prev = 52;

            if (!_didIteratorError) {
              _context.next = 55;
              break;
            }

            throw _iteratorError;

          case 55:
            return _context.finish(52);

          case 56:
            return _context.finish(49);

          case 57:
            _context.next = 62;
            break;

          case 59:
            _context.prev = 59;
            _context.t2 = _context["catch"](2);
            console.log('generateNavigationJSON: 💾❌ loadNavigations() action failed 😢: ', _context.t2);

          case 62:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 59], [6, 45, 49, 57], [13, 26, 30, 38], [31,, 33, 37], [50,, 52, 56]]);
  }));
  return _generateNavigationsJSON.apply(this, arguments);
}