(function() {
    'use strict';

    angular.module('BlurAdmin.pages.logistics', [
            'ui.select',
            'ngSanitize'
        ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('logistics', {
                url: '/logistics',
                templateUrl: 'app/pages/logistics/main/logisticsMain.html',
                title: 'Logistics',
                abstract: true,
                sidebarMeta: {
                    icon: 'ion-compose',
                    order: 0
                }
            })
            .state('logistics.personal', {
                url: '/personal',
                templateUrl: 'app/pages/logistics/personal/logisticsPersonal.html',
                title: 'Logistics Personal',
                controller: 'PersonalCtrl',
                controllerAs: 'vm',
                sidebarMeta: {
                    icon: 'ion-compose',
                    order: 0
                }
            })
            .state('logistics.area', {
                url: '/area',
                templateUrl: 'app/pages/logistics/area/logisticsArea.html',
                title: 'Logistics Area',
                controller: 'AreaCtrl',
                controllerAs: 'vm',
                sidebarMeta: {
                    icon: 'ion-compose',
                    order: 0
                }
            })
    };
})();