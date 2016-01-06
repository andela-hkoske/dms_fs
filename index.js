var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  require('dotenv').load();
}
var express = require('express'),
  morgan = require('morgan'),
  path = require('path'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  config = require('./server/config')[env],
  app = express(),
  seed = require('./server/seeds/index');

mongoose.connect(config.db, function(err) {
  if (err) {
    console.log('Error connecting to the database');
    console.log(err);
  } else {
    console.log('Connected to the database...');
    if (env === 'test') {
      mongoose.connection.db.dropDatabase(function(err) {
        if (err) {
          return err;
        } else {
          console.log('Dropped database...');
          console.log('Seeding database...');
          seed();
        }
      });
    }
  }
});

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'jade');


app.use(morgan('dev', {
    skip: function(req, res) {
      return res.statusCode < 400;
    }
  }

));

app.use(express.static(path.join(__dirname, './public')));

var apiRouter = express.Router();
var api = require('./server/routes')(app, apiRouter);
app.use('/api', api);

app.get('/*', function(req, res) {
  res.sendFile('index.html', {
    root: './public'
  });
});

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
