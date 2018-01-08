<<<<<<< HEAD
(function() {
    'use strict';
    angular.module('BlurAdmin.pages.login')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', 'Session', 'UserService', 'utility', 'backendController', 'Url'];

    /** @ngInject */
    function AuthenticationService($http, Session, UserService, utility, backendController, Url) {
        var authService = {};

        authService.Login = function(credential) {

            return $http.post(Url.hostDomain + backendController.login, credential, { headers: { 'Content-Type': 'application/json' } })
                .then((res) => {
                    Session.create(res.data.Id, res.data.FulName, res.data.Role);
                    return res.data.user;
                })
        };

        authService.isAuthenticated = () => {
            return Session.userRole;
        };

        authService.isAuthorized = (authorizedRoles) => {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (authService.isAuthenticated() &&
                authorizedRoles.indexOf(Session.userRole) !== -1);
        };
        return authService;
    }
=======
(function(){
'use strict';
angular.module('BlurAdmin.pages.login')
.factory('AuthenticationService', AuthenticationService);
AuthenticationService.$inject = ['$http', 'Session', 'UserService'];

/** @ngInject */
function AuthenticationService($http, Session, UserService) {
   var authService = {};
   
   authService.Login = (credential) => {
        return $http.post('/login', credentials)
        .then((res) => {
            Session.create(res.data.id, res.data.user.id, res.data.user.role);
            return res.data.user;
        })
   };

   authService.isAuthenticated = () => {
        return !!Session.userId;
   };

   authService.isAuthorized = (authorizedRoles) => {
    if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      return (authService.isAuthenticated() &&
      authorizedRoles.indexOf(Session.userRole) !== -1);
   };
   return authService;
}
>>>>>>> 3d5b96d6fa6ccc7550ea0eb6c262f814c1f07777
})();