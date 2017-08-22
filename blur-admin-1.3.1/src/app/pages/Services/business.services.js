(function() {
    'use strict';

    angular.module('BlurAdmin.pages.logistics')
        .factory('businessService', businessService);

    function businessService() {

        return {
            calculateLiabilities: calculateLiabilities,
            calculateTotal: calculateTotal,
            calculateDeclareFee: calculateDeclareFee,
            convertToNumber: convertToNumber
        }

        function calculateTotal(subTotal, declareValue, discount, additionalFee, deliveryPrice, isGurantee) {
            var total = convertToNumber(subTotal) + (convertToNumber(declareValue) * 0.01) + convertToNumber(deliveryPrice) + convertToNumber(additionalFee) - convertToNumber(discount);
            if (isGurantee) {
                total += 100000;
            }
            return total;
        }

        function calculateLiabilities(total, prepaid) {
            var liabilities = 0;
            var intTotal = convertToNumber(total);
            var intPrepaid = convertToNumber(prepaid);
            return liabilities = intTotal - intPrepaid;
        }

        function calculateDeclareFee(declareValue) {
            var declareFee = 0;
            return declareFee = convertToNumber(declareValue) * 0.01;
        }

        function convertToNumber(numberString) {
            if (numberString == "" || numberString == null) {
                return 0;
            } else {
                return parseInt(numberString.replace(/,/g, ""));
            }
        };
    }
})();