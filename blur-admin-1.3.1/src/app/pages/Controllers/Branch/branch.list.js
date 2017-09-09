(function() {
    'use strict';
    angular.module('BlurAdmin.pages.branch')
        .controller('branchListCtrl', branchListCtrl);

    branchListCtrl.$inject = ['$uibModal', '$scope']
        /**ngInject */
    function branchListCtrl($uibModal, $scope) {
        var vm = this;
        vm.createBranch = function() {
            $uibModal.open({
                animaton: true,
                templateUrl: 'app/pages/Templates/Logistics/Main_View_Refactor/Branch/Branch-Add.View.html',
                controller: 'branchAddCtrl',
                controllerAs: 'branchAddCtrl'
            })
        };
    }
})();