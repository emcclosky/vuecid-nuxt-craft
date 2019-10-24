"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loadPreview;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

var _printer = require("graphql/language/printer");

/* eslint-disable no-console */

/*
 * Load preview data from Craft CMS.
 * Craft CMS opens an iframe in the LivePreview window
 * and sends two extra url parameters: 'x-craft-live-preview'' & 'token'.
 * If we send these parameters with our axios call, we get back the latest draft of the entry.
 *
 * @param {Object} options - The options object to pass in
 * @param {string} options.slug – includes the slug of the entry
 * @param {string} options.query – the graphql query that loads the data of the page
 * @param {Object} options.env – includes env variables like backend url and graphql endpoint
 * @param {boolean} options.isDev – when true we fetch from local endpoint
 * @param {string} options.graphQLQuery – includes, what should be fetched from the graphql service
 * @param {string} [options.debug]
 * @return {(Object|boolean)} - including preview data or returns false
 */
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

            console.info('Preview is displayed!');
            endpointBase = isDev ? "".concat(env.BACKENDURLLOCAL).concat(env.GRAPHQL_PATH) : "".concat(env.BACKENDURLPRODUCTION).concat(env.GRAPHQL_PATH);
            endpoint = "".concat(endpointBase, "?x-craft-live-preview={query['x-craft-live-preview]}&token=").concat(query.token);
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
                console.warn('Tried to fetch a preview, but no entries found from axios request');
                return false;
              }
            })["catch"](function (error) {
              console.log('error: ', error);
            });

          case 8:
            previewData = _context.sent;
            return _context.abrupt("return", {
              page: previewData,
              preview: true
            });

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