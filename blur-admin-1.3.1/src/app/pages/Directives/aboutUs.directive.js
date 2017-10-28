(function() {
    'use strict';
    angular.module('BlurAdmin.pages')
        .directive('aboutUs', aboutUs);

    function aboutUs() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/components/companyInfo/aboutUs.html'
        };
    };
})();