(function() {
    'use strict';

    angular.module('ntlApp.components.templates')
        .directive('contentTop', contentTop);

    function contentTop($location, $state) {
        return {
            restrict: 'E',
            templateUrl: 'app/components/templates/contentTop/contentTop.html',
            link: function($scope) {
                $scope.$watch(function() {
                    $scope.activePagTitle = $state.current.title;
                });
            }
        };
    }
})();