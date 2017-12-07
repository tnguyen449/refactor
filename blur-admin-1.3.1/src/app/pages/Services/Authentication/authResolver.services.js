(function(){
'use strict';

angular.module('BlurAdmin.pages.login')
.factory('AuthResolver', AuthResolver)

function AuthResolver($q, $rootScope, $state) {
    return {
        resolve: function () {
          var deferred = $q.defer();
          var unwatch = $rootScope.$watch('currentUser', function (currentUser) {
            if (angular.isDefined(currentUser)) {
              if (currentUser) {
                deferred.resolve(currentUser);
              } else {
                deferred.reject();
                $state.go('user-login');
              }
              unwatch();
            }
          });
          return deferred.promise;
        }
      };
}
})();