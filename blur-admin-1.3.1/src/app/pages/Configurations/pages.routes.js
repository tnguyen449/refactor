(function() {
    'use strict';

    angular.module('BlurAdmin.pages.logistics')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/ngoc-trang/trang-chu');

        $stateProvider
            .state('main', {
                url: '/ngoc-trang/trang-chu',
                title: 'Trang Chủ',
                templateUrl: 'app/pages/Templates/Logistics/Main_View_Refactor/Main.View.html',
                sidebarMeta: {
                    icon: 'fa fa-home fa-lg',
                    order: 0
                },
                controller: 'PersonalMainController',
                controllerAs: 'mainCtrl'
            })

        .state('view', {
            url: '/ngoc-trang/van-don/danh-sach',
            title: 'Xem Vận Đơn',
            templateUrl: 'app/pages/Templates/Logistics/Main_View_Refactor/BolView.View.html',
            sidebarMeta: {
                icon: 'fa fa-eye fa-lg',
                order: 0
            },
            controller: 'PersonalMainController',
            controllerAs: 'mainCtrl'
        })

        .state('create', {
            url: '/van-don/tao',
            template: '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
            // abstract: true,
            // title: 'Tạo Vận Đơn',
            // sidebarMeta: {
            //     icon: 'fa fa-pencil-square-o fa-lg',
            //     order: 0,
            // }
        })

        .state('create.personal', {
            url: '/ca-nhan',
            templateUrl: 'app/pages/Templates/Logistics/Main_View_Refactor/Destination/Destination.View.html',
            controller: 'DestinationController',
            controllerAs: 'destinationCtrl',
            title: 'Cá Nhân',
            lazyLoad: function() {
                $state.reload();
            },
            sidebarMeta: {
                icon: 'fa fa-user fa-lg',
                order: 0,
            }
        })

        .state('bol', {
            url: '/logistics/bol',
            templateUrl: 'app/pages/Templates/Logistics/Main_View_Refactor/BoL/BillofLanding.View.html',
            controller: 'BolInfoController',
            controllerAs: 'bolInfoCtrl',
            lazyLoad: function() {
                $state.reload();
            },
        })

        // .state('create.area', {
        //     url: '/area',
        //     templateUrl: 'app/pages/Templates/Logistics/Main_View_Refactor/Location/Location.View.html',
        //     controller: 'LocationController',
        //     controllerAs: 'locationCtrl',
        //     title: 'Khu Vực',
        //     sidebarMeta: {
        //         icon: 'fa fa-users fa-lg',
        //         order: 0,
        //     }
        // })

        // .state('qr', {
        //         url: '/logistics/qr',
        //         templateUrl: 'app/pages/Templates/Logistics/Main_View_Refactor/TestQr.html',
        //         controller: 'bolReviewCtrl',
        //         controllerAs: 'bolConfirm'
        //,
        // title: "QR Test",
        // sidebarMeta: {
        //     icon: 'fa fa-user fa-lg',
        //     order: 0,
        // }
        // })
        .state('manage', {
                url: '/quan-ly',
                template: '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
                abstract: true,
                title: 'Quản Lý',
                sidebarMeta: {
                    icon: 'fa fa-pencil-square-o fa-lg',
                    order: 0,
                }

            })
            .state('manage.branch', {
                url: '/chi-nhanh',
                templateUrl: 'app/pages/Templates/Branch/Branch-List.View.html',
                controller: 'branchListCtrl',
                controllerAs: 'branchListCtrl',
                title: 'Chi Nhánh',
                sidebarMeta: {
                    icon: 'fa fa-globe fa-lg',
                    order: 2
                }
            })

        // .state('manage.locations', {
        //     url: '/khu-vuc',
        //     templateUrl: 'app/pages/Templates/Location/Location-List.View.html',
        //     controller: 'locationListCtrl',
        //     controllerAs: 'locationListCtrl',
        //     title: 'Khu Vực',
        //     sidebarMeta: {
        //         icon: 'fa fa-globe fa-lg',
        //         order: 2
        //     }
        // })

        .state('manage.merchandise', {
                url: '/mat-hang',
                templateUrl: 'app/pages/Templates/Merchandise/merchandise.view.html',
                controller: 'merchandiseCtrl',
                controllerAs: 'merchandiseCtrl',
                title: 'Mặt Hàng',
                sidebarMeta: {
                    icon: 'fa fa-globe fa-lg',
                    order: 2
                }
            })
            .state('statistics', {
                url: '/thong-ke',
                templateUrl: 'app/pages/Templates/Statistics/statistics.view.html',
                controller: 'statisticsCtrl',
                controllerAs: 'statisticsCtrl',
                title: 'Thống Kê',
                sidebarMeta: {
                    icon: 'fa fa-bar-chart fa-lg',
                    order: 2
                }
            })
    };
})();



/** end */