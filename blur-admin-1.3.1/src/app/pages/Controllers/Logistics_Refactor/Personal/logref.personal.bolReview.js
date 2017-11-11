(function($) {
    'use strict';

    angular.module('BlurAdmin.pages.logistics')
        .controller('bolReviewCtrl', bolReviewCtrl);

    bolReviewCtrl.$inject = ['$scope', '$rootScope', '$state', 'toastr', 'shareDataService', 'Url', 'backendController', '$uibModal', '$uibModalStack'];

    /** @ngInject */
    function bolReviewCtrl($scope, $rootScope, $state, toastr, shareDataService, Url, backendController, $uibModal, $uibModalStack) {
        var vm = this;
        var transaction = shareDataService.getList();
        vm.transactionVM = transaction;
        vm.link = vm.transactionVM.TransactionVM.BillOfLandingInfo.BolCode;
        vm.cancel = function() {
            $uibModalStack.dismissAll();
        };
        vm.printInvoice = function() {

            $.ajax({
                    method: "POST",
                    url: Url.hostDomain + backendController.addBol,
                    data: vm.transactionVM.TransactionVM
                })
                .done(function() {
                    vm.cancel();
                    // window.print();
                    $state.go('view', {}, { reload: 'view' });
                    toastr.success('Đơn vận đã được tạo thành công!');
                })
                .fail(function() {
                    toastr.error('Đã xảy ra lỗi. Đơn vận không không thể khởi tạo', 'LỖI');
                })

        };
    }
})(jQuery);