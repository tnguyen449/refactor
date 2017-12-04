(function(){
'use strict';
angular.module('BlurAdmin.theme.components')
.controller('pageTopController', pageTopController);

function pageTopController($window, $scope) {
    var vm= this;
    vm.click = () => {
        $window.location.href = '/auth.html';
    }
   
}
})();