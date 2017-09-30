(function() {
    'use strict';
    angular.module('BlurAdmin.pages.branch')
        .controller('branchListCtrl', branchListCtrl);

    branchListCtrl.$inject = ['$uibModal', '$scope', '$state', 'utility', 'Url', 'backendController'];

    /**ngInject */
    function branchListCtrl($uibModal, $scope, $state, utility, Url, backendController) {
        var vm = this;
        vm.branchList = [];
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
    }
})();