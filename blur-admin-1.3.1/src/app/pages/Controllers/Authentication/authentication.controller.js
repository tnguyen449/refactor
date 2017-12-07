(function () {
    'use strict';
    
        angular.module('BlurAdmin.pages.login')
        .controller('LoginController', LoginController);
 
    LoginController.$inject = ['$location', 'AuthenticationService' , 'AUTH_EVENTS', 'USER_ROLES'];
    /** @ngInject */
    function LoginController($location, AuthenticationService, AUTH_EVENTS, USER_ROLES) {
        var vm = this;
        vm.currentUser = null;
        vm.userRoles = USER_ROLES;
        vm.isAuthorized = AuthenticationService.isAuthorized;
       
        vm.setCurrentUser = (user) => {
            vm.currentUser = user;
        };
        vm.login = function (credentials) {
            AuthenticationService.login(credentials).then(function (user) {
              $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
              vm.setCurrentUser(user);
            }, function () {
              $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });
          };
    }
 
})();