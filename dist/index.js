'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _bodyParser = require('body-parser');

var _consign = require('consign');

var _consign2 = _interopRequireDefault(_consign);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidator = require('express-validator');

var _expressValidator2 = _interopRequireDefault(_expressValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
require('dotenv').config();
var port = process.env.PORT || 8080;

// Allows any site to make request to this API
app.use((0, _cors2.default)());

app.use((0, _bodyParser.urlencoded)({ extended: true }));
// Allows express to read the body and then parse that into a json
app.use((0, _bodyParser.json)());

app.use((0, _expressValidator2.default)());

// Load and include files to be used into app.
(0, _consign2.default)({
	verbose: true,
	cwd: process.cwd() + '/src'
}).include('config').then('connection.js').then('services.js').then('routes').into(app);

app.listen(port, function () {
	console.log('Started on port ' + port);
});

exports.default = app;
//# sourceMappingURL=index.js.map