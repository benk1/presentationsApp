const winston = require('winston');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const config = require('config');

dotenv.config();

module.exports = async function () {
  //const url =
    //'mongodb+srv://benk:4mathias@cluster0.hgieq.mongodb.net/students_1_db?retryWrites=true&w=majority';

  await mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => winston.info('Connected to MongoDB...'));
  // .catch((err) => console.error('Could not connect to MongoDB...', err));
};
