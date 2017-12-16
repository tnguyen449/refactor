(function(){
'use strict';

angular.module('BlurAdmin.pages')
.directive('tabbedMenu', tabbedMenu);
function tabbedMenu($timeout, baSidebarService) {
    return{
        restrict: 'E',
        templateUrl: 'app/pages/components/tabbedMenu/tabbed-menu.html',
        controller: 'TabbedMenuController'
    }
}
})();