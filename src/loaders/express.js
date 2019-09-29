import bodyParser from 'body-parser';
import config from '../config/index';
import routes from '../api/index';
import logger from 'morgan';
import express from 'express';
import proxy from 'express-http-proxy';

export default (app) => {

  // Health Check endpoints
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  // allow static files
  app.use(express.static('src/public'));

  // proxy to fathom
  app.use('/fathom/', proxy('localhost:8080'));

  // set up dependencies
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(logger('dev'));

  //cors
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

  // Load API routes
  app.use(config.api.prefix, routes);

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  // error handlers
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });

}