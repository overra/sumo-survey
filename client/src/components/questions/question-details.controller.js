'use strict';

import {where} from 'lodash';

export default class QuestionDetailsController {
  constructor($mdDialog, question) {
    this.question = question;

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

QuestionDetailsController.$inject = ['$mdDialog', 'question'];
