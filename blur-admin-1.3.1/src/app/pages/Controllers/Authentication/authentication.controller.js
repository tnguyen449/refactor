(function () {
    'use strict';
    
        angular.module('BlurAdmin.pages.login')
        .controller('LoginController', LoginController);
 
    LoginController.$inject = ['$location', 'AuthenticationService' , 'AUTH_EVENTS'];
    /** @ngInject */
    function LoginController($location, AuthenticationService, AUTH_EVENTS) {
        var vm = this;
 
        vm.login = function (credentials) {
            AuthService.login(credentials).then(function (user) {
              $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
              $scope.setCurrentUser(user);
            }, function () {
              $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });
          };
    }
 
})();