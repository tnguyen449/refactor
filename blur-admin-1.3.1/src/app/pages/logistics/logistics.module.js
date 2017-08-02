(function() {
    'use strict';

    angular.module('BlurAdmin.pages.logistics', [
            'ui.select',
            'ngSanitize',
            'ngPatternRestrict'
        ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('logistics', {
                url: '/logistics',
                templateUrl: 'app/pages/logistics/main/logisticsMain.html',
                title: 'Bảo Tiêu',
                sidebarMeta: {
                    icon: 'ion-compose',
                    order: 0
                }
            })
            .state('logistics.view', {
                url: '/view',
                templateUrl: 'app/pages/logistics/viewPage/viewPage.html',
                title: 'Xem Đơn Vận',
                controller: 'PersonalCtrl',
                controllerAs: 'viewInfo'
            })
            .state('logistics.personal', {
                url: '/personal',
                title: 'Bảo Tiêu Cá Nhân',
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
            // .state('delivery', {
            //     url: '/delivery',
            //     templateUrl: 'app/pages/delivery_method/delivery.html',
            //     controller: 'deliveryCtrl',
            //     controllerAs: 'vm',
            //     title: 'Dịch Vụ Giao Nhận',
            //     sidebarMeta: {
            //         icon: 'ion-compose',
            //         order: 1
            //     }
            // })
            // .state('merchandise', {
            //     url: '/merchandise',
            //     templateUrl: 'app/pages/merchandise_manage/merchandise.view.html',
            //     controller: 'merchandiseCtrl',
            //     controllerAs: 'vm',
            //     title: 'Quản Lý Loại Hàng',
            //     sidebarMeta: {
            //         icon: 'ion-compose',
            //         order: 2
            //     }
            // })
            // .state('branch', {
            //     url: '/branch',
            //     templateUrl: 'app/pages/branch_manage/branch.view.html',
            //     controller: 'branchCtrl',
            //     controllerAs: 'vm',
            //     title: 'Quản Lý Chi Nhánh',
            //     sidebarMeta: {
            //         icon: 'ion-compose',
            //         order: 2
            //     }
            // })
    };
})();