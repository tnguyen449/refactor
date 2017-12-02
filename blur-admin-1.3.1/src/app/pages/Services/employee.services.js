(function() {
    'use strict';
    angular.module('BlurAdmin.pages.employee')
        .factory('EmployeeServices', EmployeeServices);

    EmployeeServices.$inject = ['$http', '$scope', 'backendController', 'Url']

    function EmployeeServices($http, $scope, backendController, Url) {

        return {
            getAllEmployee: getAllEmployee,
            addEmployee: addEmployee,
            deleteEmployee: deleteEmployee,
            updateEmployee: updateEmployee
        }


        function getAllEmployee() {
            var employeeList = [];
            $http.get(Url.hostDomain + backendController.getAllEmployee).then(
                function(response) {
                    employeeList = response.data;
                    return employeeList;
                })
        }

        function addEmployee(employee) {
            $http.post(Url.hostDomain + backendController.addEmployee, employee).then(
                function(response) {

                })
        }

        function deleteEmployee(id) {
            $http.post(Url.hostDomain + backendController.deleteEmployee, id).then(
                function(response) {

                })
        }

        function updateEmployee(id) {
            $http.post(Url.hostDomain + backendController.updateEmployee, id).then(
                function(response) {

                })
        }
        // function getEmployeeById(id){

        // }
    }
})();