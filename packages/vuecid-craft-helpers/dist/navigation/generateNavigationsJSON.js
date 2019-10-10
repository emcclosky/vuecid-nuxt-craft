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

function generateNavigationsJSON(_x) {
  return _generateNavigationsJSON.apply(this, arguments);
}

function _generateNavigationsJSON() {
  _generateNavigationsJSON = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(_ref) {
    var endpoint, graphQLQuery, _ref$sections, sections, fileName, savePath, navigations, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, section, pages;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            endpoint = _ref.endpoint, graphQLQuery = _ref.graphQLQuery, _ref$sections = _ref.sections, sections = _ref$sections === void 0 ? [] : _ref$sections, fileName = _ref.fileName, savePath = _ref.savePath;
            navigations = {};
            _context.prev = 2;
            // load all entries for each section
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 6;
            _iterator = sections[Symbol.iterator]();

          case 8:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 17;
              break;
            }

            section = _step.value;
            _context.next = 12;
            return _axios["default"].post(endpoint, {
              // have to retransform AST gql template literal back to query string:
              // https://stackoverflow.com/a/57873339/1121268
              query: (0, _printer.print)(graphQLQuery),
              variables: {
                section: section
              }
            }).then(function (_ref2) {
              var data = _ref2.data;
              return data.data.entries;
            });

          case 12:
            pages = _context.sent;
            navigations[section] = pages;

          case 14:
            _iteratorNormalCompletion = true;
            _context.next = 8;
            break;

          case 17:
            _context.next = 23;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](6);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 23:
            _context.prev = 23;
            _context.prev = 24;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 26:
            _context.prev = 26;

            if (!_didIteratorError) {
              _context.next = 29;
              break;
            }

            throw _iteratorError;

          case 29:
            return _context.finish(26);

          case 30:
            return _context.finish(23);

          case 31:
            console.log('📡 Fetched navigations: ', navigations);
            (0, _saveFile["default"])(navigations, fileName, savePath); // // filter out sections which match ignoreProperties
            // if (payload.ignore) {
            //   payload.ignore.forEach(propertyToIgnore => {
            //     navigations[section] = pages.filter(page => {
            //       // if the entry does not even have the key we return
            //       if (!(propertyToIgnore.key in page)) return true
            //       // leave in array if the key is != the value
            //       return page[propertyToIgnore.key] !== propertyToIgnore.value
            //     })
            //   })
            // } else {
            //   navigations[section] = pages
            // }

            _context.next = 38;
            break;

          case 35:
            _context.prev = 35;
            _context.t1 = _context["catch"](2);
            console.log('generateNavigationJSON: 💾❌ loadNavigations() action failed 😢: ', _context.t1);

          case 38:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 35], [6, 19, 23, 31], [24,, 26, 30]]);
  }));
  return _generateNavigationsJSON.apply(this, arguments);
}