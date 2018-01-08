(function() {
    'use strict';
    angular.module('BlurAdmin.pages')
        .controller('SearchBolController', SearchBolController);

    function SearchBolController($timeout, $rootScope, $scope, $http, Url, backendController) {
        var vm = this;
        vm.result = {};
        $rootScope.progress = false;
        $rootScope.data = false;
        $rootScope.notFound = false;
        vm.search = (bolCode) => {
            if (typeof(bolCode) !== 'undefined') {
                $rootScope.progress = true;
                $rootScope.data = false;
                $http.get(Url.hostDomain + backendController.getBolByBolCode + bolCode).then((res) => {
                    vm.result = res;
                    $rootScope.progress = false;
                    $rootScope.data = true;
                    $rootScope.notFound = false;
                }, (err) => {
                    $rootScope.progress = false;
                    $rootScope.data = false;
                    $rootScope.notFound = true;
                })
            }
        }
    }
})();