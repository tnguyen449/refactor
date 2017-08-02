(function() {
    'use strict';

    angular.module('BlurAdmin.pages.logistics')
        .controller('bolInfoCtrl', ['$scope', 'toastr', bolInfoCtrl]);

    function bolInfoCtrl($scope, toastr) {
        var vm = this;
        vm.mytime = new Date(); //this variable is declared for storing a time in Giao Nhận Hẹn Giờ
        vm.ismeridian = true;
        vm.deliveryTypeVM = [];
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
            collectOnBehalfValue: 0,
            isDeclared: false,
            declaredValue: null,
            isSpecialPrice: false,
            specialPrice: null,
            extraFee: 0,
            statusId: 0,
            createdDate: vm.dateOptions.minDate,
            createdBy: "",
            deliveryType: 0,
            prepaid: "",
            liabilities: null
        };

        vm.merchandisesVM = [{
            //Init first empty row SmartTable
            id: 1,
            type: null,
            quantity: null,
            weight: null,
            isDeclaredValue: false,
            isGuarantee: false,
            isSpecialPrice: false,
            specialPrice: null,
            declareValue: null,
            description: null,
            total: 0,
            extraFee: 0,
            enabledDeclare: false
        }];

        $scope.$on('initData', function(event, obj) {
            vm.deliveryTypeVM = obj.data.deliveryTypeVM;

        });

        vm.addItem = function() {
            vm.inserted = {
                id: vm.merchandisesVM.length + 1,
                type: null,
                quantity: null,
                weight: null,
                isDeclaredValue: false,
                isGuarantee: false,
                isSpecialPrice: false,
                specialPrice: null,
                declareValue: null,
                description: null,
                total: 0,
                extraFee: 0,
                enabledDeclare: false
            };
            vm.merchandisesVM.push(vm.inserted);
        };

        //Calculate item individually
        vm.calculateItem = function(item) {
            vm.declareValue = convertToNumber(item.enabledDeclare && item.declareValue !== null ? item.declareValue : 1);
            vm.specialPrice = convertToNumber(item.specialPrice == null ? 1 : item.specialPrice);
            switch (item.type.Description) {
                case 'Phương Tiện':
                    item.total = item.type.Value + (parseFloat(vm.declareValue * 0.01)) + item.quantity;
                    break;
                case 'Hàng Đồng Giá':
                    item.total = item.type.Value;
                    break;
                case 'Hàng Hóa Đặc Biệt':
                    item.total = parseFloat(vm.declareValue * 0.01) + (vm.specialPrice * item.quantity);
                    break;
                default:
                    item.total = (parseFloat(vm.declareValue) * 0.01) + (item.type.Value * item.weight);
                    break;
            };
        };
        vm.additionalFee = null;

        //Calculate bol total before extra fee
        vm.calculateBolTotal = function() {
                vm.bolInfoVM.total = 0;
                if (vm.additionalFee !== null && typeof(vm.additionalFee) == 'string') {
                    vm.additionalFeeTemp = convertToNumber(vm.additionalFee);
                } else {
                    vm.additionalFeeTemp = vm.additionalFee;
                }
                vm.guaranteeValue = vm.merchandisesVM.isGuarantee ? 100000 : 0;
                angular.forEach(vm.merchandisesVM, function(item) {
                    vm.bolInfoVM.total += item.total;
                });

                vm.bolInfoVM.total += parseInt(vm.bolInfoVM.extraFee) + vm.guaranteeValue + vm.additionalFeeTemp;
                vm.calculateBolLiabilities();
                return vm.bolInfoVM.total;
            }
            //Calculate bol liabilities
        vm.calculateBolLiabilities = function() {
                if (vm.merchandisesVM.length == 0) {
                    vm.bolInfoVM.prepaid = 0;
                }
                vm.bolInfoVM.prepaidTemp = convertToNumber(vm.bolInfoVM.prepaid);
                if (vm.bolInfoVM.prepaidTemp > vm.bolInfoVM.total) {
                    vm.bolInfoVM.prepaid = 0;
                    vm.bolInfoVM.prepaidTemp = 0;
                }
                vm.bolInfoVM.liabilities = vm.bolInfoVM.total - vm.bolInfoVM.prepaidTemp;
            }
            //End

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

        $scope.$on('setValue', function(event, obj, serverTimeStampVM) {
            var front = obj.BolFromName.selected.BranchCode.trim();
            var end = obj.BolToName.selected.BranchCode.trim();
            var dateCode = serverTimeStampVM.substring(0, 5);
            var timeCode = serverTimeStampVM.substring(6, 11);
            vm.bolCode = front + "-" + dateCode + "-" + end + "-" + timeCode;
            return vm.bolCode;
        });

        // format datepicker
        $scope.open = open;
        $scope.opened = false;
        $scope.formats = ['dd/MM/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.options = {
            showWeeks: false
        };

        function open() {
            vm.sendDate = new Date(vm.bolInfoVM.createdDate.getFullYear(), vm.bolInfoVM.createdDate.getMonth(), vm.bolInfoVM.createdDate.getDate() + 1);
            vm.receivedDate = {
                minDate: new Date(vm.sendDate),
            };
            $scope.opened = true;
        }
        // end

        vm.calculateMinorFee = function(name) {
            for (var i = 0; i < vm.deliveryTypeVM.length; i++) {
                if (name == vm.deliveryTypeVM[i].Name) {
                    vm.additionalFee = vm.deliveryTypeVM[i].Value;
                }
            }
            return vm.additionalFee + "";
        }

        function convertToNumber(numberString) {
            numberString.toString();
            if (numberString == "" || numberString == null) {
                return 0;
            } else {
                return parseInt(numberString.replace(/,/g, ""));
            }
        };
    };

})();