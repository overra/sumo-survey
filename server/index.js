'use strict';

import express from 'express';
import session from 'express-session';
import path from 'path';
import config from '../config';

var app = express();

// middleware
app.use(session({
  secret: config.sessionSecret,
  saveUninitialized: true,
  resave: false
}));
app.use(express.static(path.resolve(__dirname, '../client/public')));

app.listen(3000, function () {
  console.log('Server now listening at http://localhost:3000');
});
