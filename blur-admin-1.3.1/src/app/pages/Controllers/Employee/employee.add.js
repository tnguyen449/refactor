(function() {
    'use strict';
    angular.module('BlurAdmin.pages.employee')
        .controller('EmployeeAddController', EmployeeAddController);

    EmployeeAddController.$inject = ['$scope', '$state', '$uibModal', '$uibModalStack', 'Url', 'utility', 'backendController', 'formatDataService', 'toastr'];

    function EmployeeAddController($scope, $state, $uibModal, $uibModalStack, Url, utility, backendController, formatDataService, toastr) {
        var vm = this;
        vm.isNotNull = true;
        vm.cancel = () => {
            $uibModalStack.dismissAll();
        };


        vm.create = () => {
            if (typeof(vm.fullname) == 'undefined' || typeof(vm.password) == 'undefined') {
                vm.isNotNull = false;
            } else {
                vm.employee = {
                    fullname: vm.fullname,
                    password: vm.password,
                    dob: typeof(vm.dob) == 'undefined' ? 'Không khai báo' : formatDataService.convertDate(vm.dob),
                    address: typeof(vm.address) == 'undefined' ? 'Không khai báo' : vm.address,
                    phone: typeof(vm.phone) == 'undefined' ? 'Không khai báo' : vm.phone
                }
                utility.postData(backendController.addEmployee, vm.employee).then((res) => {
                    vm.isNotNull = true;
                    vm.cancel();
                    $state.go('employee', {}, { reload: true });
                    toastr.success('Tài khoản nhân viên ' + vm.employee.fullname + " được tạo thành công!", 'THÀNH CÔNG');
                })
            }
        }
    }
})();