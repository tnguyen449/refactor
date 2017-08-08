(function($) {
    'use strict';

    angular.module('BlurAdmin.pages.logistics')
        .controller('bolInfoCtrl', bolInfoCtrl);

    bolInfoCtrl.$inject = ['$scope', '$rootScope', '$http', '$state', 'toastr'];

    function bolInfoCtrl($scope, $rootScope, $http, $state, toastr) {
        var vm = this;
        vm.mytime = new Date(); //this variable is declared for storing a time in Giao Nhận Hẹn Giờ
        vm.ismeridian = true;
        vm.customerInfoVM = $rootScope.customerVM;
        vm.additionalFee = null;
        vm.isDiscount;
        vm.bolCode;
        vm.deliveryTypeVM = [];
        $rootScope.delivery = vm.deliveryTypeVM;
        vm.dateOptions = {
            formatYear: 'yyyy',
            maxDate: new Date(2099, 12, 31),
            minDate: new Date(),
            startingDay: 1
        };
        vm.receiveDate = {
            minDate: new Date(vm.dateOptions.minDate.getFullYear(), vm.dateOptions.minDate.getMonth(), vm.dateOptions.minDate.getDate() + 1)
        };
        vm.test = new Date();
        vm.change = function() {
            vm.test.setHours(vm.mytime.getHours());
            vm.test.setMinutes(vm.mytime.getMinutes());
        };
        vm.bolInfoVM = {
            bolCode: "",
            sendDate: vm.dateOptions.minDate,
            receiveDate: vm.receiveDate.minDate,
            isGuarantee: false,
            isDiscount: false,
            collectInBehalf: "",
            sendAddress: "",
            receiveTime: vm.test,
            deliveryType: "",
            additionalFee: "",
            total: 0,
            prepaid: "",
            liabilities: 0,
            statusCode: 0
        };
        vm.merchandisesVM =
            //Init first empty row SmartTable
            [{
                id: 1,
                merchandiseType: null,
                quantity: "",
                weight: "",
                isDeclared: false,
                declareValue: "",
                specialPrice: "",
                description: "",
                subTotal: 0
            }];

        $scope.$on('initData', function(event, obj) {
            vm.deliveryTypeVM = obj.data.deliveryTypeVM;
            return vm.deliveryTypeVM;
        });

        vm.addItem = function() {
            vm.inserted = {
                id: vm.merchandisesVM.length + 1,
                merchandiseType: null,
                quantity: "",
                weight: "",
                isDeclared: false,
                declareValue: "",
                specialPrice: "",
                description: "",
                subTotal: 0
            };
            vm.merchandisesVM.push(vm.inserted);
        };


        //Calculate item individually
        vm.calculateItem = function(item) {
            vm.declareValue = convertToNumber(item.isDeclared || item.declareValue !== null ? item.declareValue : 0);
            vm.specialPrice = convertToNumber(item.specialPrice == null || item.specialPrice == 0 ? 0 : item.specialPrice);
            switch (item.merchandiseType.Description) {
                case 'Phương Tiện':
                    if (vm.specialPrice == 0) {
                        item.subTotal = item.merchandiseType.Value + (parseFloat(vm.declareValue * 0.01));
                    } else {
                        item.subTotal = vm.specialPrice + (parseFloat(vm.declareValue * 0.01));
                    }

                    break;
                case 'Hàng Đồng Giá':

                    item.subTotal = item.merchandiseType.Value;
                    break;
                default:
                    if (vm.specialPrice == 0) {
                        item.merchandiseType.Value = item.merchandiseType.Value;
                    } else {
                        item.merchandiseType.Value = vm.specialPrice;
                    }
                    item.subTotal = (parseFloat(vm.declareValue) * 0.01) + (item.merchandiseType.Value * parseFloat(item.weight));
                    break;
            };

            if (item.merchandiseType.Description == 'Hàng Đồng Giá') {
                $("#addItem").attr('disabled', 'disabled');
                $("#removeItem").attr('disabled', 'disabled');
                $("#weight").attr('disabled', 'disabled');
                $("#isDeclareValue").attr('disabled', 'disabled');
                $("#isPredictableValue").attr('disabled', 'disabled');
                $("#quantity").attr('disabled', 'disabled');
            } else if (item.merchandiseType.Description == 'Phương Tiện') {
                $("#isDeclareValue").attr('disabled', 'disabled');
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
                vm.guaranteeValue = vm.bolInfoVM.isGuarantee ? 100000 : 0;
                angular.forEach(vm.merchandisesVM, function(item) {
                    vm.bolInfoVM.total += item.subTotal;
                });
                vm.bolInfoVM.total += vm.guaranteeValue + vm.additionalFeeTemp;
                vm.calculateBolLiabilities();
                if (vm.bolInfoVM.isDiscount == true) {
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
                if (vm.bolInfoVM.isDiscount == true) {
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

        $scope.$on('bolCodeValue', function(event, obj) {
            var end = obj.BolToName.selected.BranchCode.trim();
            var front = obj.BolFromName.selected.BranchCode.trim();
            var dateCode = $rootScope.serverTimeStampVM.substring(0, 6);
            var timeCode = $rootScope.serverTimeStampVM.substring(6, 12);
            vm.bolInfoVM.bolCode = front + "-" + dateCode + "-" + end + "-" + timeCode;
            return vm.bolInfoVM.bolCode;
        });

        // format datepicker
        vm.opened = false;
        vm.formats = ['dd/MM/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        vm.format = vm.formats[0];
        vm.options = {
            showWeeks: false
        };
        vm.receivedDate = {
            minDate: new Date(vm.bolInfoVM.sendDate.getFullYear(), vm.bolInfoVM.sendDate.getMonth(), vm.bolInfoVM.sendDate.getDate() + 1)
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

        /*create Post Data*/
        // $rootScope.transactionVM = {
        //     TransactionVM: {
        //         CustomerInfo: vm.customerInfoVM,
        //         MerchandiseInfo: vm.merchandisesVM,
        //         BillOfLandingInfo: vm.bolInfoVM
        //     }
        // };

        vm.post = function() {
            console.log(vm.customerInfoVM.BolFromName.selected.Id);
            console.log(vm.merchandisesVM);
            $rootScope.transactionVM = {
                TransactionVM: {
                    CustomerInfo: {
                        senderName: vm.customerInfoVM.senderName,
                        senderPhone: vm.customerInfoVM.senderPhone,
                        BolFromId: vm.customerInfoVM.BolFromName.selected.Id,
                        receiverName: vm.customerInfoVM.receiverName,
                        senderPhone: vm.customerInfoVM.receiverPhone,
                        BolToId: vm.customerInfoVM.BolToName.selected.Id
                    },
                    MerchandiseInfo: [{
                        id: vm.merchandisesVM.id,
                        merchandiseTypeId: vm.merchandisesVM,
                        isDeclared: vm.merchandisesVM.isDeclared,
                        declareValue: vm.merchandisesVM.declareValue == "" ? 0 : convertToNumber(vm.merchandisesVM.declareValue),
                        specialPrice: vm.merchandisesVM.specialPrice == "" ? 0 : convertToNumber(vm.merchandisesVM.specialPrice),
                        quantity: vm.merchandisesVM.quantity == "" ? 0 : convertToNumber(vm.merchandisesVM.quantity),
                        weight: vm.merchandisesVM.weight == "" ? 0 : convertToNumber(vm.merchandisesVM.weight),
                        subTotal: vm.merchandisesVM.subTotal,
                        description: vm.merchandisesVM.description
                    }],
                    BillOfLandingInfo: vm.bolInfoVM
                }
            };

            console.log($rootScope.transactionVM);
            // $.ajax({
            //         method: "POST",
            //         url: "http://localhost:57363/NgocTrang/Api/Bol/Add",
            //         data: vm.transactionVM.TransactionVM
            //     })
            //     .done(function() {
            //         toastr.success('Đơn vận đã được tạo thành công!', 'Thành Công');
            //         vm.print = printInvoice(divName);
            //     })

            // $http.post('http://localhost:57363/NgocTrang/Api/Bol/Add', vm.transactionVM).then(function(res) {
            //     alert("POST SUCCESS");
            // }, function(err) {
            //     alert("POST FAILED");
            // });
        };
        /** End post data */

        /**Print area function */
        function printInvoice(divName) {
            var printContent = document.getElementById(divName).innerHTML;
            var originalContent = document.body.innerHTML;
            document.body.innerHTML = printContent;
            window.print();
            document.body.innerHTML = originalContent;
        }
        /**End print area */
    };

})(jQuery);