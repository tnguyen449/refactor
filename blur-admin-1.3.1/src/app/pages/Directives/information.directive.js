(function() {
    'use strict';
    angular.module('BlurAdmin.pages')
        .directive('compDetail', compDetail);

    /** @ngInject */
    function compDetail() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/components/companyInfo/information.html'
        };
    };
})();