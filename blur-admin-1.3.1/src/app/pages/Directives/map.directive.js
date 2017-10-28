(function() {
    'use strict';
    angular.module('BlurAdmin.pages')
        .directive('mapContent', mapContent);

    function mapContent() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/components/companyInfo/map-content.html'
        };
    };
})();