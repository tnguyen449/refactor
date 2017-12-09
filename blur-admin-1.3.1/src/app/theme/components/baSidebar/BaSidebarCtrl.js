(function($) {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .controller('BaSidebarCtrl', BaSidebarCtrl);

    /** @ngInject */
    function BaSidebarCtrl($scope, baSidebarService, Session, $timeout) {

        $scope.menuItems = baSidebarService.getMenuItems();
        $scope.defaultSidebarState = $scope.menuItems[0].stateRef;

        $scope.hoverItem = function($event) {
            $scope.showHoverElem = true;
            $scope.hoverElemHeight = $event.currentTarget.clientHeight;
            var menuTopValue = 66;
            $scope.hoverElemTop = $event.currentTarget.getBoundingClientRect().top - menuTopValue;
        };

        $timeout(function() {
            if (typeof Session.isLoggedIn === 'undefined') {
                $('#listMenu li:gt(0)').hide();
            }
        }, 0);




        $scope.$on('$stateChangeSuccess', function() {
            if (baSidebarService.canSidebarBeHidden()) {
                baSidebarService.setMenuCollapsed(true);
            }
        });
    }
})(jQuery);