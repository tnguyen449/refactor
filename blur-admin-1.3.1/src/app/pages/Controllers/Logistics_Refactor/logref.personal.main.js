(function() {
    'use strict';

    angular.module('BlurAdmin.pages.logistics')
        .controller('PersonalMainController', PersonalMainController);

    PersonalMainController.$inject = ['$scope', '$rootScope', '$state', '$http', 'shareDataService', '$uibModal', 'Url']

    /** @ngInject */
    function PersonalMainController($scope, $rootScope, $state, $http, shareDataService, $uibModal, Url) {
        var vm = this;
        vm.branchInfoVM = [];
        vm.merchandiseTypeVM = [];
        vm.serverTimeStampVM = "";
        vm.deliveryTypeVM = [];
        vm.customerInfoVM = [];
        vm.bolDetails = {};
        vm.getTransactionComponent = function() {
            if (vm.branchInfoVM.length == 0 && vm.merchandiseTypeVM.length == 0 && vm.deliveryTypeVM.length == 0) {
                $http.get(Url.hostDomain + '/Bol/GetComponent').then(
                    function(response) {
                        if (response.data.Branch.length > 0 && response.data.Type.length > 0) {
                            vm.branchInfoVM = response.data.Branch;
                            vm.merchandiseTypeVM = response.data.Type;
                            vm.serverTimeStampVM = response.data.CurrentTimeStamp;
                            vm.deliveryTypeVM = response.data.DeliveryType;
                            vm.initData = {
                                data: {
                                    branchInfoVM: vm.branchInfoVM,
                                    merchandiseTypeVM: vm.merchandiseTypeVM,
                                    deliveryTypeVM: vm.deliveryTypeVM,
                                    serverTimeStamp: vm.serverTimeStampVM
                                }
                            }
                            shareDataService.getInitData(vm.initData);
                        }
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
            $http.get(Url.hostDomain + '/Bol/GetAllBol').then(
                function(response) {
                    shareDataService.addItem(response.data);
                    vm.bolDetails = shareDataService.getList();
                    console.log(vm.bolDetails);
                }
            )
        };
        vm.stampCode = [];
        vm.printStamps = function(bolCode, quantity) {
            var count = 1;
            while (count <= quantity) {
                var stampCode = bolCode + "-" + count + "/" + quantity;
                vm.stampCode.push({ stampCode: stampCode });
                count++;
            }
            $uibModal.open({
                animation: true,
                templateUrl: '/app/pages/Templates/Logistics/Main_View_Refactor/stampRecipe.html',
                size: 'lg',
                controller: 'bolReviewCtrl',
                controllerAs: 'stampViewCtrl',
                resolve: {
                    stampCode: function() {
                        return vm.stampCode;
                    }
                }
            });
            vm.stampCode = [];
        };

    }
})();