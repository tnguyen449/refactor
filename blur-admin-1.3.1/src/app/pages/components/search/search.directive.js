(function() {
    'use strict';

    angular.module('BlurAdmin.pages')
        .directive('searchBol', searchBol);

    function searchBol() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/components/search/search.component.html',
            controller: 'SearchBolController',
            controllerAs: 'search'
        }
    }
})();