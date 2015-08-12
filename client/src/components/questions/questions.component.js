'use strict';

import 'angular-resource';
import QuestionsService from './questions.service';
import QuestionsListController from './questions-list.controller';
import QuestionsNewController from './questions-new.controller';
import QuestionDetailsController from './question-details.controller';

function componentInitialization($rootScope, AuthService, $state) {
  function onStateChangeStart(event, toState, toParams, fromState, fromParams) {
    var isQuestionsState = toState.name.split('.')[0] === 'questions';
    if (!AuthService.user && isQuestionsState) {
      event.preventDefault();
      if (fromState.name === '') {
        $state.go('home');
      }
    }
  }

  $rootScope.$on('$stateChangeStart', onStateChangeStart);
}

componentInitialization.$inject = ['$rootScope', 'AuthService', '$state'];

function componentConfig($stateProvider) {
  $stateProvider
    .state('questions', {
      templateUrl: './components/questions/questions.view.html',
      abstract: true
    })
    .state('questions.list', {
      url: '/questions',
      controller: 'QuestionsListController',
      controllerAs: 'questions',
      templateUrl: './components/questions/questions-list.view.html'
    })
    .state('questions.new', {
      url: '/questions/new',
      controller: 'QuestionsNewController',
      controllerAs: 'question',
      templateUrl: './components/questions/questions-new.view.html'
    });
}

componentConfig.$inject = ['$stateProvider'];

angular.module('SumoSurveys.questions', [
  'ngResource',
  'ui.router',
  'SumoSurveys.auth',
]).run(componentInitialization)
  .config(componentConfig)
  .controller('QuestionsListController', QuestionsListController)
  .controller('QuestionsNewController', QuestionsNewController)
  .controller('QuestionDetailsController', QuestionDetailsController)
  .factory('QuestionsService', QuestionsService);
