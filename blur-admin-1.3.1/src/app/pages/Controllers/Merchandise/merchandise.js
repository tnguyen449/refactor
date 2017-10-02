(function() {
    'use strict';

    angular.module('BlurAdmin.pages.merchandise')
        .controller('merchandiseCtrl', merchandiseCtrl);

    merchandiseCtrl.$inject = ['$scope', '$uibModal', '$state', 'utility', 'Url', 'backendController', ];

    function merchandiseCtrl($scope, $uibModal, $state, utility, Url, backendController) {
        var vm = this;
        vm.openModal = function() {
            $uibModal.open({
                templateUrl: "app/pages/Templates/Merchandise/merchandiseAdd.view.html",
                controller: 'merchandiseAddCtrl',
                controllerAs: 'merchandiseAddCtrl'
            });
        }

        vm.initMerchandiseList = function() {
            utility.getData(backendController.getAllMerchandiseTypes).then(
                function(response) {
                    vm.merchandiseList = response.reverse();
                }
            )
        }



        vm.deleteMerchandise = function(id) {
            utility.postData(backendController.deleteMerchandiseType + '/' + id).then(function() {
                    $state.reload();
                })
                // $.ajax({
                //         method: 'POST',
                //         url: Url.hostDomain + backendController.deleteMerchandiseType + '?id=' + id,
                //         data: id
                //     })
                //     .done(function() {
                //         $state.reload();
                //     });
        }
    }


})();