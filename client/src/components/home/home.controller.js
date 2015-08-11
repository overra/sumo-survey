'use strict';

export default class HomeController {
  constructor($http, $scope, QuestionsService) {
    var self = this;
    this.question = false;

    this.submit = function () {
      QuestionsService.answer({
        question: this.question.id,
        choice: this.choice.id
      }, () => {
        console.log(arguments);
        this.getQuestion();
      });
    };

    this.getQuestion = function () {
      QuestionsService.random(result => {
        if (result.token) {
         localStorage.setItem('jwt-token', result.token);
        }

        this.question = result.question;
        this.choices = result.choices;
      });
    };

    this.getQuestion();

    this.getQuestions = function () {
      $http({
        url: '/api/questions',
        method: 'GET'
      }).then(function (response) {
        // var {question, choices} = response.data;
        self.question.question = 'test';
        self.question.choices = ['test'];
      }, function () {
        console.log('failed', arguments)
      });
    };
  }
}

HomeController.$inject = ['$http', '$scope', 'QuestionsService'];
