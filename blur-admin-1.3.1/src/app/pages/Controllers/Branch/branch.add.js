(function($) {
    'use strict';

    angular.module('BlurAdmin.pages.branch')
        .controller('branchAddCtrl', branchAddCtrl);

    branchAddCtrl.$inject = ['shareDataService', 'utility', '$scope', '$state', '$http', 'toastr', '$uibModalStack', 'Url', 'backendController']
        /** ngInject */
    function branchAddCtrl(shareDataService, utility, $scope, $state, $http, toastr, $uibModalStack, Url, backendController) {
        var vm = this;
        //init view model data
        vm.branchArea = [];
        vm.branchList = [];

        //component function
        vm.cancel = function() {
            $uibModalStack.dismissAll();
        };

        vm.branchCreate = function() {
            vm.Branch = {
                branchVM: {
                    Name: vm.branchInfo.branchName,
                    Address: vm.branchInfo.branchAddress,
                    Phone: vm.branchInfo.branchPhone,
                    Email: vm.branchInfo.branchEmail,
                    BranchCode: vm.branchInfo.branchCode,
                    Description: vm.locationInfo.selected
                }
            }

            utility.postData(backendController.addBranch, vm.Branch.branchVM).then(function() {
                vm.cancel();
                $state.go('manage.branch', {}, { reload: true });
                vm.branchList = utility.getData(backendController.getAllBranches).then(function(response) {
                    shareDataService.addInitData(response);
                });
                toastr.success('Chi nhánh đã được tạo thành công!');
            })
        };
        var branchVM = shareDataService.getInitData();
        /**end */


    };
})(jQuery);