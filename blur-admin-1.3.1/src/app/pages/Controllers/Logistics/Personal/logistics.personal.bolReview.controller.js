(function($) {
    'use strict';

    angular.module('BlurAdmin.pages.logistics')
        .controller('bolReviewCtrl', bolReviewCtrl);

    bolReviewCtrl.$inject = ['$scope', '$rootScope', '$uibModal'];

    function bolReviewCtrl($scope, $rootScope, $uibModal) {
        var vm = this;
        vm.transactionVM = $rootScope.transactionVM;
        // $rootScope.$on('bolCodeValue', function(evt, obj) {
        //     vm.deliveryType = obj.data.deliveryTypeVM;
        //     vm.merchandiseType = obj.data.merchandiseTypeVM;
        //     // console.log(vm.merchandiseType);
        //     // console.log(vm.transactionVM);
        // });

        vm.post = function() {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/components/notifications/confirm.component.html',
                size: 'lg',
                controller: 'bolReviewCtrl',
                controllerAs: 'bolConfirm'
            });
        }

        vm.printInvoice = function() {
            // var divContents = $(".wrapper").html();
            // var printWindow = window.open('', '', 'height=400,width=800');
            // printWindow.document.write('<html><head> <link rel="stylesheet" href="../../bower_components/bootstrap/dist/css/bootstrap.min.css">');
            // printWindow.document.write('</head><body style="display: inline-block">');
            // printWindow.document.write(divContents);
            // printWindow.document.write('</body></html>');
            // printWindow.document.close();
            // printWindow.print();
            window.print();
        };
    }
})(jQuery);