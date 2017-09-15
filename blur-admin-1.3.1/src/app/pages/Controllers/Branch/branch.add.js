(function() {
    'use strict';

    angular.module('BlurAdmin.pages.branch')
        .controller('branchAddCtrl', branchAddCtrl);

    branchAddCtrl.$inject = ['shareDataService', '$scope', '$state', 'toastr', '$uibModalStack']
        /** ngInject */
    function branchAddCtrl(shareDataService, $scope, $state, toastr, $uibModalStack) {
        var vm = this;
        //init view model data
        vm.branchArea = [];
        vm.branchList = [];
        //component function
        vm.cancel = function() {
            $uibModalStack.dismissAll();
        };

        vm.branchCreate = function() {
            console.log(vm.branchInfo);
            console.log(vm.locationInfo);
            shareDataService.addBranch(vm.branchInfo);
            vm.branchList = shareDataService.getAllBranch();
            vm.cancel();
            // $state.go('branch', {}, { reload: 'branch' });
            toastr.success('Chi nhánh đã được tạo thành công!');
            console.log(vm.branchList);
        };

        vm.initBranchList = function() {
            return vm.branchList = shareDataService.getAllBranch();

        }

        //get data from service
        var branchVM = shareDataService.getInitData();

        /**test Location function (delete after server completed) */
        angular.forEach(branchVM, function(item) {
            var branchList = item.data.branchInfoVM;
            angular.forEach(branchList, function(item) {
                if (vm.branchArea.indexOf(item.Description) < 0) {
                    vm.branchArea.push(item.Description);
                }
            })
        });
        /**end */


    };
})();