"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _vuecidHelpers = require("@wearelucid/vuecid-helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function generateRoutesFromData() {
  return _generateRoutesFromData.apply(this, arguments);
}

function _generateRoutesFromData() {
  _generateRoutesFromData = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var options,
        token,
        endpoint,
        section,
        routes,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
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

            if (options.debug) {
              console.log('options: ', options); // eslint-disable-line
            } // Fetch all sections with the specified section name from your GraphQL API


            _context.next = 5;
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

          case 5:
            routes = _context.sent;

            if (routes) {
              _context.next = 10;
              break;
            }

            throw new Error('❌ – No routes could be fetched');

          case 10:
            console.log('📩 – Successfully fetched routes: ', routes); // eslint-disable-line no-console

          case 11:
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

          case 13:
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