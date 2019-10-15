"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = saveFile;

var _fs = _interopRequireDefault(require("fs"));

function saveFile() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      data = _ref.data,
      bundleName = _ref.bundleName,
      savePath = _ref.savePath,
      compressJSON = _ref.compressJSON,
      lang = _ref.lang;

  var json = JSON.stringify(data, null, compressJSON ? null : 2);
  var jsonSizeKB = Math.round(Buffer.byteLength(json, 'utf8') / 1024 * 100) / 100;
  var fileName = "".concat(bundleName).concat(lang ? ".".concat(lang) : '', ".json"); // eslint-disable-next-line

  console.info("Writing ".concat(fileName, " (Length: ").concat(json.length, ", Size: ").concat(jsonSizeKB, "kB)"));

  if (!_fs["default"].existsSync(savePath)) {
    _fs["default"].mkdirSync(savePath);
  }

  return _fs["default"].writeFile("".concat(savePath, "/").concat(fileName), json, 'utf-8', function (err) {
    if (err) {
      throw err;
    } else {
      console.log("\u2705\uD83D\uDCBE Wrote to ".concat(savePath, "/").concat(fileName, " successfully!")); // eslint-disable-line
    }
  });
}