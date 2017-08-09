(function() {
    'use strict';
    angular.module('BlurAdmin.pages.logistics')
        .controller('detailCtrl', detailCtrl);

    detailCtrl.$inject = ['$scope', '$rootScope', 'shareDataService'];

    function detailCtrl($scope, $rootScope, shareDataService) {
        var vm = this;
        vm.details = shareDataService.getList();
        console.log(vm.details);
    }
})();