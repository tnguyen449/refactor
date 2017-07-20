(function() {
    'use strict';
    angular.module('BlurAdmin.pages.logistics')
        .controller('customerInfoCtrl', customerInfoCtrl);

    function customerInfoCtrl(shareDataService) {
        var vm = this;
        vm.customerInfoVM = {};
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
    }
})();