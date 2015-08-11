'use strict';

import express from 'express';
import path from 'path';
import config from '../config';
import bodyParser from 'body-parser';
import {sequelize} from './models';
import api from './routes';

var app = express();

// middleware
app.use(express.static(path.resolve(__dirname, '../client/public')));
app.use(bodyParser.json());

// Mount API routes
app.use('/api', api);

// Catch JWT Unauthorized Errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).send('Invalid token.');
  }
  next();
});

// Any other routes respond with index.html
app.get('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../client/public/index.html'));
});

sequelize.sync().then(function() {
  app.listen(3000, function () {
    console.log('Server now listening at http://localhost:3000');
  });
});
