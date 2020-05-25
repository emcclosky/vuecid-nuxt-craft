"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generateDataJSON;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _saveFile = _interopRequireDefault(require("../utilities/saveFile.js"));

var _fetchFromGraphQL = _interopRequireDefault(require("./fetchFromGraphQL.js"));

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
        _ref$graphQLQueryName,
        graphQLQueryName,
        _ref$propertiesToFilt,
        propertiesToFilter,
        savePath,
        bundleName,
        _ref$langs,
        langs,
        _ref$transforms,
        transforms,
        entries,
        _args = arguments;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, endpoint = _ref.endpoint, graphQLQuery = _ref.graphQLQuery, _ref$compressJSON = _ref.compressJSON, compressJSON = _ref$compressJSON === void 0 ? true : _ref$compressJSON, _ref$sections = _ref.sections, sections = _ref$sections === void 0 ? [] : _ref$sections, _ref$graphQLQueryName = _ref.graphQLQueryName, graphQLQueryName = _ref$graphQLQueryName === void 0 ? 'entries' : _ref$graphQLQueryName, _ref$propertiesToFilt = _ref.propertiesToFilter, propertiesToFilter = _ref$propertiesToFilt === void 0 ? [] : _ref$propertiesToFilt, savePath = _ref.savePath, bundleName = _ref.bundleName, _ref$langs = _ref.langs, langs = _ref$langs === void 0 ? [] : _ref$langs, _ref$transforms = _ref.transforms, transforms = _ref$transforms === void 0 ? [] : _ref$transforms;
            entries = {};
            _context.prev = 2;
            _context.next = 5;
            return (0, _fetchFromGraphQL["default"])({
              endpoint: endpoint,
              graphQLQuery: graphQLQuery,
              sections: sections,
              graphQLQueryName: graphQLQueryName,
              langs: langs,
              propertiesToFilter: propertiesToFilter
            });

          case 5:
            entries = _context.sent;
            // save entries for each site in one file
            (0, _saveFile["default"])({
              data: entries,
              bundleName: bundleName,
              savePath: savePath,
              compressJSON: compressJSON
            });
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](2);
            console.log('generateDataJSON: 📡💾❌ fetching and generating data json failed 😢: ', _context.t0); // prettier-ignore

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 9]]);
  }));
  return _generateDataJSON.apply(this, arguments);
}