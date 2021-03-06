'use strict';

import angular from 'angular';
import 'angular-messages';
import 'angular-material';
import 'angular-ui-router';
import './components/auth/auth.component';
import './components/home/home.component';
import './components/login/login.component';
import './components/questions/questions.component';

function appConfig($locationProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
}

appConfig.$inject = [
  '$locationProvider',
  '$urlRouterProvider'
];

function AppController(AuthService, $state) {
  this.isAuthenticated = AuthService.isAuthenticated;
  this.logout = AuthService.logout;
  this.go = $state.go;
}

AppController.$inject = ['AuthService', '$state'];

angular.module('SumoSurveys', [
  'ngMessages',
  'ngMaterial',
  'SumoSurveys.auth',
  'SumoSurveys.home',
  'SumoSurveys.login',
  'SumoSurveys.questions'
]).config(appConfig)
  .controller('AppController', AppController);

angular.bootstrap(document, ['SumoSurveys']);
