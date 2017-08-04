(function() {
    'use strict';
    angular.module('BlurAdmin.delivery', ['ui.select', 'ngSanitize']).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('delivery', {
                url: '/delivery',
                templateUrl: 'app/pages/delivery_method/delivery.html',
                controller: 'deliveryCtrl',
                controllerAs: 'vm',
                title: 'Phương Thức Giao Nhận',
                sidebarMeta: {
                    icon: 'ion-compose',
                    order: 1
                }
            })
    }
})