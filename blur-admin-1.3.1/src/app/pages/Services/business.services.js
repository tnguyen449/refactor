(function() {
    'use strict';

    angular.module('BlurAdmin.pages.logistics')
        .factory('businessService', businessService);

    function businessService() {
        var liabilities = 0;

        return {
            calculateLiabilities: calculateLiabilities
        }

        function calculateLiabilities(total, prepaid) {
            var intTotal = converToNumber(total);
            var intPrepaid = converToNumber(prepaid);
            return liabilities = intTotal - intPrepaid;
        }

        function convertToNumber(numberString) {
            numberString.toString();
            if (numberString == "" || numberString == null) {
                return 0;
            } else {
                return parseInt(numberString.replace(/,/g, ""));
            }
        };
    }
})();