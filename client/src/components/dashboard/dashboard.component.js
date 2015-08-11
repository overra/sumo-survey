'use strict';

import DashboardController from './dashboard.controller';
import NewQuestionController from './new-question.controller';

function componentInitialization($rootScope, AuthService, $state) {
  function onStateChangeStart(event, toState, toParams, fromState, fromParams) {
    var isDashboardState = toState.name.split('.')[0] === 'dashboard';
    if (!AuthService.user && isDashboardState) {
      console.log('nope')
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
    .state('dashboard', {
      templateUrl: './components/dashboard/dashboard.view.html',
      abstract: true
    })
    .state('dashboard.list', {
      url: '/dashboard',
      controller: 'DashboardController',
      controllerAs: 'dashboard',
      templateUrl: './components/dashboard/list-questions.view.html'
    })
    .state('dashboard.new', {
      url: '/questions/new',
      controller: 'NewQuestionController',
      controllerAs: 'question',
      templateUrl: './components/dashboard/new-question.view.html'
    });
}

componentConfig.$inject = ['$stateProvider'];

angular.module('SumoSurveys.dashboard', [
  'ui.router',
  'SumoSurveys.auth',
  'SumoSurveys.questions'
])
  .run(componentInitialization)
  .config(componentConfig)
  .controller('DashboardController', DashboardController)
  .controller('NewQuestionController', NewQuestionController);
