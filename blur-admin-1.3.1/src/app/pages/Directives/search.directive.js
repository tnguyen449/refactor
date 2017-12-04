(function() {
    'use strict';
    angular.module('BlurAdmin.pages')
        .directive('searchBol', searchBol);

    /** @ngInject */
    function searchBol() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/components/search/search.component.html'
        };
    };
})();