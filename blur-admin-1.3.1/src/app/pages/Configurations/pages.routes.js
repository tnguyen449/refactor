(function() {
    'use strict';

    angular.module('BlurAdmin.pages.logistics')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/trang-chu');
        $locationProvider.hashPrefix('');
        $locationProvider.html5Mode(true);
        $stateProvider
            .state('main', {
                url: '/trang-chu',
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
            url: '/van-don/danh-sach',
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
        })

        .state('create.personal', {
            url: '/dia-diem',
            templateUrl: 'app/pages/Templates/Logistics/Main_View_Refactor/Destination/Destination.View.html',
            controller: 'DestinationController',
            controllerAs: 'destinationCtrl',
            title: 'Cá Nhân',
            sidebarMeta: {
                icon: 'fa fa-user fa-lg',
                order: 0,
            }
        })

        .state('bol', {
            url: '/chi-tiet',
            templateUrl: 'app/pages/Templates/Logistics/Main_View_Refactor/BoL/BillofLanding.View.html',
            controller: 'BolInfoController',
            controllerAs: 'bolInfoCtrl'
        })

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
                    order: 1
                }
            })

        .state('manage.merchandise', {
            url: '/mat-hang',
            templateUrl: 'app/pages/Templates/Merchandise/merchandise.view.html',
            controller: 'merchandiseCtrl',
            controllerAs: 'merchandiseCtrl',
            title: 'Mặt Hàng',
            sidebarMeta: {
                order: 2
            }
        })

        .state('manage.employee', {
            url: '/nhan-vien',
            templateUrl: 'app/pages/Templates/Employee/employee.view.html',
            controller: 'EmployeeAddController',
            controllerAs: 'employeeAddCtrl',
            title: 'Nhân Viên',
            sidebarMeta: {
                order: 3
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