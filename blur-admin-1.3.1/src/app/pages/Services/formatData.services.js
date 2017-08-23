(function() {
    'use strict';

    angular.module('BlurAdmin.pages.logistics')
        .factory('formatDataService', formatDataService);

    function formatDataService() {

        return {
            convertToNumber: convertToNumber,
            formatCurrency: formatCurrency
        }

        /** function convertToNumber
         *  @Description: using to convert currency String to number
         *  @Param: string numberString
         *  @Return: number (Ex: 10000)
         */
        function convertToNumber(numberString) {
            if (numberString == "" || numberString == null) {
                return 0;
            } else {
                return parseInt(numberString.replace(/,/g, ""));
            }
        };

        /** function formatCurrency
         *  @Description: using to convert number to currency String 
         *  @Param: number currency
         *  @Return: string (Ex:10,000)
         */
        function formatCurrency(currency) {
            return currency.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        }
    }
})();