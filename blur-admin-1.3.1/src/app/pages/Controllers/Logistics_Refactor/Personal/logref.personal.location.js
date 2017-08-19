(function() {
    'use strict';

    angular.module('BlurAdmin.pages.logistics')
        .controller('LocationController', LocationController);

    LocationController.$inject = ['$scope', '$rootScope', '$state', 'shareDataService']

    function LocationController($scope, $rootScope, $state, shareDataService) {
        var vm = this;
        var initDataList = shareDataService.setInitData();
        vm.branchInfoVM = initDataList[0].data.branchInfoVM;

        /** validate data in form
         *  @Definition: It wil active when clicking Confirm button
         */
        vm.emitEvent = function(formValid) {
                if (formValid) {
                    shareDataService.getBranchCode(vm.branchCode);
                    $state.go('bol');
                }
            }
            /** end */
    }
})();