(function() {
    'use strict';
    angular.module('BlurAdmin.pages.logistics')
        .controller('customerInfoCtrl', customerInfoCtrl);

    customerInfoCtrl.$inject = ['$scope', '$rootScope'];

    function customerInfoCtrl($scope, $rootScope) {
        var vm = this;
        vm.customerInfoVM = {};
        $rootScope.customerVM = vm.customerInfoVM;
        vm.emitEvent = function() {
            $rootScope.$emit('customerValue', vm.customerInfoVM);
        }
    }
})();