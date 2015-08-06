'use strict';

import HomeController from './home.controller';

function componentConfig($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      controller: 'HomeController',
      controllerAs: 'home',
      templateUrl: './components/home/home.view.html'
    });
}

componentConfig.$inject = ['$stateProvider'];

angular.module('SumoSurveys.home', ['ui.router'])
  .config(componentConfig)
  .controller('HomeController', HomeController);
