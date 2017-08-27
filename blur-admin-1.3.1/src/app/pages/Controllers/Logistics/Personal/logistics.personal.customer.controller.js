(function() {
    'use strict';
    angular.module('BlurAdmin.pages.logistics')
        .controller('customerInfoCtrl', customerInfoCtrl);

    customerInfoCtrl.$inject = ['$scope', '$rootScope'];

    /** @ngInject */
    function customerInfoCtrl($scope, $rootScope) {
        var vm = this;
        vm.customerInfoVM = {};
        $rootScope.customerVM = vm.customerInfoVM;
        vm.emitEvent = function() {
            $scope.$emit('customerValue', vm.customerInfoVM);
        }
    }
})();