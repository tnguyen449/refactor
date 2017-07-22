(function() {
    'use strict';

    angular.module('BlurAdmin.pages.logistics')
        .controller('bolInfoCtrl', bolInfoCtrl);

    function bolInfoCtrl() {
        var vm = this;
        vm.dateOptions = {
            formatYear: 'yyyy',
            maxDate: new Date(2099, 12, 31),
            minDate: new Date(),
            startingDay: 1
        };
        vm.bolInfoVM = {
            bolFrom: 0,
            bolTo: 0,
            sender: 0,
            receiver: 0,
            isCollectOnBehalf: false,
            isCollectOnBehalfValue: 0,
            discount: 0,
            statusId: 0,
            total: null,
            createdDate: vm.dateOptions.minDate,
            createdBy: "",
            barcode: "",
            premium: "",
            description: "",
            deliveryType: 0,
            prepaid: null,
            liabilities: null
        };
        vm.merchandisesVM = [{
            //Init first empty row SmartTable
            id: 1,
            type: {
                name: null,
                calculationUnit: 0,
                value: 0
            },
            quantity: null,
            amount: null,
            isDeclaredValue: false,
            isBreakable: false,
            isSpecialPrice: false,
            declareValue: null,
            specialPrice: null,
            description: null,
            total: 0,
            //end init
            //init checkbox properties for each row
            isDeclareDisabled: true,
            isSpecialDisabled: true
                //end init
        }];
        vm.addItem = function() {
            vm.inserted = {
                id: vm.merchandisesVM.length + 1,
                type: null,
                quantity: null,
                amount: null,
                isDeclaredValue: false,
                isBreakable: false,
                isSpecialPrice: false,
                declareValue: null,
                specialPrice: null,
                description: null,
                total: null,
                isDeclareDisabled: true,
                isSpecialDisabled: true
            };
            vm.merchandisesVM.push(vm.inserted);
        };
        //Remove items that are checked in checkbox.
        vm.removeItem = function() {
            var newProductList = [];
            vm.selectedAll = false;
            angular.forEach(vm.merchandisesVM, function(product) {
                if (!product.selected) {
                    newProductList.push(product);
                };
            });
            vm.merchandisesVM = newProductList;
        };
        //Select all items in checkbox
        vm.selectAll = function() {
            if (!vm.selectedAll) {
                vm.selectedAll = false;
            } else {
                vm.selectedAll = true;
            };
            angular.forEach(vm.merchandisesVM, function(product) {
                product.selected = vm.selectedAll;
            });
        };

        function createOrderCode() {
            var fromBranchCode = vm.bolInfoVM.bolFrom.BranchCode;
            var toBranchCode = vm.bolInfoVM.bolTo.BranchCode;
            var dateCode = vm.dateOptions.minDate.getDate().toString() + vm.dateOptions.minDate.getMonth().toString() + vm.dateOptions.minDate.getFullYear().toString().substring(2);
            var timeCode = vm.dateOptions.minDate.getHours().toString() + vm.dateOptions.minDate.getMinutes().toString() + vm.dateOptions.minDate.getSeconds().toString();
            return "SQ1" + dateCode + "CR" + timeCode;
        }
        vm.dateCode = createOrderCode();

    }
})();