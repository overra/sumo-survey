'use strict';

import express from 'express';
import session from 'express-session';
import path from 'path';
import config from '../config';
import passport from './passport';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

var app = express();

// middleware
app.use(express.static(path.resolve(__dirname, '../client/public')));
app.use(session({
  secret: config.sessionSecret,
  saveUninitialized: true,
  resave: false
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// routes
app.post('/authenticate', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({error: info});
    }

    delete user.password;
    var token = jwt.sign(user, 'secret token');
    req.login(user, function (err) {
      res.json({token});
    });
  })(req, res, next);
});

app.get('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../client/public/index.html'));
});

app.listen(3000, function () {
  console.log('Server now listening at http://localhost:3000');
});
