import newrelic from 'newrelic'; //do not remove this line, it starting newrelic
import db from './datasources/mongoose';
import express from 'express' ;
import bodyParser from 'body-parser';
import config from './settings/config';
import lusca from 'lusca';
import fs from 'fs';
import logger from 'morgan';
import bugsnag from 'bugsnag';
import router from './app/routes';
//Temporary comment, remove after arc-authorization
// import {oauth2} from './helpers/oauth2';
import {responseStructure} from './helpers/response';
import {gateRequestMiddleware} from './helpers/gates';

// Init our APP
let app = express();

app.set('config', config);

// Register BugSnag error handler
bugsnag.register(app.get('config').get('bugsnag').get('apiKey'));

//Connect to the database
db.connect();

// Parse request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Security features
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

//Temporary comment, remove after arc-authorization
// app.use(oauth2.errorHandler());

//Use correct response structure
app.use(responseStructure);

// Apply API request versioning gates
app.use(gateRequestMiddleware());

//Include controllers
app.use('', router);

// Dev environment tooling
if (app.get('config').get('env') === "sandbox") {
  console.log("This is 'sandbox' environment, starting dev tools.");
  app.use(logger('dev'));

  // Log errors in console
  app.use(function (err, req, res, next) {
    res.sendJsonError(err.status, err.message);
    next(err);
  });
} else {
  let accessLogStream = fs.createWriteStream(__dirname + '/var/logs/access.log', {flags: 'a'});
  app.use(logger('short', {stream: accessLogStream}));
  // Integrate BugSnag error handling Middlewares
  app.use(bugsnag.requestHandler);
  app.use(bugsnag.errorHandler);

  // Production Error Handler
  app.use(function (err, req, res, next) {
    res.sendJsonError(err.status, err.message);
  });
}

export default app;
