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

})();