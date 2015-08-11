'use strict';

import '../auth/auth.component';
import LoginController from './login.controller';

function componentConfig($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      controller: 'LoginController',
      controllerAs: 'login',
      templateUrl: './components/login/login.view.html'
    });
}

componentConfig.$inject = ['$stateProvider'];

angular.module('SumoSurveys.login', ['ui.router', 'SumoSurveys.auth'])
  .config(componentConfig)
  .controller('LoginController', LoginController);
