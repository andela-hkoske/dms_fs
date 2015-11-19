var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  require('dotenv').load();
}
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./server/config')[env];
var app = express();
var seed = require('./server/seeds/index');

mongoose.connect(config.db, function(err) {
  if (err) {
    console.log('Error connecting to the database');
    console.log(err);
  } else {
    mongoose.connection.db.dropDatabase(function(err) {
      if (err) {
        return err;
      } else {
        console.log('Connected to the database...');
        console.log('Dropped database...');
        console.log('Seeding database...');
        seed();
      }
    });
  }
});

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(morgan('dev', {
  skip: function(req, res) {
    return res.statusCode < 400;
  }
}));

var apiRouter = express.Router();
var api = require('./server/routes')(app, apiRouter);
app.use('/api', api);

app.listen(config.port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Running on port ', config.port, '...');
  }
});

process.on('SIGINT', function() {
  console.log('Exiting...');
  process.exit();
});