const express = require('express');
const users = require('../routes/users');
const auth = require('../routes//auth');
const presenters = require('../routes/presenters');

const error = require('../middleware/error');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const logger = require('../middleware/logger');

module.exports = function (app) {
  //initialize routes
  app.use(express.json());
  // app.use(express.urlencoded({ extended: true }));
  //  app.use(bodyParser.json());
  //  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static('public'));
  app.use(logger);
  app.use(error);
  app.use(helmet());
  app.use('/presenters', presenters);
  app.use('/users', users);
  app.use('/auth', auth);
  app.use(logger);
  app.use(error);
};
