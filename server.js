require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('./middleware/logger');
const presenters = require('./routes/presenters');
const express = require('express');
const { urlencoded } = require('express');
const app = express();

//console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
//console.log(`app: ${app.get('env')}`)
require('./startup/prod');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(helmet());
app.use(logger);
app.use('/api/presenters', presenters);

//configuration
console.log('Application Name: ' + config.get('name'));
//console.log('Mail Server: ' + config.get('mail.host'))
//console.log('Mail Password: ' + config.get('mail.password'))

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan enabled...');
}

if (process.env.NODE_ENV === 'production') {
  //db = process.env.presenters_db;
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res, next) =>
    res.sendFile(path.join(__dirname, '/client/build/index.html'))
  );
}

//const url =
//'mongodb+srv://benk:4mathias@cluster0.hgieq.mongodb.net/students_1_db?retryWrites=true&w=majority';
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Connected to MongoDB...'));

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));
