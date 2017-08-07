(function($) {
    'use strict';

    angular.module('BlurAdmin.pages.logistics')
        .controller('bolReviewCtrl', bolReviewCtrl);

    bolReviewCtrl.$inject = ['$scope', '$rootScope'];

    function bolReviewCtrl($scope, $rootScope) {
        var vm = this;
        vm.transactionVM = $rootScope.transactionVM;
        $scope.$on('initData', function(evt, obj) {
            vm.deliveryType = obj.data.deliveryTypeVM;
            vm.merchandiseType = obj.data.merchandiseTypeVM;
            // console.log(vm.merchandiseType);
            // console.log(vm.transactionVM);
        });
        vm.post = function(divName) {
            vm.print = printInvoice(divName);
        };

        function printInvoice(divName) {
            var printContent = $('#print-area').html();
            var printWindow = window.open('', '', 'height=400px; width=800px');
            printWindow.document.write('<html><head><title>Invoice</title><link rel="stylesheet" href="app/main.css" media="print"><link rel="stylesheet" type="text/css" href="../bower_components/bootstrap/dist/css/bootstrap.css"> ');
            printWindow.document.write('</head><body');
            printWindow.document.write(printContent);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.print();
            // var printContent = document.getElementById(divName).innerHTML;
            // var originalContent = document.body.innerHTML;
            // document.body.innerHTML = printContent;
            // document.body.innerHTML = originalContent;
        };
    }
})(jQuery);