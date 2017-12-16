(function() {
    'use strict';

    angular.module('BlurAdmin.pages.configuration')
        .config(routeConfig);
    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', 'USER_ROLES']

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider, $locationProvider, USER_ROLES) {
        $urlRouterProvider.otherwise('/trang-chu');
        $locationProvider.hashPrefix('');
        $locationProvider.html5Mode(true);
        $stateProvider
            // .state('login', {
            //     url: '/dang-nhap',

            //     templateUrl: 'app/pages/Templates/Login/login.view.html',
            //     controller: 'LoginController',
            //     controllerAs: 'login'
            // })

        .state('main', {
            url: '/trang-chu',
            title: 'Trang Chủ',
            templateUrl: 'app/pages/Templates/Logistics/Main_View_Refactor/Main.View.html',
            sidebarMeta: {
                icon: 'fa fa-home fa-lg',
                order: 0
            },
            data: {
                authorizedRoles: undefined
            },
            controller: 'PersonalMainController',
            controllerAs: 'mainCtrl',

        })

        .state('view', {
            url: '/van-don/danh-sach',
            title: 'Vận Đơn',
            templateUrl: 'app/pages/Templates/Logistics/Main_View_Refactor/BolView.View.html',
            sidebarMeta: {
                icon: 'fa fa-eye fa-lg',
                order: 1
            },
            data: {
                authorizedRoles: [USER_ROLES.guest]
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
            data: {
                authorizedRoles: [USER_ROLES.guest]
            },
            controllerAs: 'bolInfoCtrl'

        })


        .state('branch', {
            url: '/chi-nhanh',
            templateUrl: 'app/pages/Templates/Branch/Branch-List.View.html',
            controller: 'branchListCtrl',
            controllerAs: 'branchListCtrl',
            data: {
                authorizedRoles: [USER_ROLES.guest]
            },
            title: 'Chi Nhánh',
            sidebarMeta: {
                order: 2,
                icon: 'fa fa-building fa-lg'
            }
        })

        .state('merchandise', {
            url: '/mat-hang',
            templateUrl: 'app/pages/Templates/Merchandise/merchandise.view.html',
            controller: 'merchandiseCtrl',
            controllerAs: 'merchandiseCtrl',
            data: {
                authorizedRoles: [USER_ROLES.guest]
            },
            title: 'Mặt Hàng',
            sidebarMeta: {
                order: 3,
                icon: 'fa fa-globe fa-lg'
            }
        })

        .state('employee', {
            url: '/nhan-vien',
            templateUrl: 'app/pages/Templates/Employee/employee.view.html',
            controller: 'EmployeeAddController',
            controllerAs: 'employeeAddCtrl',
            data: {
                authorizedRoles: [USER_ROLES.guest]
            },
            title: 'Nhân Viên',
            sidebarMeta: {
                order: 4,
                icon: 'fa fa-users fa-lg'

            }
        })

        .state('statistics', {
            url: '/thong-ke',
            templateUrl: 'app/pages/Templates/Statistics/statistics.view.html',
            controller: 'statisticsCtrl',
            controllerAs: 'statisticsCtrl',
            data: {
                authorizedRoles: [USER_ROLES.guest]
            },
            title: 'Thống Kê',
            sidebarMeta: {
                icon: 'fa fa-bar-chart fa-lg',
                order: 5
            }
        })
    };
})();



/** end */