(function() {
    'use strict';

    angular.module('BlurAdmin.pages')
        .filter('searchFor', searchFor);

    /**ngInject */
    function searchFor() {
        return function(arr, searchString) {
            if (!searchString) {
                return arr;
            }
            var result = [];
            angular.forEach(arr, function(item) {
                if (item.BolCode.toLowerCase().indexOf(searchString.toLowerCase()) !== -1) {
                    result.push(item);
                }
            });
            return result;
        }
    }
})();