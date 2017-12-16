(function() {
    'use strict';
    angular.module('BlurAdmin.theme.components')
        .controller('pageTopController', pageTopController);

    function pageTopController($rootScope, $window, $scope, $state, Session, $uibModal) {
        var vm = this;
        vm.click = () => {
            // $state.go('login');
            $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/Templates/Login/login.view.html',
                controller: 'LoginController',
                controllerAs: 'login',
                size: 'sm'
            })
        };
        vm.logOff = () => {
            Session.destroy();
            $state.go('main');
            $rootScope.$on('$stateChangeSuccess', function(event, next) {
                $rootScope.isLoggedIn = false;
                $rootScope.isNotLoggedIn = true;
                $('#listMenu li:gt(0)').hide();
            });

        }
    };
})();