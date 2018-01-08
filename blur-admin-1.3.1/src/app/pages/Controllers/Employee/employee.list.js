(function() {
    'use strict';
    angular.module('BlurAdmin.pages.employee')
        .controller('EmployeeController', EmployeeController);
    EmployeeController.$inject = ['$scope', '$state', '$uibModal', '$uibModalStack', 'Url', 'utility', 'backendController'];

    function EmployeeController($scope, $state, $uibModal, $uibModalStack, Url, utility, backendController) {
        var vm = this;
        vm.employeeCreate = () => {
            $uibModal.open({
                templateUrl: "app/pages/Templates/Employee/employeeAdd.view.html",
                controller: 'EmployeeAddController',
                controllerAs: 'employeeCtrl'
            })
        }

        vm.getAllEmployee = () => {
            utility.getData(backendController.getAllEmployee).then((res) => {
                vm.employeeList = res;
            })
        }

        vm.deleteEmployee = (empId) => {
            utility.postData(backendController.deleteEmployee + '?EmpId=' + empId, empId).then((res) => {
                $state.reload();
            })
        }
    }
})();