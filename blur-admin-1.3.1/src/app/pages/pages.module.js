(function() {
    'use strict';

    angular.module('BlurAdmin.pages', [
        'ui.router',
        'ui.bootstrap',
        'BlurAdmin.pages.logistics',
        'BlurAdmin.pages.branch',
        'BlurAdmin.pages.location'
    ]);
})();