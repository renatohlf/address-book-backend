import express from 'express';
var app = express();
import cors from 'cors';
import { urlencoded, json } from 'body-parser';
import consign from 'consign';
import expressValidator from 'express-validator';
require('dotenv').config();

// Allows any site to make request to this API
app.use(cors());

app.use(urlencoded({ extended: true }));
// Allows express to read the body and then parse that into a json
app.use(json());

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


export default app;
