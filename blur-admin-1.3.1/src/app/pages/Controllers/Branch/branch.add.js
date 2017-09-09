(function() {
    'use strict';

    angular.module('BlurAdmin.pages.branch')
        .controller('branchAddCtrl', branchAddCtrl);

    branchAddCtrl.$inject = ['shareDataService', '$scope']
        /** ngInject */
    function branchAddCtrl(shareDataService, $scope) {
        var vm = this;
        vm.branchArea = [];
        var branchVM = shareDataService.setInitData();
        console.log(branchVM);
        angular.forEach(branchVM, function(item) {
            var branchList = item.data.branchInfoVM;
            console.log(item);
            angular.forEach(branchList, function(item) {
                if (vm.branchArea.indexOf(item.Description) < 0) {
                    vm.branchArea.push(item.Description);
                }
            })
        })
        console.log(vm.branchArea)
    };
})();