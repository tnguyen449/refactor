(function() {
    'use strict';

    angular.module('BlurAdmin.pages.logistics')
        .controller('PersonalMainController', PersonalMainController);

    PersonalMainController.$inject = ['$scope', '$rootScope', '$state', '$http', 'shareDataService', 'utility', '$uibModal', '$uibModalStack', 'Url', 'backendController']

    /** @ngInject */
    function PersonalMainController($scope, $rootScope, $state, $http, shareDataService, utility, $uibModal, $uibModalStack, Url, backendController) {
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
                        if (response.Branch.length > 0 && response.Type.length > 0) {
                            vm.branchInfoVM = response.Branch;
                            vm.merchandiseTypeVM = response.Type;
                            vm.serverTimeStampVM = response.CurrentTimeStamp;
                            vm.deliveryTypeVM = response.DeliveryType;
                            vm.initData = {
                                data: {
                                    branchInfoVM: vm.branchInfoVM,
                                    merchandiseTypeVM: vm.merchandiseTypeVM,
                                    deliveryTypeVM: vm.deliveryTypeVM,
                                    serverTimeStamp: vm.serverTimeStampVM
                                }
                            }
                            shareDataService.addInitData(vm.initData);
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

        // vm.getAllBol = function() {
        //     $http.get(Url.hostDomain + '/Bol/GetAllBol').then(
        //         function(response) {
        //             shareDataService.addItem(response.data);
        //             vm.bolDetails = shareDataService.getList().reverse();
        //             console.log(vm.bolDetails);
        //         }
        //     )
        // };


        vm.getAllBol = function() {
            utility.getData(backendController.getAllBol).then(
                function(response) {
                    vm.bolDetails = response.reverse();
                    console.log(vm.bolDetails);
                }
            )
        };

        vm.updateStatus = function(id) {
            $.ajax({
                    method: 'POST',
                    url: Url.hostDomain + backendController.updateStatus + '?bolId=' + id,
                    data: id
                })
                .done(function() {
                    $state.reload();
                });
        };

        vm.confimBol = function(id) {

        }

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
                    //,
                    // resolve: {
                    //     items: function() {
                    //         return $scope.stampCode;
                    //     }
                    // }
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