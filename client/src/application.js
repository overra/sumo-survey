'use strict';

import angular from 'angular';
import 'angular-material';
import 'angular-ui-router';
import './components/home/home.component';
import './components/login/login.component';

function appConfig($locationProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
}

appConfig.$inject = [
  '$locationProvider',
  '$urlRouterProvider'
];

angular.module('SumoSurveys', [
  'ngMaterial',
  'SumoSurveys.home',
  'SumoSurveys.login'
]).config(appConfig);

angular.bootstrap(document, ['SumoSurveys']);
