(function() {
    'use strict';

    angular.module('BlurAdmin.pages.logistics')
        .factory('businessService', businessService);

    businessService.$inject = ['businessConst', 'formatDataService'];

    function businessService(businessConst, formatDataService) {

        return {
            calculateLiabilities: calculateLiabilities,
            calculateTotal: calculateTotal,
            calculateDeclareFee: calculateDeclareFee
        }

        function calculateTotal(subTotal, declareValue, deliveryPrice, discount, onHandFee, guaranteeFee) {
            var total = convertToNumber(subTotal) + convertToNumber(declareValue) + convertToNumber(deliveryPrice) + convertToNumber(onHandFee) + convertToNumber(guaranteeFee) - convertToNumber(discount);
            return formatCurrency(total);
        }

        function calculateLiabilities(finalTotal, prepaid) {
            var liabilities = convertToNumber(finalTotal) - convertToNumber(prepaid);
            return formatCurrency(liabilities);
        }

        function calculateDeclareFee(declareValue) {
            var declareFee = convertToNumber(declareValue) * businessConst.intDeclaredFee;
            return formatCurrency(declareFee);
        }

        function convertToNumber(numberString) {
            return formatDataService.convertToNumber(numberString);
        };

        function formatCurrency(currency) {
            return formatDataService.formatCurrency(currency);
        };
    }
})();