(function() {
    'use strict';

    angular.module('BlurAdmin.pages')
        .directive('customerNav', customerNav);

    function customerNav($timeout, baSidebarService) {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/components/navigationBar/customer/customer-nav.html'
        }
    }
})();