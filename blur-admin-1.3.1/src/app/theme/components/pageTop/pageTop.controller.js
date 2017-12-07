(function(){
'use strict';
angular.module('BlurAdmin.theme.components')
.controller('pageTopController', pageTopController);

function pageTopController($window, $scope, $state) {
    var vm= this;
    vm.click = () => {
       $state.go('login');
    }
   
}
})();