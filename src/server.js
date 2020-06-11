import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import routes from './routes.js';

const app = express();

dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

// Allows any site to make request to this API
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

// Allows express to read the body and then parse that into a json
app.use(bodyParser.json());

app.use(routes);

export default app;
