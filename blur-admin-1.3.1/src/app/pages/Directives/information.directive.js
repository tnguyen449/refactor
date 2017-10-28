(function() {
    'use strict';
    angular.module('BlurAdmin.pages')
        .directive('compDetail', compDetail);

    function compDetail() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/components/companyInfo/information.html'
        };
    };
})();