(function(){
'use strict';
 
angular.module('BlurAdmin.pages.location')
.controller('locationListCtrl', locationListCtrl)

locationListCtrl.$inject = ['$uibModal', '$uibModalStack', '$scope'];

/**ngInject */
function locationListCtrl($uibModal, $uibModalStack, $scope){
    var vm = this;
    vm.cancel = function(){
        $uibModalStack.dismissAll();
    };
    
    vm.createLocation = function(){
        $uibModal.open({
            animation: true,
            templateUrl: 'app/pages/Templates/Location/Location-Add.View.html',
            controller: 'locationAddCtrl',
            controllerAs: 'locationAddCtrl'
        })
    }

}
})();