"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

var _vuecidHelpers = require("@wearelucid/vuecid-helpers");

function generateRoutesFromData() {
  return _generateRoutesFromData.apply(this, arguments);
}

function _generateRoutesFromData() {
  _generateRoutesFromData = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var options,
        token,
        endpoint,
        section,
        routes,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {
              endpoint: '',
              section: 'pages',
              token: '',
              homeSlug: 'home',
              debug: false
            };
            token = options.token, endpoint = options.endpoint, section = options.section;
            console.log('options: ', options);

            if (options.debug) {
              console.log('options: ', options); // eslint-disable-line
            } // Fetch all sections with the specified section name from your GraphQL API


            _context.next = 6;
            return _axios["default"].post(endpoint, {
              query: "{ entries (section: [".concat(section, "]) { uri } }")
            }, {
              headers: {
                Authorization: "Bearer ".concat(token)
              }
            }).then(function (result) {
              if (options.debug) {
                console.log('result: ', result); // eslint-disable-line
              }

              if (result.data.data.entries) {
                return result.data.data.entries.map(function (r) {
                  return r.uri;
                });
              } else {
                throw new Error('No sections found with this query. -> check return value from axios request: ', result);
              }
            })["catch"](function (error) {
              console.log('error: ', error); // eslint-disable-line no-console
            });

          case 6:
            routes = _context.sent;

            if (routes) {
              _context.next = 11;
              break;
            }

            throw new Error('❌ – No routes could be fetched');

          case 11:
            console.log('📩 – Successfully fetched routes: ', routes); // eslint-disable-line no-console

          case 12:
            // Kick out all the pages containing the home slug
            // This could also delete a page that contains a string like '…/home…'
            // maybe a page with the permalink /pages/something/home-sweet-home
            // Sadly this step is necessary since we can not redirect() with our middleware during generate
            routes = routes.filter(function (r) {
              return !r.includes("/".concat(options.homeSlug));
            }).map(function (r) {
              return (0, _vuecidHelpers.verifyLeadingSlash)((0, _vuecidHelpers.removeTrailingSlash)(r));
            });
            return _context.abrupt("return", routes);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _generateRoutesFromData.apply(this, arguments);
}

var _default = generateRoutesFromData;
exports["default"] = _default;