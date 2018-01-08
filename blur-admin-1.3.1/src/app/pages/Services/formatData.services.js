(function() {
    'use strict';

    angular.module('BlurAdmin.pages.logistics')
        .factory('formatDataService', formatDataService);

    /** @ngInject */
    function formatDataService() {

        return {
            convertToNumber: convertToNumber,
            formatCurrency: formatCurrency,
            convertDate: convertDate
        }

        function convertToNumber(numberString) {
            if (numberString == "" || numberString == null) {
                return 0;
            } else {
                return parseInt(numberString.replace(/,/g, ""));
            }
        };


        function formatCurrency(currency) {
            return currency.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        }

        function convertDate(stringDate) {
            var newDate = stringDate.split(/\D/);
            return newDate.reverse().join('/');
        }
    }
})();