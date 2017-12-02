(function($) {
    'use strict';

    angular.module('BlurAdmin.pages.merchandise')
        .controller('merchandiseAddCtrl', merchandiseAddCtrl);

    merchandiseAddCtrl.$inject = ['$scope', '$uibModal', '$uibModalStack', 'Url', 'backendController'];

    /** @ngInject */
    function merchandiseAddCtrl($scope, $uibModal, $uibModalStack, Url, backendController) {
        var vm = this;
        vm.cancel = function() {
            $uibModalStack.dismissAll();
        };
        vm.add = function() {
            $.ajax({
                    url: Url.hostDomain + backendController.addMerchandiseType,
                    method: "POST",
                    data: vm.merchandise
                })
                .done(function() {
                    vm.cancel();
                    $state.go('manage.merchandise', {}, { reload: true });
                    vm.branchList = utility.getData(backendController.getAllBranches).then(function(response) {
                        shareDataService.addInitData(response);
                    });
                    toastr.success('Mặt hàng đã được tạo thành công!');
                })
        }
    }
})(jQuery);