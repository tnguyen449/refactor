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
})();