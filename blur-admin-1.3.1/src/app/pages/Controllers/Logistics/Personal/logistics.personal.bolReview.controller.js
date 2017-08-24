(function($) {
    'use strict';

    angular.module('BlurAdmin.pages.logistics')
        .controller('bolReviewCtrl', bolReviewCtrl);

    bolReviewCtrl.$inject = ['$scope', '$rootScope', '$state', 'toastr', 'shareDataService', '$uibModalStack'];

    function bolReviewCtrl($scope, $rootScope, $state, toastr, shareDataService, $uibModalStack) {
        var vm = this;
        var transaction = shareDataService.getList();
        vm.transactionVM = transaction[0];
        vm.cancel = function() {
            $uibModalStack.dismissAll();
        };

        // $('#qrcode').qrcode(vm.transactionVM.TransactionVM.BillOfLandingInfo.BolCode);
        vm.printInvoice = function() {
            // $.ajax({
            //         method: "POST",
            //         url: "http://localhost:57363/NgocTrang/Api/Bol/Add",
            //         data: vm.transactionVM.TransactionVM
            //     })
            //     .done(function() {
            //shareDataService.addItem(vm.transactionVM);
            vm.cancel();
            //window.onload();
            //window.print();
            $state.go('view', {}, { reload: 'view' });
            toastr.success('Đơn vận đã được tạo thành công!');
            //})
            // .fail(function() {
            //     toastr.error('Đã xảy ra lỗi. Đơn vận không không thể khởi tạo', 'LỖI');
            // })
        };
    }
})(jQuery);