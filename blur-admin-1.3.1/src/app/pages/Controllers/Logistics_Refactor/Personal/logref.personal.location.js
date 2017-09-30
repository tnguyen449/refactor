(function() {
    'use strict';

    angular.module('BlurAdmin.pages.logistics')
        .controller('DestinationController', DestinationController);

    DestinationController.$inject = ['$scope', '$rootScope', '$state', 'shareDataService', 'backendController', 'utility']

    /** @ngInject */
    function DestinationController($scope, $rootScope, $state, shareDataService, backendController, utility) {
        var vm = this;
        // var initDataList = shareDataService.getInitData();
        // vm.branchInfoVM = initDataList[0].data.branchInfoVM;

        /** validate data in form
         *  @Definition: It wil active when clicking Confirm button
         */
        vm.emitEvent = function(formValid) {
            if (formValid) {
                shareDataService.addBranchCode(vm.branchCode);
                $state.go('bol');
            }
        }

        vm.getBranch = function() {
                utility.getData(backendController.getAllBranches).then(
                    function(response) {
                        vm.branchInfoVM = response;
                        console.log(vm.branchInfoVM);
                    })
            }
            /** end */
    }
})();