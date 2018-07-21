var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var consign = require('consign');
var expressValidator = require('express-validator');
require('dotenv').config();

// Allows any site to make request to this API
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
// Allows express to read the body and then parse that into a json
app.use(bodyParser.json());

app.use(expressValidator());


// Load and include files to be used into app.
consign({
    verbose: false,
    cwd: process.cwd()+"/app"
}).include('config')
    .then('services.js')
    .then('infra')
    .then('routes')
    .into(app);

app.use(function (req, res, next) {
    res.status(404).send('Not found');
    next();
});


module.exports = app;
