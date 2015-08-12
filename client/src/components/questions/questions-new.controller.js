'use strict';

export default class NewQuestionController {
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
        $state.go('dashboard.list');
      }, function (response) {
        console.log('fail', response);
      })
    }
  }
}

NewQuestionController.$inject = ['$http', '$state'];
