"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loadPreview;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

var _printer = require("graphql/language/printer");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function loadPreview() {
  return _loadPreview.apply(this, arguments);
}

function _loadPreview() {
  _loadPreview = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var options,
        query,
        slug,
        env,
        graphQLQuery,
        isDev,
        endpointBase,
        endpoint,
        previewData,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {
              slug: '',
              query: '',
              // query params, we are looking for tokens
              env: {},
              isDev: false,
              graphQLQuery: '' // the passed .gql files content

            };
            query = options.query, slug = options.slug, env = options.env, graphQLQuery = options.graphQLQuery, isDev = options.isDev; // If we see a preview token we need axios to fetch the data
            // Because with apollo we can't send the bearer token AND the craft token at the same time

            if (!(query['x-craft-live-preview'] && query.token)) {
              _context.next = 10;
              break;
            }

            console.info('Preview is displayed!'); // ⚠️ If you use `nuxt generate` to test live preview locally
            // isDev is undefined and it will try to fetch from remote (which will fail)
            // to test this, use the BACKENDURLLOCAL in all cases

            endpointBase = isDev ? "".concat(env.BACKENDURLLOCAL).concat(env.GRAPHQL_PATH) : "".concat(env.BACKENDURLPRODUCTION).concat(env.GRAPHQL_PATH);
            endpoint = "".concat(endpointBase, "?x-craft-live-preview=").concat(query['x-craft-live-preview'], "&token=").concat(query.token);
            _context.next = 8;
            return _axios["default"].post(endpoint, {
              // have to retransform AST gql template literal back to query string:
              // https://stackoverflow.com/a/57873339/1121268
              query: (0, _printer.print)(graphQLQuery),
              variables: {
                slug: slug,
                site: query.site || 'default'
              }
            }).then(function (result) {
              if (result && result.data && result.data.data && result.data.data.entries[0]) {
                return result.data.data.entries[0];
              } else {
                console.warn('Tried to fetch a preview, but no entries found from axios request. Doublecheck your env (local vs remote).', 'You are now trying to fetch from: ', endpoint);
                return false;
              }
            })["catch"](function (error) {
              console.log('error: ', error);
            });

          case 8:
            previewData = _context.sent;
            return _context.abrupt("return", _objectSpread({}, previewData, {
              preview: true
            }));

          case 10:
            return _context.abrupt("return", false);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _loadPreview.apply(this, arguments);
}