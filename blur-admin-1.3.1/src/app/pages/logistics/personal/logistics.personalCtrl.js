(function() {
    'use strict';

    angular.module('BlurAdmin.pages.logistics')
        .controller('PersonalCtrl', ['$scope', '$rootScope', '$http', PersonalCtrl]);

    /** @ngInject */
    function PersonalCtrl($scope, $rootScope, $http, shareDataService) {
        var vm = this;
        vm.branchInfoVM = [];
        // vm.bolFrom = customerInfoCtrl.customerInfoVM.BolFromName.selected;

        vm.merchandiseTypeVM = [];
        $rootScope.serverTimeStampVM = {};
        vm.deliveryTypeVM = [];
        vm.getTransactionComponent = function() {
            if (vm.branchInfoVM.length == 0 && vm.merchandiseTypeVM.length == 0 && vm.deliveryTypeVM.length == 0) {
                $http.get('http://localhost:57363/NgocTrang/Api/Bol/GetComponent').then(
                    function(response) {
                        if (response.data.Branch.length > 0 && response.data.Type.length > 0) {
                            vm.branchInfoVM = response.data.Branch;
                            vm.merchandiseTypeVM = response.data.Type;
                            // $rootScope.serverTimeStampVM = response.data.CurrentTimeStamp;

                            vm.deliveryTypeVM = response.data.DeliveryType;
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

        $scope.$on('storeValue', function(event, obj) {
            $scope.$broadcast('setValue', obj);
        });


    };
})();