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
})(jQuery);