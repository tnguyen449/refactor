(function($) {
    'use strict';

    angular.module('BlurAdmin.pages.location')
        .controller('locationListCtrl', locationListCtrl)

    locationListCtrl.$inject = ['$uibModal', '$uibModalStack', '$scope', 'utility', 'Url', 'backendController'];

    /**ngInject */
    function locationListCtrl($uibModal, $uibModalStack, $scope, utility, Url, backendController) {
        var vm = this;
        vm.initLocationList = [];

        vm.cancel = function() {
            $uibModalStack.dismissAll();
        };

        vm.createLocation = function() {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/Templates/Location/Location-Add.View.html',
                controller: 'locationAddCtrl',
                controllerAs: 'locationAddCtrl'
            })
        }

        // vm.initLocationList = function() {
        //     utility.getData(Url.hostDomain + backendController.getAllLocations).then(function(response) {
        //         vm.locationList = response.data;
        //     })
        // }


    }
})(jQuery);