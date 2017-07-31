(function() {
    'use strict';

    angular.module('BlurAdmin.pages.logistics')
        .controller('bolInfoCtrl', ['$scope', '$rootScope', bolInfoCtrl]);

    function bolInfoCtrl($scope, $rootScope) {
        var vm = this;
        vm.mytime = new Date(); //this variable is declared for storing a time in Giao Nhận Hẹn Giờ
        vm.ismeridian = true;
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
            specialPrice: 0,
            extraFee: 0,
            statusId: 0,
            createdDate: vm.dateOptions.minDate,
            createdBy: "",
            deliveryType: 0,
            prepaid: "",
            liabilities: null
        };

        vm.test = '';

        vm.merchandisesVM = [{
            //Init first empty row SmartTable
            id: 1,
            type: null,
            quantity: null,
            amount: null,
            isDeclaredValue: false,
            isGuarantee: false,
            isSpecialPrice: false,
            declareValue: "",
            description: null,
            total: 0,
            extraFee: 0,
            isDeclareDisabled: true,
            isSpecialDisabled: true
        }];
        vm.deliveryTypeVM = [];
        $scope.$on('initData', function(event, obj) {
            vm.deliveryTypeVM = obj.data.deliveryTypeVM;

        });

        vm.addItem = function() {
            vm.inserted = {
                id: vm.merchandisesVM.length + 1,
                type: null,
                quantity: null,
                amount: null,
                isDeclaredValue: false,
                isGuarantee: false,
                isSpecialPrice: false,
                declareValue: "",
                description: null,
                total: 0,
                extraFee: 0,
                isDeclareDisabled: true,
                isSpecialDisabled: true
            };
            vm.merchandisesVM.push(vm.inserted);
        };

        //Calculate item individually
        vm.calculateItem = function(item) {
            vm.declareValue = parseInt(item.declareValue.replace(/,/g, ""));
            if (item.type.Description == 'Phương Tiện') {
                item.total = item.type.Value + ((parseFloat((item.enabledDeclare && vm.declareValue !== "" ? vm.declareValue : 0)) * parseFloat(1) / 100));
            } else if (item.type.Description == 'Hàng Đồng Giá') {
                item.total = item.type.Value;
            } else {
                item.total = ((parseFloat((item.enabledDeclare && vm.declareValue !== "" ? vm.declareValue : 0)) * parseFloat(1) / 100)) + (item.type.Value * item.quantity) + parseInt((item.specialPrice == null ? 0 : item.specialPrice)); // + parseInt(item.declaredValue) + parseInt(item.extraFee)
            }

            vm.calculateBolTotal();
        };
        vm.additionalFee = 0;
        vm.additionalFee = vm.additionalFee.toLocaleString();
        // vm.temp = 0;
        //Calculate bol total before extra fee
        vm.calculateBolTotal = function() {

                if (vm.additionalFee !== undefined && typeof(vm.additionalFee) == 'string') {
                    vm.additionalFeeTemp = parseInt(vm.additionalFee.replace(/,/g, ""));
                } else {
                    vm.additionalFeeTemp = vm.additionalFee;
                }
                vm.bolInfoVM.total = 0;
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
                vm.bolInfoVM.prepaidTemp = parseInt(vm.bolInfoVM.prepaid.replace(/,/g, ""));
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

        $scope.$on('setValue', function(event, obj) {
            console.log(obj);
            var front = obj.BolFromName.selected.BranchCode;
            var end = obj.BolToName.selected.BranchCode;
            var dateCode = $rootScope.serverTimeStampVM.substring(0, 5);
            var timeCode = $rootScope.serverTimeStampVM.substring(6, 11);
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
    };

})();