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
                if (item.BolCode.toLowerCase().indexOf(searchString.toLowerCase()) !== -1 ||
                    item.Customers[0].Phone.indexOf(searchString.toLowerCase()) !== -1 ||
                    item.Customers[1].Phone.indexOf(searchString.toLowerCase()) !== -1 ||
                    item.Customers[0].Name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1 ||
                    item.Customers[1].Name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1) {
                    result.push(item);
                }

            });
            return result;
        }
    }
})();