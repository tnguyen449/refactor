(function() {
    'use strict';

    angular.module('BlurAdmin.pages.logistics')
        .controller('PersonalMainController', PersonalMainController);

    PersonalMainController.$inject = ['$scope', '$rootScope', '$state', '$http', 'shareDataService']

    function PersonalMainController($scope, $rootScope, $state, $http, shareDataService) {
        var vm = this;
        vm.branchInfoVM = [];
        vm.merchandiseTypeVM = [];
        vm.serverTimeStampVM = "";
        vm.deliveryTypeVM = [];
        vm.customerInfoVM = [];
        vm.getTransactionComponent = function() {
            if (vm.branchInfoVM.length == 0 && vm.merchandiseTypeVM.length == 0 && vm.deliveryTypeVM.length == 0) {
                $http.get('http://localhost:57363/NgocTrang/Api/Bol/GetComponent').then(
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
    }
})();