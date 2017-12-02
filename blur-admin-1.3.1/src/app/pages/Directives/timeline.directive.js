(function() {
    'use strict';
    angular.module('BlurAdmin.pages')
        .directive('statusTimeline', statusTimeline);

    /** @ngInject */
    function statusTimeline() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/components/timelines/status.html'
        };
    };
})();