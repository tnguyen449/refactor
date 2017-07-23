(function() {
    'use strict';
    angular.module('BlurAdmin.pages.logistics')
        .controller('customerInfoCtrl', ['$scope', '$rootScope', customerInfoCtrl]);

    function customerInfoCtrl($scope, $rootScope, shareDataService) {
        var vm = this;
        vm.customerInfoVM = {};

        vm.emitEvent = function() {
            $scope.$emit('storeValue', vm.customerInfoVM)
        };

    }
})();