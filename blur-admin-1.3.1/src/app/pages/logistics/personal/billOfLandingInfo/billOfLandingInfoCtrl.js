(function() {
    'use strict';

    angular.module('BlurAdmin.pages.logistics')
        .controller('bolInfoCtrl', ['$scope', '$rootScope', bolInfoCtrl]);

    function bolInfoCtrl($scope, $rootScope) {
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
            total: 0,
            extraFee: 0,
            createdDate: vm.dateOptions.minDate,
            createdBy: "",
            barcode: "",
            premium: "",
            description: "",
            deliveryType: 0,
            prepaid: null,
            liabilities: null
        };
        vm.test = '';

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

        vm.deliveryTypeVM = [{
                Name: 'Nhận Tại VP'
            },
            {
                Name: 'Giao Nhận Tận Nơi'
            },
            {
                Name: 'Đồng Giá'
            },
            {
                Name: 'Giao Nhận Hẹn Giờ'
            }
        ];

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
                total: 0,
                extraFee: 0,
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

        //Calculate item individually
        vm.calculateItem = function(item) {
            item.total = item.type.Value * item.quantity;
            vm.calculateBolTotal();
        };
        //Calculate bol total before extra fee
        vm.calculateBolTotal = function() {
                vm.bolInfoVM.total = 0;
                angular.forEach(vm.merchandisesVM, function(item) {
                    vm.bolInfoVM.total = vm.bolInfoVM.total + item.total;
                });
                vm.bolInfoVM.total = vm.bolInfoVM.total + parseInt(vm.bolInfoVM.extraFee);
                vm.calculateBolLiabilities();
            }
            //Calculate bol liabilities
        vm.calculateBolLiabilities = function() {
                vm.bolInfoVM.liabilities = vm.bolInfoVM.total - vm.bolInfoVM.prepaid;
            }
            //End

        $scope.$on('setValue', function(event, obj) {
            console.log(event);
            var front = obj.BolFromName.selected.BranchCode;
            var end = obj.BolToName.selected.BranchCode;
            // var dateCode = $rootScope.serverTimeStampVM.getDate().toString() + $rootScope.serverTimeStampVM.getMonth().toString() + $rootScope.serverTimeStampVM.getFullYear().toString().substring(2);
            // var timeCode = $rootScope.serverTimeStampVM.getHours().toString() + $rootScope.serverTimeStampVM.getMinutes().toString() + $rootScope.serverTimeStampVM.getSeconds().toString();
            vm.test = front + $rootScope.serverTimeStampVM + end;
            return vm.test;
        });

    }
})();