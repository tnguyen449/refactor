(function() {
    'use strict';

    angular.module('BlurAdmin.pages.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$rootScope', '$state', '$location', '$window', '$uibModalStack', 'AuthenticationService', 'AUTH_EVENTS', 'USER_ROLES', 'Session'];
    /** @ngInject */
    function LoginController($scope, $rootScope, $state, $location, $window, $uibModalStack, AuthenticationService, AUTH_EVENTS, USER_ROLES, Session) {
        var vm = this;
        vm.currentUser = null;
        vm.loginFailed = false;
        vm.blankFields = false;
        vm.userRoles = USER_ROLES;
        vm.isAuthorized = AuthenticationService.isAuthorized;
        vm.login = function() {
            if (typeof(vm.username) == 'undefined' || typeof(vm.password) == 'undefined' || vm.password === "" || vm.username === "") {
                vm.blankFields = true;
                vm.loginFailed = false;
            } else {
                vm.credential = { credential: {} };
                vm.credential.UserName = vm.username;
                vm.credential.Password = vm.password;
                AuthenticationService.Login(vm.credential).then(function(user) {
                    vm.blankFields = false;
                    vm.loginFailed = false;
                    $rootScope.isLoggedIn = true;
                    $rootScope.isNotLoggedIn = false;
                    $window.sessionStorage.setItem(USER_ROLES.guid, vm.credential.UserName);
                    $uibModalStack.dismissAll();
                    $location.path('/trang-chu');
                    $state.reload();
                }, function() {
                    vm.blankFields = false;
                    vm.loginFailed = true;
                });
            }
        };
    }

})();