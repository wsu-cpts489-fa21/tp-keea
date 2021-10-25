"use strict";

var _expressSession = _interopRequireDefault(require("express-session"));

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _config = _interopRequireDefault(require(".passport/config"));

var _authRoutes = _interopRequireDefault(require("./routes/authRoutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//////////////////////////////////////////////////////////////////////////
//IMPORTS AND VARIABLE INITIALIZATIONS
//The following code imports necessary dependencies and initializes
//variables used in the server middleware.
//////////////////////////////////////////////////////////////////////////
var PORT = process.env.PORT || process.env.LOCAL_PORT;
var app = (0, _express["default"])(); //Instantiate express app

(0, _config["default"])(app); //Configure passport
//////////////////////////////////////////////////////////////////////////
//INITIALIZE EXPRESS APP
// The following code uses express.static to serve the React app defined 
//in the client/ directory at PORT. It also writes an express session
//to a cookie, and defines auth routes to support OAuth.
/////////////////////////////////////////////////////////////////////////

app.use(_express["default"]["static"](_path["default"].join(__dirname, "client/build"))).use((0, _expressSession["default"])({
  secret: "speedgolf",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60
  }
})).use(_authRoutes["default"]).listen(PORT, function () {
  return console.log("Listening on ".concat(PORT));
});
