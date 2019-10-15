"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "generateLocalizedRoutes", {
  enumerable: true,
  get: function get() {
    return _generateLocalizedRoutes["default"];
  }
});
Object.defineProperty(exports, "generateRoutesFromData", {
  enumerable: true,
  get: function get() {
    return _generateRoutesFromData["default"];
  }
});
Object.defineProperty(exports, "generateNavigationsJSON", {
  enumerable: true,
  get: function get() {
    return _generateNavigationsJSON["default"];
  }
});
Object.defineProperty(exports, "flattenNavigation", {
  enumerable: true,
  get: function get() {
    return _flattenNavigation["default"];
  }
});
Object.defineProperty(exports, "generateMetaFromSeomatic", {
  enumerable: true,
  get: function get() {
    return _generateMetaFromSeomatic["default"];
  }
});

var _generateLocalizedRoutes = _interopRequireDefault(require("./routes/generateLocalizedRoutes"));

var _generateRoutesFromData = _interopRequireDefault(require("./routes/generateRoutesFromData"));

var _generateNavigationsJSON = _interopRequireDefault(require("./navigation/generateNavigationsJSON"));

var _flattenNavigation = _interopRequireDefault(require("./navigation/flattenNavigation"));

var _generateMetaFromSeomatic = _interopRequireDefault(require("./meta/generateMetaFromSeomatic"));