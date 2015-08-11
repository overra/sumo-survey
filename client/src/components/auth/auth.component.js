'use strict';

import 'angular-jwt';
import AuthService from './auth.service.js';

function componentConfig($httpProvider, jwtInterceptorProvider) {
  jwtInterceptorProvider.tokenGetter = [function () {
    return localStorage.getItem('jwt-token');
  }];

  $httpProvider.interceptors.push('jwtInterceptor');
}

componentConfig.$inject = ['$httpProvider', 'jwtInterceptorProvider'];

angular.module('SumoSurveys.auth', ['angular-jwt'])
  .config(componentConfig)
  .factory('AuthService', AuthService);
