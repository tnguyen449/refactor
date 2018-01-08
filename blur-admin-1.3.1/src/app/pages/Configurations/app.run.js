<<<<<<< HEAD
(function($) {
    'use strict';
    angular.module('BlurAdmin.pages.login')
        .run(authentication);

    function authentication($rootScope, AUTH_EVENTS, USER_ROLES, AuthenticationService, $window, $uibModal, $uibModalStack, $location, $state, Session) {
        $rootScope.$on('$stateChangeStart', function(event, next) {
            if (!$window.sessionStorage.getItem(USER_ROLES.guid)) {
                $rootScope.isNotLoggedIn = true;
                $rootScope.isLoggedIn = false;
                var restrictedPage = $.inArray($location.path(), ['/', '/trang-chu']) === -1;
                if (restrictedPage) {
                    $location.path('/trang-chu')
                }
            } else {
                $rootScope.isLoggedIn = true;
                $rootScope.isNotLoggedIn = false;
                $rootScope.employeeName = $window.sessionStorage.getItem(USER_ROLES.guid);
            }
            if (typeof next.data.authorizedRoles === "undefined") {
                return undefined;
            } else {
                var authorizedRoles = next.data.authorizedRoles;
            }

            var role = Session.userRole;
            if (role == AuthenticationService.isAuthorized(authorizedRoles) || typeof Session.userRole === " undefined") {
                var restrictedPage = $.inArray($location.path(), ['/', '/trang-chu']) === -1;
                if (restrictedPage) {
                    $location.path('/trang-chu')
                }
            }
        });
    }
=======
(function($){
'use strict';
angular.module('BlurAdmin.pages.login')
.run(authentication);

function authentication($rootScope, AUTH_EVENTS, AuthenticationService, $uibModal, $uibModalStack) {
    $rootScope.$on('$stateChangeStart', function (event, next) {
        var authorizedRoles = next.data.authorizedRoles;
        if (!AuthenticationService.isAuthorized(authorizedRoles)) {
          event.preventDefault();
          $uibModal.open({
            animation: true,
            templateUrl: 'app/pages/components/notifications/NoMerchandise.alert.html',
            size: 'md',
            controllerAs: '$ctrl',
            controller: ['$uibModalInstance', function($uibModalInstance) {
                var $ctrl = this;    
                $ctrl.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            }]
          })
          if (AuthenticationService.isAuthenticated()) {
            // user is not allowed
            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
          } else {
            // user is not logged in
            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
          }
        }
        if (authorizedRoles === undefined) {
          alert("You are Guest");
        }
      });
}
>>>>>>> 3d5b96d6fa6ccc7550ea0eb6c262f814c1f07777
})(jQuery);