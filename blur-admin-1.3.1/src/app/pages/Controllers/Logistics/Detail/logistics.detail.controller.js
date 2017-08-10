(function() {
    'use strict';
    angular.module('BlurAdmin.pages.logistics')
        .controller('detailCtrl', detailCtrl);

    detailCtrl.$inject = ['$scope', '$rootScope', 'shareDataService'];

    function detailCtrl($scope, $rootScope, shareDataService) {
        var vm = this;
        vm.details = shareDataService.getList();
        vm.customerView = $rootScope.customerVM;
        vm.branchView = $rootScope.branchInfo;
        vm.BolToList = [];
        angular.forEach('vm.customerView', function(customer) {
                var bolToId = customer.BolToId;
                angular.forEach('vm.branchView', function(branch) {
                    var branchId = branch.Id;
                    if (bolToId == branchId) {
                        vm.details.push(branchId);
                    }
                })
            })
            //vm.BolToNameVM = $rootScope.branchInfoVM;
            // $rootScope.$on('initData', function(event, obj) {
            //     var BolToNameVM = obj.data.branchInfoVM;
            //     vm.BolToNameVM = BolToNameVM;
            // });
        console.log($rootScope.branchInfo);
    }
})();