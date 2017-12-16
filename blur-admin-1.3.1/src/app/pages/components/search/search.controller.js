(function() {
    'use strict';
    angular.module('BlurAdmin.pages')
        .controller('SearchBolController', SearchBolController);

    function SearchBolController($timeout, $rootScope, $scope, $http, Url, backendController) {
        var vm = this;
        vm.result = {};
        $rootScope.progress = false;
        $rootScope.data = true;
        vm.search = (bolCode) => {
            $rootScope.progress = true;
            $rootScope.data = false;
            $http.get(Url.hostDomain + backendController.getBolByBolCode + bolCode).then((res) => {
                vm.result = res;
                console.log(vm.result);
                $rootScope.progress = false;
                $rootScope.data = true;
            }, (err) => {
                console.log(err);
                $rootScope.progress = false;
                $rootScope.data = true;
            })
        }

    }
})();