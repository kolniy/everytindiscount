"use strict";

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("./routes/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var PORT = process.env.PORT || 4000;
app.get('/', function (req, res) {
  return res.send("welcome to everytindiscount. this is our official API");
});
app.use(_express["default"].json());
app.use('/users', _user["default"]);
app.listen(PORT, function () {
  return console.log("server listening on port ".concat(PORT));
});