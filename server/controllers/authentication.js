'use strict';

import jwt from 'jsonwebtoken';
import {jwtSecret} from '../../config';
import {User} from '../models';
import debug from 'debug';

let log = debug('ss:auth');

const incorrectCredentials = {
  success: false,
  error: 'Incorrect credentials'
};

const serverError = {
  success: false,
  message: 'Internal server error'
};

function authenticate (req, res) {
  var {username, password} = req.body;

  if (!username || !password) {
    return res.status(401).send(incorrectCredentials);
  }

  User.findOne({
    where: {username}
  }).then(querySuccess, queryFailed);

  function querySuccess(user) {
    if (!user) {
      return res.status(401).send(incorrectCredentials);
    }

    function verifyUser(err, match) {
      if (err) {
        return res.status(500).send(serverError);
      }
      if (!match) {
        return res.status(401).send(incorrectCredentials);
      }

      var token = jwt.sign(user, jwtSecret);
      res.send({success: true, token});
    }

    user.verifyPassword(password, verifyUser);
  }

  function queryFailed(err) {
    res.status(500).send(incorrectCredentials);
  }
}

function createGuest(done) {
  User.create({
    username: `Guest-${Date.now()}`,
    role: 'guest'
  }).then(function (user) {
    var token = jwt.sign(user, jwtSecret);
    done(null, {user, token});
  }).catch(done);
}

function getUserFromHeader(header) {
  if (!header) {
    return null;
  }

  var token = header.split(' ')[1];

  try {
    return {
      user: jwt.verify(token, jwtSecret)
    };
  } catch (e) {
    console.log(token)
    return null;
  }
}

export default {
  authenticate,
  createGuest,
  getUserFromHeader
};
