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

            // $http.post(Url.hostDomain + backendController.addBranch, vm.Branch.branchVM).then(
            //     function() {

            //     }
            // )

            // $.ajax({
            //         method: "POST",
            //         url: Url.hostDomain + backendController.addBranch,
            //         data: vm.Branch.branchVM
            //     })
            //     .done(function() {
            //         vm.cancel();
            //         $state.go('manage.branch', {}, { reload: true });
            //         vm.branchList = utility.getData(backendController.getAllBranches).then(function(response) {
            //             shareDataService.addInitData(response);
            //         });
            //         toastr.success('Chi nhánh đã được tạo thành công!');
            //     })
        };

        // vm.initBranchList = function() {
        //     return vm.branchList = shareDataService.getAllBranch();

        // }
        var branchVM = shareDataService.getInitData();

        /**test Location function (delete after backend completed) */
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
})(jQuery);