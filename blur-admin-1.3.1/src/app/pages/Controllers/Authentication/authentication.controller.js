(function() {
    'use strict';

    angular.module('BlurAdmin.pages.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$rootScope', '$state', '$location', 'AuthenticationService', 'AUTH_EVENTS', 'USER_ROLES', 'Session'];
    /** @ngInject */
    function LoginController($scope, $rootScope, $state, $location, AuthenticationService, AUTH_EVENTS, USER_ROLES, Session) {
        var vm = this;
        vm.currentUser = null;


        vm.userRoles = USER_ROLES;
        vm.isAuthorized = AuthenticationService.isAuthorized;
        vm.setCurrentUser = (user) => {
            vm.currentUser = user;
        };
        vm.login = function() {
            vm.credential = { credential: {} };
            vm.credential.UserName = vm.username;
            vm.credential.Password = vm.password;
            AuthenticationService.Login(vm.credential).then(function(user) {
                //$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                vm.setCurrentUser(user);
                $rootScope.userName = vm.credential.UserName;
                $state.go('view');
            }, function() {
                //$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });
        };
    }

})();