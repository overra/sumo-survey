'use strict';

export default class LoginController {
  constructor(AuthService, $scope, $state) {
    var self = this;
    this.error = false;
    this.isAuthenticated = AuthService.isAuthenticated;
    this.user = () => AuthService.user;
    this.submit = function (username, password)  {
      AuthService.login(username, password).then(
        () => {
          $state.go('questions.list');
        },
        err => {
          this.error = true;
          $scope.$apply();
        }
      );
    };
  }
}

LoginController.$inject = ['AuthService', '$scope', '$state'];
