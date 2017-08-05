(function() {
    'use strict';

    angular.module('BlurAdmin.pages', [
            'ui.router',
            'BlurAdmin.pages.logistics'
        ])
        .constant('API_URL', '')
        .constant('IMAGE_ROOT', '')
        .config(config)

    function config($httpProvider) {
        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};
    };
})();