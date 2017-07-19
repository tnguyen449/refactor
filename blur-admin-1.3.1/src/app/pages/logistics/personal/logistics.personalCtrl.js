(function() {
    'use strict';

    angular.module('BlurAdmin.pages.logistics')
        .controller('PersonalCtrl', PersonalCtrl);

    /** @ngInject */
    function PersonalCtrl($scope, $http) {
        var vm = this;
        vm.customerInfoVM = {};
        vm.bolInfo = {};
        vm.branchInfoVM = [{
                Name: 'Quận 1',
                Description: 'Sài Gòn'
            },
            {
                Name: 'Quận 10',
                Description: 'Sài Gòn'
            }, {
                Name: 'Quận Tân Bình',
                Description: 'Sài Gòn'
            },
            {
                Name: 'Vĩnh Hy',
                Description: 'Nha Trang'
            },
            {
                Name: 'Cam Ranh',
                Description: 'Khánh Hòa'
            },
            {
                Name: 'Thành phố Cam Ranh',
                Description: 'Khánh Hòa'
            }
        ];
        console.log(vm.branchInfoVM);
    };
})();