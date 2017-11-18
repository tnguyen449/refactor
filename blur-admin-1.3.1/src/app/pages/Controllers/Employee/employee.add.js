(function() {
    'use strict';
    angular.module('BlurAdmin.pages.employee')
        .controller('EmployeeAddController', EmployeeAddController);

    EmployeeAddController.$inject = ['$scope', '$uibModal', '$uibModalStack'];

    function EmployeeAddController($scope, $uibModal, $uibModalStack) {
        var vm = this;
        vm.employeeCreate = () => {
            $uibModal.open({
                templateUrl: "app/pages/Templates/Employee/employeeAdd.view.html",
                // controller: 'employeeAddCtrl',
                // controllerAs: 'employeeAddCtrl'
            })
        }
    }
})();