(function(){
'use strict';
angular.module('BlurAdmin.pages')
.controller('TabbedMenuController', TabbedMenuController);

function TabbedMenuController($scope, baSidebarService) {
    $scope.menuItems = baSidebarService.getMenuItems();
}
})();

