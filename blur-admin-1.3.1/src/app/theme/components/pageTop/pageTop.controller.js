(function(){
'use strict';
angular.module('BlurAdmin.theme.components')
.controller('pageTopController', pageTopController);

function pageTopController($window, $scope, $state, $rootScope) {
    var vm= this;
    // vm.isLogin = $rootScope.globals;
    // (() =>{
    //     if (vm.isLogin === "") {
    //         $('.slimScrollDiv li:gt(0)').hide();
    //     } else {
    //         $('.slimScrollDiv li').show();
    //         $('.user-profile').hide();
    //     }
    // })();
    vm.click = () => {
        $state.go('login');
        $('.user-profile').hide();
    }
   
}
})();