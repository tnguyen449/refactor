(function() {
    'use strict';

    angular.module('BlurAdmin.pages.configuration', [])
        .config(['$httpProvider', function($httpProvider) {
            // $httpProvider.defaults.useXDomain = true;
            // delete $httpProvider.defaults.headers.common['X-Requested-With'];
            $httpProvider.defaults.headers.common = {};
            $httpProvider.defaults.headers.post = {};
            $httpProvider.defaults.headers.put = {};
            $httpProvider.defaults.headers.patch = {};
        }])

})();