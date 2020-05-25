"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "isHomeSlug", {
  enumerable: true,
  get: function get() {
    return _isHomeSlug["default"];
  }
});
Object.defineProperty(exports, "stripTrailingHomeSlug", {
  enumerable: true,
  get: function get() {
    return _stripTrailingHomeSlug["default"];
  }
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
Object.defineProperty(exports, "generateDataJSON", {
  enumerable: true,
  get: function get() {
    return _generateDataJSON["default"];
  }
});
Object.defineProperty(exports, "fetchFromGraphQL", {
  enumerable: true,
  get: function get() {
    return _fetchFromGraphQL["default"];
  }
});
Object.defineProperty(exports, "loadPreview", {
  enumerable: true,
  get: function get() {
    return _loadPreview["default"];
  }
});
Object.defineProperty(exports, "flattenNavigation", {
  enumerable: true,
  get: function get() {
    return _flattenNavigation["default"];
  }
});
Object.defineProperty(exports, "addLanguagePrefixes", {
  enumerable: true,
  get: function get() {
    return _addLanguagePrefixes["default"];
  }
});
Object.defineProperty(exports, "generateMetaFromSeomatic", {
  enumerable: true,
  get: function get() {
    return _generateMetaFromSeomatic["default"];
  }
});
Object.defineProperty(exports, "saveFile", {
  enumerable: true,
  get: function get() {
    return _saveFile["default"];
  }
});

var _isHomeSlug = _interopRequireDefault(require("./url/isHomeSlug"));

var _stripTrailingHomeSlug = _interopRequireDefault(require("./url/stripTrailingHomeSlug"));

var _generateLocalizedRoutes = _interopRequireDefault(require("./routes/generateLocalizedRoutes"));

var _generateRoutesFromData = _interopRequireDefault(require("./routes/generateRoutesFromData"));

var _generateDataJSON = _interopRequireDefault(require("./data/generateDataJSON"));

var _fetchFromGraphQL = _interopRequireDefault(require("./data/fetchFromGraphQL"));

var _loadPreview = _interopRequireDefault(require("./preview/loadPreview"));

var _flattenNavigation = _interopRequireDefault(require("./navigation/flattenNavigation"));

var _addLanguagePrefixes = _interopRequireDefault(require("./navigation/addLanguagePrefixes"));

var _generateMetaFromSeomatic = _interopRequireDefault(require("./meta/generateMetaFromSeomatic"));

var _saveFile = _interopRequireDefault(require("./utilities/saveFile"));