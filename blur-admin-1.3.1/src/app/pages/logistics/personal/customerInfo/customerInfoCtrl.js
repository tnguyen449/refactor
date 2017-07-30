(function() {
    'use strict';
    angular.module('BlurAdmin.pages.logistics')
        .controller('customerInfoCtrl', customerInfoCtrl);

    customerInfoCtrl.$inject = ['$scope', '$rootScope'];

    function customerInfoCtrl($scope, $rootScope) {
        var vm = this;
        vm.customerInfoVM = {};

        vm.emitEvent = function() {
            $scope.$emit('storeValue', vm.customerInfoVM);
        };

    }
})();