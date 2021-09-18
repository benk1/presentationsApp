require('express-async-errors');
require('dotenv').config();
const winston = require('winston');
const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const express = require('express');
const app = express();

app.use(cors());

// console.log(`NODE_ENV is: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);

require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

app.get('/', (req, res) => {
	res
		.set(
			'Content-Security-Policy',
			"default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'"
		)
		.send('<html><head></head><body></body></html>');
});

if (app.get('env') === 'development') {
	app.use(morgan('tiny'));
	debug('Morgan enabled...');
}

// if (process.env.NODE_ENV === 'production') {
// 	//db = process.env.presenters_db;
// 	app.use(express.static(path.join(__dirname, 'client/build')));

// 	console.log(__dirname);
// 	console.log(path.join(__dirname, 'client/build'));

// 	app.get('*', (req, res, next) =>
// 		res.sendFile(path.join(__dirname, 'client/build/index.html'))
// 	);
// }
//PORT
const PORT = process.env.PORT || config.get('port');
const server = app.listen(PORT, () =>
	winston.info(`Listening on Port ${PORT}...`)
);

module.exports = server;
