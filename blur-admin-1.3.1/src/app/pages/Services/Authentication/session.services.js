<<<<<<< HEAD
(function() {
    'use strict';

    angular.module('BlurAdmin.pages.login')
        .service('Session', session);

    function session() {
        this.create = function(id, fullName, userRole) {
            this.id = id;
            this.fullName = fullName;
            this.userRole = userRole;
            this.isLoggedIn = true;
        };
        this.destroy = function() {
            this.id = null;
            this.fullName = null;
            this.userRole = null;
            this.isLoggedIn = false;
        };
    }
=======
(function(){
'use strict';

angular.module('BlurAdmin.pages.login')
.service('Session', session);

function session() {
    this.create = function (sessionId, userId, userRole) {
        this.id = sessionId;
        this.userId = userId;
        this.userRole = userRole;
      };
      this.destroy = function () {
        this.id = null;
        this.userId = null;
        this.userRole = null;
      };
}
>>>>>>> 3d5b96d6fa6ccc7550ea0eb6c262f814c1f07777

})();