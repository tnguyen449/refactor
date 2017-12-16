(function() {
    'use strict';

    angular.module('BlurAdmin.pages', [
        'ui.router',
        'ui.bootstrap',
        'ngMaterial',
        'BlurAdmin.pages.configuration',
        'BlurAdmin.pages.logistics',
        'BlurAdmin.pages.branch',
        'BlurAdmin.pages.location',
        'BlurAdmin.pages.merchandise',
        'BlurAdmin.pages.statistics',
        'BlurAdmin.pages.employee',
        'BlurAdmin.pages.login'
    ]);
})();