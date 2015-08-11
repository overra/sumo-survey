'use strict';

export default function AuthService($http, jwtHelper) {
  var token = localStorage.getItem('jwt-token');
  var user = (token) ? jwtHelper.decodeToken(token) : null;

  function login(username, password) {
    return new Promise(function (resolve, reject) {
      $http({
        url: '/api/authenticate',
        method: 'POST',
        skipAuthorization: true,
        data: {username, password}
      }).then(function (response) {
        var {token} = response.data;
        localStorage.setItem('jwt-token', token);
        user = jwtHelper.decodeToken(token);
        resolve();
      }, function (response) {
        reject(response.data.error.message);
      });
    });
  }

  function logout() {
    localStorage.setItem('jwt-token', '');
    location = '/';
  }

  function isAuthenticated() {
    return user && user.role === 'admin';
  }

  return {
    login,
    logout,
    isAuthenticated,
    get user() { return user; }
  };
}

AuthService.$inject = ['$http', 'jwtHelper'];
