(function() {
    'use strict';
    angular.module('BlurAdmin.pages.employee')
        .controller('EmployeeController', EmployeeController);
    EmployeeController.$inject = ['$scope', '$uibModal', '$uibModalStack'];

    function EmployeeController($scope, $uibModal, $uibModalStack) {
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