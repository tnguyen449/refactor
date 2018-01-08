(function() {
    'use strict';
    angular.module('BlurAdmin.pages')
        .factory('utility', utilityService);

    utilityService.$inject = ['$http', 'Url'];

    /** @ngInject */
    function utilityService($http, Url) {
        return {
            getData: getData,
            postData: postData
        };

        function postData(controller, dataObject) {
            return $http.post(Url.hostDomain + controller, dataObject, { headers: { 'Content-Type': 'application/json' } }).then(function() {

            });
        };

        function getData(controller) {
            var data = {};
            return $http.get(Url.hostDomain + controller).then(
                function(response) {
                    data = response.data;
                    return data;
                });
        }
    }
})();