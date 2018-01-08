(function() {
    'use strict';

    angular.module('BlurAdmin.pages')
        .directive('employeeNav', employeeNav);

    function employeeNav($timeout, baSidebarService) {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/components/navigationBar/employee/employee-nav.html'
        }
    }
})();