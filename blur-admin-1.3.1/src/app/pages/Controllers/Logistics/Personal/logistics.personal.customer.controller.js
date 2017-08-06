(function() {
    'use strict';
    angular.module('BlurAdmin.pages.logistics')
        .controller('customerInfoCtrl', customerInfoCtrl);

    customerInfoCtrl.$inject = ['$scope', '$rootScope'];

    function customerInfoCtrl($scope, $rootScope) {
        var vm = this;
        vm.customerInfoVM = {};
        $rootScope.customerVM = vm.customerInfoVM;
        console.log(vm.customerInfoVM);
        console.log($rootScope.customerVM);
        vm.emitEvent = function() {
            $scope.$emit('customerValue', vm.customerInfoVM);
        }
    }
})();