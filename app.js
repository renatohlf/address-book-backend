var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var consign = require('consign');
var expressValidator = require('express-validator');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());

consign({
    verbose: false,
    cwd: process.cwd()+"/app"
}).include('services.js')
    .then('infra')
    .then('routes')
    .into(app);

app.use(function (req, res, next) {
    res.status(404).send('Not found');
    next();
});


module.exports = app;
