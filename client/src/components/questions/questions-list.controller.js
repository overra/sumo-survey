'use strict';

import {where} from 'lodash';

export default class DashboardController {
  constructor(QuestionsService) {
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
  }
}

DashboardController.$inject = ['QuestionsService'];
