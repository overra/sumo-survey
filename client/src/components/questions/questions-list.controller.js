'use strict';

import {where} from 'lodash';

export default class QuestionsListController {
  constructor(QuestionsService, $mdDialog) {
    var self = this;
    QuestionsService.list(questions => {
      this.questions = questions
    });

    this.getTotalAnswers = function (question) {
      return question.answers.length;
    };

    this.getTotalOfChoice = function (question, choice) {
      return where(question.answers, {ChoiceId: choice.id}).length;
    };

    this.getPercentage = function (question, choice) {
      var choiceCount = this.getTotalOfChoice(question, choice);
      var answerCount = this.getTotalAnswers(question);

      if (!choiceCount && !answerCount) {
        return 0;
      }

      return Math.round(choiceCount / answerCount * 10000) / 100;
    };

    this.showDialog = function(ev, question) {
      $mdDialog.show({
        controller: 'QuestionDetailsController',
        controllerAs: 'question',
        templateUrl: '/components/questions/question-details.view.html',
        locals: {
          question: question
        },
        clickOutsideToClose: true,
        targetEvent: ev,
        parent: angular.element(document.body)
      });
    };
  }
}

QuestionsListController.$inject = ['QuestionsService', '$mdDialog'];
