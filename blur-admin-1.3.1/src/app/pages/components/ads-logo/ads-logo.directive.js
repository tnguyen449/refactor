(function() {
    'use strict';

    angular.module('BlurAdmin.pages')
        .directive('adsLogo', adsLogo);

    function adsLogo() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/components/ads-logo/ads-logo.html'
        }
    }
})();