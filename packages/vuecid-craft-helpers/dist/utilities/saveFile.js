"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = saveFile;

var _fs = _interopRequireDefault(require("fs"));

function saveFile(data, fileName, config, additionalNaming) {
  console.log('save file'); // additionalNaming can for example be a number or a slug

  var json = JSON.stringify(data, null, config.compressJSON ? null : 2);
  var jsonSizeKB = Math.round(Buffer.byteLength(json, 'utf8') / 1024 * 100) / 100; // eslint-disable-next-line

  console.info("Writing ".concat(fileName, " (Length: ").concat(json.length, ", Size: ").concat(jsonSizeKB, "kB)"));
  return _fs["default"].writeFile("".concat(config.savePath, "/").concat(fileName), json, 'utf-8', function (err) {
    if (err) {
      throw err;
    } else {
      console.log("Wrote to ".concat(config.savePath, "/").concat(fileName, " successfully!")); // eslint-disable-line
    }
  });
}