(function() {
    'use strict';

    angular.module('BlurAdmin.pages.logistics')
        .controller('PersonalCtrl', PersonalCtrl);

    PersonalCtrl.$inject = ['$scope', '$http', '$state', '$rootScope'];

    /** @ngInject */
    function PersonalCtrl($scope, $http, $state, $rootScope) {
        var vm = this;
        vm.branchInfoVM = [];
        vm.merchandiseTypeVM = [];
        $rootScope.serverTimeStampVM = "";
        vm.deliveryTypeVM = [];
        vm.customerInfoVM = [];
        vm.activeTab = 0;
        vm.getTransactionComponent = function() {
            if (vm.branchInfoVM.length == 0 && vm.merchandiseTypeVM.length == 0 && vm.deliveryTypeVM.length == 0) {
                $http.get('http://localhost:57363/NgocTrang/Api/Bol/GetComponent').then(
                    function(response) {
                        if (response.data.Branch.length > 0 && response.data.Type.length > 0) {
                            vm.branchInfoVM = response.data.Branch;
                            vm.merchandiseTypeVM = response.data.Type;
                            $rootScope.serverTimeStampVM = response.data.CurrentTimeStamp;
                            vm.deliveryTypeVM = response.data.DeliveryType;
                            vm.initData = {
                                data: {
                                    branchInfoVM: vm.branchInfoVM,
                                    merchandiseTypeVM: vm.merchandiseTypeVM,
                                    deliveryTypeVM: vm.deliveryTypeVM
                                }
                            }
                            console.log(vm.branchInfoVM);
                            $scope.$broadcast('initData', vm.initData);
                            $rootScope.branchInfo = vm.branchInfoVM;
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

        $rootScope.view = function() {
            $state.go('logistics.view', {}, { reload: 'logistics.view' });
        };

        $scope.$on('customerValue', function(event, obj) {
            $scope.$broadcast('bolCodeValue', obj);
        });
    };
})();