(function() {
    'use strict';
    angular.module('BlurAdmin.pages')
        .directive('compInfo', compInfo);

    function compInfo() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/components/companyInfo/info.html'
        };
    };
})();