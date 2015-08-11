'use strict';

import {Router} from 'express';
import jwt from 'express-jwt';
import jsonwebtoken from 'jsonwebtoken';
import {User, Question, Answer, Choice, sequelize, Sequelize} from '../models';

var router = Router();

router.use(jwt({
  secret: 'secret token'
}).unless({
  path: [
    '/api/answer',
    '/api/questions/random'
  ]
}));

router.get('/questions/random', function (req, res) {
  var {authorization} = req.headers;

  if (authorization) {
    var payload = jsonwebtoken.verify(authorization.split(' ')[1], 'secret token')
    console.log(payload);
    res.send({success: true})
  } else {
    // create guest user
    res.send({success: false})
  }
});

router.post('/answer', function (req, res) {
  console.log(req.body, req.user);
  res.json({success: true});
});

router.post('/questions', function (req, res) {
  var {question, choices} = req.body;
  var questionInstance = Question.create({question}).then(function(q) {
    Promise.all([
      choices.map(choice => q.createChoice({choice: choice.text}))
    ]).then(function(response) {
      res.send({success: true});
    }).catch(function() {
      console.log(arguments)
      res.status(400).send({success: false});
    });
  })
  // questionInstance.createChoice({choice: 'testing'});
  // questionInstance.save(function() {
  //   console.log('success')
  // })
});

router.get('/questions', function (req, res) {
  Question.findAll({limit: 5}).then(function (results) {
    Promise.all(results.map(question => question.getChoices())).then((c) => {
      results.map(function (result, i) {
        result.dataValues.choices = c[i][0].dataValues;
        return result.dataValues;
      });

      console.log(results[0])
      res.json(results);
    });
  });
});

router.get('/question', function (req, res) {
  new Promise(function (resolve, reject) {
    if (!req.user) {
      User.create({
        username: 'test' + Date.now(),
        role: 'guest'
      }).then(function(user) {
        var token = jsonwebtoken.sign(user, 'secret token');
        resolve({token, user});
      }).catch(reject);
    } else {
      resolve({user: req.user});
    }
  }).then(function (user) {
    sequelize.query('SELECT * FROM Questions Q WHERE Q.id NOT IN (SELECT QuestionId FROM Answers WHERE UserId = ' + user.user.id + ') ORDER BY RAND() LIMIT 1', {model: Question}).spread(function (question) {
      if (question) {
        question.getChoices().then(function(choices) {
          res.json({
            question: question,
            choices: choices,
            token: user.token
          });
        });
      } else {
        res.json({
          question: false
        });
      }
    });
  });
});

export default router;
