(function() {
    'use strict';
    angular.module('BlurAdmin.pages.branch')
        .controller('branchListCtrl', branchListCtrl);

    branchListCtrl.$inject = ['$uibModal', '$scope', '$state', 'toastr', 'utility', 'Url', 'backendController', 'editableOptions', 'editableThemes'];

    /**ngInject */
    function branchListCtrl($uibModal, $scope, $state, toastr, utility, Url, backendController, editableOptions, editableThemes) {
        var vm = this;
        vm.branchList = [];
        vm.hover = false;

        vm.createBranch = function() {
            $uibModal.open({
                animaton: true,
                templateUrl: 'app/pages/Templates/Branch/Branch-Add.View.html',
                controller: 'branchAddCtrl',
                controllerAs: 'branchAddCtrl'
            })
        };

        vm.initBranchList = function() {
            utility.getData(backendController.getAllBranches).then(
                function(response) {
                    vm.branchList = response.reverse();
                }
            )
        }

        vm.deleteBranch = function(id) {
            $.ajax({
                    method: 'POST',
                    url: Url.hostDomain + backendController.deleteBranch + '?id=' + id,
                    data: id
                })
                .done(function() {
                    $state.reload();
                });
        }

        vm.updateBranchName = function(id, name) {
            utility.postData(backendController.updateBranchName + id + "/" + name).then(
                function() {
                    toastr.success("Cập nhật tên chi nhánh thành công!")
                })
        }
        vm.updateBranchCode = function(id, code) {
            utility.postData(backendController.updateBranchName + id + "/" + code).then(
                function() {
                    toastr.success("Cập nhật mã chi nhánh thành công!")
                })
        }
        vm.updateBranchAddress = function(id, address) {
            utility.postData(backendController.updateBranchName + id + "/" + address).then(
                function() {
                    toastr.success("Cập nhật địa chỉ chi nhánh thành công!")
                })
        }
        vm.updateBranchPhone = function(id, phone) {
            utility.postData(backendController.updateBranchName + id + "/" + phone).then(
                function() {
                    toastr.success("Cập nhật điện thoại chi nhánh thành công!")
                })
        }

        editableOptions.theme = 'bs3';
        editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
        editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-primary btn-with-icon"><i class="ion-close-round"></i></button>';
    }
})();