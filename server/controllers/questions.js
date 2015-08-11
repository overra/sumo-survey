'use strict';

import {Question, Answer, sequelize} from '../models';
import {createGuest, getUserFromHeader} from './authentication';

const serverError = {
  succes: false,
  message: 'Internal server error'
};

function get(req, res) {
  Question
    .findAll()
    .then(getQuestionsSuccess)
    .catch(getError);

  function getQuestionsSuccess(questions) {
    var tasks = questions.map(question => question.getChoices())

    Promise.all(tasks).then(getChoicesSuccess).catch(getError);

    function getChoicesSuccess(choices) {
      var tasks = questions.map(question => question.getAnswers())

      choices.forEach(function (choiceSet, index) {
        var question = questions[index].toJSON();
        question.choices = choiceSet;
      });

      Promise.all(tasks).then(getAnswersSuccess).catch(getError);
    }

    function getAnswersSuccess(answers) {
      answers.forEach(function (answerSet, index) {
        var question = questions[index].toJSON();
        question.answers = answerSet;
      });

      res.send(questions);
    }
  }

  function getError(err) {
    console.error(err);
    res.status(500).send(serverError);
  }
}

function create(req, res) {
  var {question, choices} = req.body;
  var questionInstance = Question.create({question})
    .then(saveQuestionSuccess)
    .catch(saveError);

  function saveQuestionSuccess(q) {
    var tasks = choices.map(choice => q.createChoice({choice: choice.text}));
    Promise.all(tasks).then(saveChoicesSuccess).catch(saveError);
  }

  function saveChoicesSuccess(response) {
    res.send({success: true});
  }

  function saveError(err) {
    console.error(err);
    res.status(500).send(serverError);
  }
}

function random(req, res) {
  var guest = getUserFromHeader(req.headers.authorization);

  new Promise(getGuest)
    .then(getGuestSuccess)
    .catch(getGuestFailed);

  function getGuest(resolve, reject) {
    if (guest) {
      return resolve(guest);
    }

    createGuest(function (err, guest) {
      if (err) {
        return reject(err);
      }

      return resolve(guest);
    });
  }

  function getGuestSuccess(guest) {
    var {user, token} = guest;
    var query = `SELECT * FROM Questions Q WHERE Q.id NOT IN
                (SELECT QuestionId FROM Answers WHERE UserId = ${user.id})
                ORDER BY RAND() LIMIT 1`;

    sequelize.query(query, {model: Question}).spread(function (question) {
      if (question) {
        question.getChoices().then(function(choices) {
          res.json({question, choices, token});
        });
      } else {
        res.json({question: null});
      }
    });
  }

  function getGuestFailed(err) {
    console.error(err);
    res.status(500).send(serverError);
  }
}

function answer(req, res) {
  Answer.create({
    UserId: req.user.id,
    QuestionId: req.body.question,
    ChoiceId: req.body.choice
  }).then(saveSuccess).catch(saveError);

  function saveSuccess() {
    res.send({success: true});
  }

  function saveError(err) {
    console.error(err);
    res.status(500).send(serverError);
  }
}

export default {
  get,
  create,
  random,
  answer
};
