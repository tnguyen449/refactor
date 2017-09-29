(function($) {
    'use strict';

    angular.module('BlurAdmin.pages.logistics')
        .controller('bolReviewCtrl', bolReviewCtrl);

    bolReviewCtrl.$inject = ['$scope', '$rootScope', '$state', 'toastr', 'shareDataService', 'Url', 'backendController', '$uibModal', '$uibModalStack'];
    //bolReviewCtrl.$inject = ['$scope', '$rootScope', '$state', 'toastr', 'shareDataService', 'Url', '$uibModal', '$uibModalStack'];

    /** @ngInject */
    function bolReviewCtrl($scope, $rootScope, $state, toastr, shareDataService, Url, backendController, $uibModal, $uibModalStack) {
        //function bolReviewCtrl($scope, $rootScope, $state, toastr, shareDataService, Url, $uibModal, $uibModalStack) {
        var vm = this;
        var transaction = shareDataService.getList();
        vm.transactionVM = transaction;

        vm.cancel = function() {
            $uibModalStack.dismissAll();
        };

        //vm.link = "/Bol/Search?bolid=" + vm.transactionVM.TransactionVM.BillOfLandingInfo.BolCode;
        vm.link = "Test Qr";

        // $('#qrcode').qrcode(vm.transactionVM.TransactionVM.BillOfLandingInfo.BolCode);

        // vm.onSuccess = function(data) {
        //     console.log(vm.link + " Scan Successful");
        // };
        // vm.onError = function(error) {
        //     console.log(error);

        // };
        // vm.onVideoError = function(error) {
        //     console.log(error);
        // };


        // vm.printStamps = function(bolCode, quantity) {
        //     var count = 1;
        //     while (count <= quantity) {
        //         var stampCode = bolCode + "-" + count + "/" + quantity;
        //         vm.stampCode.push(stampCode);
        //         count++;
        //     }
        //     $uibModal.open({
        //         animation: true,
        //         templateUrl: '/app/pages/Templates/Logistics/Main_View_Refactor/stampRecipe.html',
        //         size: 'lg',
        //         controller: 'bolReviewCtrl',
        //         controllerAs: 'bolConfirm'
        //     })
        // };

        vm.printInvoice = function() {

            $.ajax({
                    method: "POST",
                    url: Url.hostDomain + backendController.addBol,
                    data: vm.transactionVM.TransactionVM
                })
                .done(function() {
                    vm.cancel();
                    //window.onload();
                    //window.print();
                    $state.go('view', {}, { reload: 'view' });
                    toastr.success('Đơn vận đã được tạo thành công!');
                    //})
                    // .fail(function() {
                    //     toastr.error('Đã xảy ra lỗi. Đơn vận không không thể khởi tạo', 'LỖI');
                    // })
                });
        };
    }
})(jQuery);