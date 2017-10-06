(function() {
    'use strict';

    angular.module('BlurAdmin.pages.logistics')
        .controller('PersonalMainController', PersonalMainController);

    PersonalMainController.$inject = ['$scope', '$rootScope', '$state', '$http', 'shareDataService', 'utility', '$uibModal', '$uibModalStack', 'toastr', 'Url', 'backendController']

    /** @ngInject */
    function PersonalMainController($scope, $rootScope, $state, $http, shareDataService, utility, $uibModal, $uibModalStack, toastr, Url, backendController) {
        var vm = this;
        vm.branchInfoVM = [];
        vm.merchandiseTypeVM = [];
        vm.serverTimeStampVM = "";
        vm.deliveryTypeVM = [];
        vm.customerInfoVM = [];
        vm.bolDetails = {};
        vm.itemsByPage = 2;
        vm.getTransactionComponent = function() {
            if (vm.branchInfoVM.length == 0 && vm.merchandiseTypeVM.length == 0 && vm.deliveryTypeVM.length == 0) {

                utility.getData(backendController.getComponents).then(
                    function(response) {

                        vm.branchInfoVM = response.Branch;
                        vm.merchandiseTypeVM = response.Type;
                        //vm.serverTimeStampVM = response.CurrentTimeStamp;
                        vm.deliveryTypeVM = response.DeliveryType;
                        vm.initData = {
                            data: {
                                branchInfoVM: vm.branchInfoVM,
                                merchandiseTypeVM: vm.merchandiseTypeVM,
                                deliveryTypeVM: vm.deliveryTypeVM,
                                //serverTimeStamp: vm.serverTimeStampVM
                            }
                        }
                        shareDataService.addInitData(vm.initData);
                    },
                    function(response) {
                        vm.branchInfoVM = [{
                            'Name': 'Lỗi từ máy chủ',
                            'Description': 'Không thể tải danh sách chi nhánh'
                        }];
                        vm.merchandiseTypeVM = [{
                            'Name': 'Lỗi từ máy chủ',
                            'Description': 'Không thể tải danh sách loại hàng'
                        }];
                        vm.deliveryTypeVM = "Lỗi từ máy chủ";
                    }
                )
            }
        };

        vm.getAllBol = function() {
            utility.getData(backendController.getAllBol).then(
                function(response) {
                    vm.bolDetails = response.reverse();
                }
            )
        };

        vm.updateStatus = function(bolCode, sttCode, id) {
            if (sttCode == 5) {

            } else {
                utility.postData(backendController.updateStatus + id).then(function() {
                    $state.reload();
                    toastr.success("Vận đơn " + bolCode + " cập nhật trạng thái thành công!")
                })
            }

        };

        $scope.stampCode = [];
        vm.printStamps = function(bolCode, quantity) {
            $scope.stampCode = [];
            var count = 1;
            while (count <= quantity) {
                var stampCode = bolCode + "-" + count + "/" + quantity;
                $scope.stampCode.push(stampCode);
                count++;
            }

            $uibModal.open({
                animation: true,
                templateUrl: '/app/pages/Templates/Logistics/Main_View_Refactor/stampRecipe.html',
                size: 'lg',
                controller: 'PersonalMainController',
                controllerAs: 'stampViewCtrl',
                bindToController: true,
                scope: $scope
            });
        };
        vm.print = function() {
            window.print();
            vm.cancel();
        };
        vm.cancel = function() {
            $uibModalStack.dismissAll();
        };
    }
})();