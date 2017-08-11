(function($) {
    'use strict';
    angular.module('BlurAdmin.pages.logistics')
        .controller('detailCtrl', detailCtrl);

    detailCtrl.$inject = ['$scope', '$rootScope', 'shareDataService'];

    function detailCtrl($scope, $rootScope, shareDataService) {
        var vm = this;
        vm.details = shareDataService.getList();
        vm.customerView = $rootScope.customerVM;
        vm.branchView = $rootScope.branchInfo;
        console.log(vm.details);
        $(function() {
            var $research = $('.research');
            $research.find('tr').not('.accordion').hide();
            //$research.find('tr').eq(0).show();
            $research.find('.accordion').click(function() {
                $research.find('.accordion').not(this).siblings().fadeOut("slow");
                $(this).siblings().fadeToggle("slow");
            });
        });

    }
})(jQuery);