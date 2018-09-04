import { json, urlencoded } from 'body-parser';
import consign from 'consign';
import cors from 'cors';
import express from 'express';
import expressValidator from 'express-validator';
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

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

app.listen(port, ()=> {
    console.log(`Started on port ${port}`);
});

export default app;
