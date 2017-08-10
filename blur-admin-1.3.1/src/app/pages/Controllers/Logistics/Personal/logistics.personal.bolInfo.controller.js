(function($) {
    'use strict';

    angular.module('BlurAdmin.pages.logistics')
        .controller('bolInfoCtrl', bolInfoCtrl);

    bolInfoCtrl.$inject = ['$scope', '$rootScope', '$http', '$state', 'toastr', 'shareDataService'];

    function bolInfoCtrl($scope, $rootScope, $http, $state, toastr, shareDataService) {
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
                quantity: "1",
                weight: "1",
                isDeclared: false,
                declareValue: "",
                specialPrice: "",
                description: "",
                subTotal: 0
            }];
        // console.log(vm.merchandisesVM);
        $scope.$on('initData', function(event, obj) {
            vm.deliveryTypeVM = obj.data.deliveryTypeVM;
            return vm.deliveryTypeVM;
        });

        vm.addItem = function() {
            vm.inserted = {
                id: vm.merchandisesVM.length + 1,
                merchandiseType: null,
                quantity: "1",
                weight: "1",
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
                $(".addItem").attr('disabled', 'disabled');
                $(".removeItem").attr('disabled', 'disabled');
                $(".weight").attr('disabled', 'disabled');
                $(".isDeclareValue").attr('disabled', 'disabled');
                $(".isPredictableValue").attr('disabled', 'disabled');
                $(".quantity").attr('disabled', 'disabled');
            }
            // else if (item.merchandiseType.Description == 'Phương Tiện') {
            //     $(".isDeclareValue").attr('disabled', 'disabled');
            //     $(".addItem").removeAttr('disabled');
            //     $(".removeItem").removeAttr('disabled');
            //     $(".isPredictableValue").removeAttr('disabled');
            //     $(".weight").attr('disabled', 'disabled');
            //     $(".quantity").attr('disabled', 'disabled');
            // }
            else {
                $(".addItem").removeAttr('disabled');
                $(".removeItem").removeAttr('disabled');
                $(".weight").removeAttr('disabled');
                $(".isDeclareValue").removeAttr('disabled');
                $(".isPredictableValue").removeAttr('disabled');
                $(".quantity").removeAttr('disabled');
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
            };
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
            $scope.$emit('bolNameValue', obj);
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

        vm.calculateMinorFee = function(id) {
            for (var i = 0; i < vm.deliveryTypeVM.length; i++) {
                if (id == vm.deliveryTypeVM[i].Id) {
                    vm.additionalFee = vm.deliveryTypeVM[i].Value;
                }
            }
            vm.additionalFee = vm.additionalFee.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            return vm.additionalFee;
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

        $rootScope.post = function() {
            vm.merchandiseList = [];
            angular.forEach(vm.merchandisesVM, function(merchandise) {
                vm.merchandisesRefactor = {
                    Id: merchandise.id,
                    MerchandiseTypeId: merchandise.merchandiseType === null ? "" : merchandise.merchandiseType.Id,
                    IsDeclared: merchandise.isDeclared,
                    DeclareValue: merchandise.declareValue == "" || merchandise.declareValue == null ? 0 : convertToNumber(merchandise.declareValue),
                    SpecialPrice: merchandise.specialPrice == "" || merchandise.specialPrice == null ? 0 : convertToNumber(merchandise.specialPrice),
                    Quantity: merchandise.quantity == "" || merchandise.quantity == null ? 0 : merchandise.quantity,
                    Weight: merchandise.weight == "" || merchandise.weight == null ? 0 : merchandise.weight,
                    SubTotal: merchandise.subTotal,
                    Description: merchandise.description
                }
                vm.merchandiseList.push(vm.merchandisesRefactor);
            });

            $rootScope.transactionVM = {
                TransactionVM: {
                    CustomerInfo: {
                        SenderName: vm.customerInfoVM.senderName,
                        SenderPhone: vm.customerInfoVM.senderPhone,
                        BolFromId: vm.customerInfoVM.BolFromName.selected.Id,
                        ReceiverName: vm.customerInfoVM.receiverName,
                        ReceiverPhone: vm.customerInfoVM.receiverPhone,
                        BolToId: vm.customerInfoVM.BolToName.selected.Id
                    },
                    MerchandiseInfo: vm.merchandiseList,
                    BillOfLandingInfo: {
                        BolCode: vm.bolInfoVM.bolCode,
                        SendDate: vm.bolInfoVM.sendDate.toLocaleDateString('en-GB'),
                        ReceiveDate: vm.bolInfoVM.receiveDate.toLocaleDateString('en-GB'),
                        IsGuarantee: vm.bolInfoVM.isGuarantee,
                        IsDiscount: vm.bolInfoVM.isDiscount,
                        CollectInBehalf: vm.bolInfoVM.collectInBehalf,
                        SendAddress: vm.bolInfoVM.sendAddress,
                        ReceiveTime: vm.bolInfoVM.deliveryType.Id == 2 ? vm.bolInfoVM.receiveTime.toLocaleTimeString('en-GB') : "",
                        DeliveryType: vm.bolInfoVM.deliveryType,
                        AdditionalFee: vm.bolInfoVM.additionalFee,
                        Total: vm.bolInfoVM.total,
                        Prepaid: vm.bolInfoVM.prepaid,
                        Liabilities: vm.bolInfoVM.liabilities,
                        StatusCode: vm.bolInfoVM.statusCode
                    }
                }
            };
            console.log($rootScope.transactionVM);
            if (($rootScope.transactionVM.TransactionVM.BillOfLandingInfo.IsDiscount == false || $rootScope.transactionVM.TransactionVM.BillOfLandingInfo.IsDiscount == true) && $rootScope.transactionVM.TransactionVM.MerchandiseInfo[0].MerchandiseTypeId == "") {
                toastr.error('Đơn vận không tồn tại hàng hóa! Vui lòng thêm hàng hóa', 'Thất Bại');
            } else {
                $state.go('logistics', {}, { reload: 'logistics' });
                shareDataService.addItem($rootScope.transactionVM);
                toastr.success('Đơn vận đã được tạo thành công!');
            }

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
    };

})(jQuery);