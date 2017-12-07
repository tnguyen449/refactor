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
})(jQuery);