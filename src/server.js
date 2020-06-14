import Sentry from '@sentry/node';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import routes from './routes.js';

Sentry.init({ dsn: 'https://118c5da6c2954c2f804933909645bed1@o407076.ingest.sentry.io/5275628' });

const app = express();

dotenv.config({
    path: '.env'
});

// Allows any site to make request to this API
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

// Allows express to read the body and then parse that into a json
app.use(bodyParser.json());

app.use(routes);

export default app;
