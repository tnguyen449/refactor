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

})();