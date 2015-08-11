'use strict';

import 'angular-resource';
import QuestionsService from './questions.service';

function componentConfig() {
}

componentConfig.$inject = [];

angular.module('SumoSurveys.questions', ['ngResource'])
  .config(componentConfig)
  .factory('QuestionsService', QuestionsService);
