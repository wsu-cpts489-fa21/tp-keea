"use strict";

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// server.js -- A simple Express.js web server for serving a React.js app
var PORT = process.env.PORT || 8081;
var app = (0, _express["default"])();
app.use(_express["default"]["static"](_path["default"].join(__dirname, 'client', 'build')));
app.listen(PORT, function () {
  console.log("Server listening at port ".concat(PORT, "."));
});
