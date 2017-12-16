(function($) {
    'use strict';
    angular.module('BlurAdmin.pages.login')
        .run(authentication);

    function authentication($rootScope, AUTH_EVENTS, AuthenticationService, $window, $uibModal, $uibModalStack, $location, $state, Session) {
        $rootScope.$on('$stateChangeStart', function(event, next) {
            if (typeof Session.isLoggedIn === 'undefined') {
                $rootScope.isNotLoggedIn = true;
                $rootScope.isLoggedIn = false;
            } else {
                $rootScope.isLoggedIn = true;
                $rootScope.isNotLoggedIn = false;
                $rootScope.userName = $window.sessionStorage.getItem('credential');
            }

            if (typeof next.data.authorizedRoles === "undefined") {
                return undefined;
            } else {
                var authorizedRoles = next.data.authorizedRoles;
            }


            var role = Session.userRole;
            if (role == AuthenticationService.isAuthorized(authorizedRoles) || typeof Session.userRole === " undefined") {
                event.preventDefault();
                var restrictedPage = $.inArray($location.path(), ['/', '/trang-chu']) === -1;
                if (restrictedPage) {
                    $state.go('main');
                }
                if (AuthenticationService.isAuthenticated()) {
                    // user is not allowed
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                } else {
                    // user is not logged in
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                }
            } else {
                // $('#listMenu li:gt(0)').show();
                $('#tab-item-0').show();
                
            }
        });
    }
})(jQuery);