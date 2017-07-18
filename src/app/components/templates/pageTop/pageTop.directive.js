(function() {
    'use strict';

    angular.module('ntlApp.components.templates')
        .directive('pageTop', pageTop);

    /** @ngInject */
    function pageTop() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/templates/pageTop/pageTop.html'
        };
    }
})();