(function() {
    'use strict';

    angular.module('BlurAdmin.logistics', [
            'ui.select',
            'ngSanitize',
            'ngPatternRestrict'
        ])
        .config(routeConfig);
    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('main', {
                url: '/logistics/main',
                title: 'Bảo Tiêu Refactor',
                templateUrl: 'app/pages/Templates/Logistics/Main_View_Refactor/Main.View.html',
                sidebarMeta: {
                    icon: 'ion-compose',
                    order: 0
                }
            })
            .state('location', {
                url: '/logistics/location',
                templateUrl: 'app/pages/Templates/Logistics/Main_View_Refactor/Location/Location.View.html'
            })
            .state('bol', {
                url: '/logistics/bol',
                templateUrl: 'app/pages/Templates/Logistics/Main_View_Refactor/BoL/BillofLanding.View.html'
            })
    }
})();