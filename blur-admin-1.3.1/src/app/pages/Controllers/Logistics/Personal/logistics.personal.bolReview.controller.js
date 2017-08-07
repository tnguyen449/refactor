(function($) {
    'use strict';

    angular.module('BlurAdmin.pages.logistics')
        .controller('bolReviewCtrl', bolReviewCtrl);

    bolReviewCtrl.$inject = ['$scope', '$rootScope'];

    function bolReviewCtrl($scope, $rootScope) {
        var vm = this;
        vm.transactionVM = $rootScope.transactionVM;
        $scope.$on('initData', function(evt, obj) {
            vm.deliveryType = obj.data.deliveryTypeVM;
            vm.merchandiseType = obj.data.merchandiseTypeVM;
            // console.log(vm.merchandiseType);
            // console.log(vm.transactionVM);
        });
    };

})(jQuery);