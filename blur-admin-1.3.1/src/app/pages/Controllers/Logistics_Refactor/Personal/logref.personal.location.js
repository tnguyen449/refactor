(function() {
    'use strict';

    angular.module('BlurAdmin.pages.logistics')
        .controller('DestinationController', DestinationController);

    DestinationController.$inject = ['$scope', '$rootScope', '$state', '$uibModal', '$uibModalStack', 'shareDataService', 'backendController', 'utility']

    /** @ngInject */
    function DestinationController($scope, $rootScope, $state, $uibModal, $uibModalStack, shareDataService, backendController, utility) {
        var vm = this;
        var initDataList = shareDataService.getInitData();

        // vm.branchInfoVM = initDataList[0].data.branchInfoVM;

        vm.cancel = function() {
            $uibModalStack.dismissAll();
            $state.go('view', '', { reload: true });
        }

        vm.emitEvent = function() {
            var options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            };
            if (initDataList[0].data.merchandiseTypeVM.length == 0) {
                $uibModal.open({
                    animation: true,
                    templateUrl: 'app/pages/components/notifications/NoMerchandise.alert.html',
                    controller: 'DestinationController',
                    controllerAs: 'DestinationController'
                })
            } else {
                shareDataService.addBranchCode(vm.branchCode);
                var currentTime = new Date();
                var dateCode = currentTime.getDate().toLocaleString('en-GB', options) + (currentTime.getMonth() + 1).toLocaleString('en-GB', options) + currentTime.getFullYear().toLocaleString('en-GB', options).substring(5, 3);
                var timeCode = currentTime.getHours().toLocaleString('en-GB', options) + currentTime.getMinutes().toLocaleString('en-GB', options) + currentTime.getSeconds().toLocaleString('en-GB', options);
                var to = vm.branchCode.receivedBranchCode.selected.BranchCode.trim();
                var from = vm.branchCode.sentBranchCode.selected.BranchCode.trim();
                var bolCode = from + "-" + dateCode + "-" + to + "-" + timeCode;
                shareDataService.addBolCode(bolCode);
                $state.go('bol');
            }
        }

        vm.getBranch = function() {
                utility.getData(backendController.getAllBranches).then(
                    function(response) {
                        vm.branchInfoVM = response;
                        vm.branchCode = {};
                        vm.branchCode.sentBranchCode = {};
                        vm.branchCode.sentBranchCode.selected = vm.branchInfoVM[0];
                        vm.branchCode.receivedBranchCode = {};
                        vm.branchCode.receivedBranchCode.selected = vm.branchInfoVM[1];

                    })
            }
            /** end */
    }
})();