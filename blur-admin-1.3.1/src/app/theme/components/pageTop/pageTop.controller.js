<<<<<<< HEAD
(function() {
    'use strict';
    angular.module('BlurAdmin.theme.components')
        .controller('pageTopController', pageTopController);

    function pageTopController($rootScope, $window, $scope, $state, Session, $uibModal, $location) {
        var vm = this;
        vm.click = () => {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/Templates/Login/login.view.html',
                controller: 'LoginController',
                controllerAs: 'login',
                size: 'sm'
            })
        };
        vm.logOff = () => {
            $window.sessionStorage.clear();
            $rootScope.isLoggedIn = false;
            $rootScope.isNotLoggedIn = true;
            $location.path("/trang-chu");
            $state.go('main', {}, { reload: true });
            $rootScope.employeeName = "";
            $('#listMenu li:gt(0)').hide();

        }
    };
=======
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
>>>>>>> 3d5b96d6fa6ccc7550ea0eb6c262f814c1f07777
})();