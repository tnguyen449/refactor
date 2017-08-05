(function($) {
    'use strict';

    angular.module('BlurAdmin.pages.logistics')
        .controller('bolInfoCtrl', bolInfoCtrl);

    bolInfoCtrl.$inject = ['$scope', '$rootScope', 'toastr'];

    function bolInfoCtrl($scope, $rootScope, toastr) {
        var vm = this;
        vm.mytime = new Date(); //this variable is declared for storing a time in Giao Nhận Hẹn Giờ
        vm.ismeridian = true;
        vm.customerInfoVM = $rootScope.customerVM;
        vm.additionalFee = null;
        vm.isDiscount;
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
            deliveryType: null,
            prepaid: "",
            liabilities: null
        };

        console.log(vm.bolInfoVM);
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
            vm.declareValue = convertToNumber(item.enabledDeclare || item.declareValue !== null ? item.declareValue : 0);
            vm.specialPrice = convertToNumber(item.specialPrice == null || item.specialPrice == 0 ? 0 : item.specialPrice);
            switch (item.type.Description) {
                case 'Phương Tiện':
                    if (vm.specialPrice == 0) {
                        item.type.Value = item.type.Value;
                    } else {
                        item.type.Value = vm.specialPrice;
                    }
                    item.quantity = 1;
                    item.total = item.type.Value + (parseFloat(vm.declareValue * 0.01)) + item.quantity;
                    break;
                case 'Hàng Đồng Giá':
                    item.total = item.type.Value;
                    break;
                default:
                    if (vm.specialPrice == 0) {
                        item.type.Value = item.type.Value;
                    } else {
                        item.type.Value = vm.specialPrice;
                    }
                    item.total = (parseFloat(vm.declareValue) * 0.01) + (item.type.Value * parseFloat(item.weight));
                    break;
            };

            if (item.type.Description == 'Hàng Đồng Giá') {
                vm.merchandisesVM.quantity = 1;
                $("#addItem").attr('disabled', 'disabled');
                $("#removeItem").attr('disabled', 'disabled');
                $("#weight").attr('disabled', 'disabled');
                $("#isDeclareValue").attr('disabled', 'disabled');
                $("#isPredictableValue").attr('disabled', 'disabled');
                $("#quantity").attr('disabled', 'disabled');
            } else {
                $("#addItem").removeAttr('disabled');
                $("#removeItem").removeAttr('disabled');
                $("#weight").removeAttr('disabled');
                $("#isDeclareValue").removeAttr('disabled');
                $("#isPredictableValue").removeAttr('disabled');
                $("#quantity").removeAttr('disabled');
            }

        };

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
                if (vm.isDiscount == true) {
                    vm.bolInfoVM.total = 0;
                }
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
                if (vm.isDiscount == true) {
                    vm.bolInfoVM.liabilities = 0;
                }
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

        $scope.$on('bolCodeValue', function(event, obj, serverTimeStampVM) {
            var front = obj.BolFromName.selected.BranchCode.trim();
            var end = obj.BolToName.selected.BranchCode.trim();
            var dateCode = serverTimeStampVM.substring(0, 5);
            var timeCode = serverTimeStampVM.substring(6, 11);
            vm.bolCode = front + "-" + dateCode + "-" + end + "-" + timeCode;
            console.log(vm.bolCode);
            return vm.bolCode;
        });

        // format datepicker
        vm.opened = false;
        vm.formats = ['dd/MM/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        vm.format = vm.formats[0];
        vm.options = {
            showWeeks: false
        };
        vm.receivedDate = {
            minDate: new Date(vm.bolInfoVM.createdDate.getFullYear(), vm.bolInfoVM.createdDate.getMonth(), vm.bolInfoVM.createdDate.getDate() + 1)
        };
        vm.open = function open() {
            vm.opened = true;
        };
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
        vm.testing = "";
        $('#test').on('change', function() {
            alert(vm.isDiscount)

        })
    };

})(jQuery);