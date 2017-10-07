(function() {
    'use strict';
    angular.module('BlurAdmin.pages')
        .directive('statusTimeline', statusTimeline);

    function statusTimeline() {
        return {
            restrict: 'E',
            templateUrl: '/app/pages/components/timelines/status.html'
        };
    };
})();