(function() {
    'use strict';

    angular.module('BlurAdmin.pages.logistics')
        .controller('PersonalCtrl', PersonalCtrl);

    /** @ngInject */
    function PersonalCtrl($scope, $http, shareDataService) {
        var vm = this;

        vm.bolInfo = {};

    };
})();