import { json, urlencoded } from 'body-parser';
import consign from 'consign';
import cors from 'cors';
import express from 'express';
import expressValidator from 'express-validator';
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8080;

// Allows any site to make request to this API
app.use(cors());

app.use(urlencoded({ extended: true }));
// Allows express to read the body and then parse that into a json
app.use(json());

app.use(expressValidator());


// Load and include files to be used into app.
consign({
	verbose: false,
	cwd: process.cwd()+'/src'
})
	.include('config')
	.then('connection.js')
	.then('services.js')
	.then('routes')
	.into(app);

app.listen(port, ()=> {
	console.log(`Address-book started on port ${port}`);
});

export default app;
