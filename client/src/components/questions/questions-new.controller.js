'use strict';

export default class QuestionsNewController {
  constructor($http, $state) {
    this.question = '';
    this.choices = [{text: ''}, {text: ''}];

    this.addChoice = () => this.choices.push({text: ''});
    this.submit = function() {
      $http({
        url: '/api/questions',
        method: 'POST',
        data: {
          question: this.question,
          choices: this.choices.filter(choice => !!choice.text)
        }
      }).then(function (response) {
        $state.go('questions.list');
      });
    }
  }
}

QuestionsNewController.$inject = ['$http', '$state'];
