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
                sidebarMeta: {
                    icon: 'ion-compose',
                    order: 0
                }
            })
            .state('logistics.personal', {
                url: '/personal',
                views: {
                    'root': {
                        templateUrl: 'app/pages/logistics/personal/logisticsPersonal.html',
                        controller: 'PersonalCtrl',
                        controllerAs: 'personal'
                    },
                    'bolInfo@logistics.personal': {
                        templateUrl: 'app/pages/logistics/personal/billOfLandingInfo/billOfLandingInfo.html',
                        controller: 'bolInfoCtrl',
                        controllerAs: 'bolInfo'
                    },
                    'customerInfo@logistics.personal': {
                        templateUrl: 'app/pages/logistics/personal/customerInfo/customerInfo.html',
                        controller: 'customerInfoCtrl',
                        controllerAs: 'customerInfo'
                    },
                    'bolReviewCtrl@logistics.personal': {
                        templateUrl: 'app/pages/logistics/personal/billOfLandingReview/billOfLandingReview.html',
                        controller: 'PersonalCtrl',
                        controllerAs: 'bolReview'
                    }
                }
            })
            // .state('logistics.area', {
            //     url: '/area',
            //     templateUrl: 'app/pages/logistics/area/logisticsArea.html',
            //     title: 'Logistics Area',
            //     controller: 'AreaCtrl',
            //     controllerAs: 'vm',
            //     sidebarMeta: {
            //         icon: 'ion-compose',
            //         order: 0
            //     }
            // })
    };
})();