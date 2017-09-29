(function($) {
    'use strict';

    angular.module('BlurAdmin.pages.logistics')
        .controller('BolInfoController', BolInfoController);

    BolInfoController.$inject = ['$scope', '$rootScope', '$uibModal', 'shareDataService', 'businessService', 'formatDataService', 'toastr', 'Url', 'businessConst']

    /** @ngInject */
    function BolInfoController($scope, $rootScope, $uibModal, shareDataService, businessService, formatDataService, toastr, Url, businessConst) {
        var vm = this;

        /** init data and create object */
        var initDataList = shareDataService.getInitData();
        vm.branchInfo = shareDataService.getBranchCode();
        vm.bolCode = shareDataService.getBolCode();
        vm.sendDate = new Date();
        vm.isGuarantee = false;
        vm.isDeclare = false;
        vm.isOnHandDelivery = false;
        vm.declareFee;
        vm.merchandiseTypeVM = initDataList[0].data.merchandiseTypeVM;
        vm.merchandiseType = {};
        vm.deliveryTypeVM = initDataList[0].data.deliveryTypeVM;
        vm.calculateMinorFee = function(id) {
                for (var i = 0; i < vm.deliveryTypeVM.length; i++) {
                    if (id == vm.deliveryTypeVM[i].Id) {
                        vm.deliveryPrice = vm.deliveryTypeVM[i].Value;
                        vm.deliveryName = vm.deliveryTypeVM[i].Name;
                    }
                }
                vm.deliveryPrice = formatDataService.formatCurrency(vm.deliveryPrice);
                return vm.deliveryPrice;
            }
            /** end */

        /** setup datetime */
        vm.receivedTime = new Date();
        vm.ismeridian = true;
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
            vm.test.setHours(vm.receivedTime.getHours());
            vm.test.setMinutes(vm.receivedTime.getMinutes());
        };
        /** end */

        /** setup datepicker */
        vm.opened = false;
        vm.format = 'dd/MM/yyyy';
        vm.options = {
            showWeeks: false
        };
        vm.bindingDate = {
            minDate: new Date(vm.sendDate.getFullYear(), vm.sendDate.getMonth(), vm.sendDate.getDate() + 1)
        };
        vm.receivedDate = vm.receiveDate.minDate;
        vm.open = function() {
            vm.opened = true;
        };
        /** end */

        /** input process */

        /** function binding calculated declared fee
         *  @input mainDeclarePrice
         *  @output declareFee with currency format */
        vm.bindingDeclareValue = function(mainDeclarePrice) {
            if (vm.isDeclare == true) {
                vm.declareFee = businessService.calculateDeclareFee(mainDeclarePrice);
            } else {
                vm.declareFee = "";
                vm.declaredPrice = "";
            }
            return vm.declareFee;
        };

        vm.selectSamePrice = function(merchandiseType) {
            if (merchandiseType.Description === 'Hàng Đồng Giá') {
                vm.subTotal = '30,000';
                vm.quantity = 1;
                $('#mainPrice').attr('disabled', 'disabled');
            } else {
                vm.subTotal = "";
                $('#mainPrice').removeAttr('disabled');
            }
            return vm.subTotal;
        };

        vm.bindingFinalTotal = function() {
            var subTotal = vm.subTotal;
            var declareFee = vm.declareFee == "" ? '0' : vm.declareFee;
            var onHandFee = vm.isOnHandDelivery == false ? '0' : businessConst.StrOnHandFee;
            var guaranteeFee = vm.isGuarantee == false ? '0' : businessConst.StrGuaranteeFee;
            var deliveryPrice = vm.deliveryPrice;
            var discount = vm.discount == "" ? '0' : vm.discount;
            // vm.finalTotal = (subTotal + declareFee + onHandFee + guaranteeFee + deliveryPrice).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            vm.finalTotal = businessService.calculateTotal(subTotal, declareFee, deliveryPrice, discount, onHandFee, guaranteeFee);
            return vm.finalTotal;
        };
        vm.bindingLiabilities = function() {
                var finalTotal = vm.finalTotal;
                var prepaid = vm.prepaid == "" ? "0" : vm.prepaid;
                if (formatDataService.convertToNumber(prepaid) > formatDataService.convertToNumber(finalTotal)) {
                    toastr.info('Số tiền trả trước phải ít hơn hoặc bằng tổng cước', 'THÔNG BÁO')
                    vm.bindingFinalTotal();
                    vm.prepaid = "";
                } else {
                    vm.finalLiabilities = businessService.calculateLiabilities(finalTotal, prepaid);
                }
                return vm.finalLiabilities;
            }
            /** end */

        /** controller function */

        vm.post = function(id) {
                vm.calculateMinorFee(id);
                //  if (($rootScope.transactionVM.TransactionVM.BillOfLandingInfo.IsDiscount == false || $rootScope.transactionVM.TransactionVM.BillOfLandingInfo.IsDiscount == true) && $rootScope.transactionVM.TransactionVM.MerchandiseInfo[0].MerchandiseTypeId == "") {
                //     toastr.error('Đơn vận không tồn tại hàng hóa! Vui lòng thêm hàng hóa', 'Thất Bại');
                // } else {
                /** binding object */
                vm.bolInfo = {
                        senderName: vm.customerInfo.senderName === undefined ? "" : vm.customerInfo.senderName,
                        senderPhone: vm.customerInfo.senderPhone === undefined ? "" : vm.customerInfo.senderPhone,
                        receiverName: vm.customerInfo.receiverName === undefined ? "" : vm.customerInfo.receiverName,
                        receiverPhone: vm.customerInfo.receiverPhone === undefined ? "" : vm.customerInfo.receiverPhone,
                        merchandiseId: vm.merchandiseType.selected.Id === undefined ? "" : vm.merchandiseType.selected.Id,
                        merchandiseName: vm.merchandiseType.selected.MerchandiseType1,
                        bolCode: vm.bolCode === undefined ? "" : vm.bolCode,
                        sendDate: vm.dateOptions.minDate === undefined ? "" : vm.dateOptions.minDate,
                        receiveDate: vm.receivedDate === undefined ? "" : vm.receivedDate,
                        isGuarantee: vm.isGuarantee,
                        isDeclare: vm.isDeclare,
                        isOnHand: vm.isOnHandDelivery,
                        mixedValue: vm.mixedValue === undefined ? "" : vm.mixedValue,
                        quantity: vm.quantity === undefined ? "" : vm.quantity,
                        weight: vm.weight === undefined ? "" : vm.weight,
                        collectInBehalf: vm.collectInBehalf === undefined ? "" : vm.collectInBehalf,
                        sendAddress: vm.sendAddress === undefined ? "" : vm.sendAddress,
                        receivedTime: vm.deliveryType.Id == 2 ? vm.receivedTime : "",
                        discount: vm.discount === undefined ? '0' : vm.discount,
                        //delivery key-value
                        deliveryTypeId: vm.deliveryType.Id === undefined ? "" : vm.deliveryType.Id,
                        deliveryTypeName: vm.deliveryName,
                        deliveryPrice: vm.deliveryPrice,
                        //end delivery key-value
                        //status key-value
                        statusCodeId: 6,
                        statusCodeName: "Chờ xác nhận",
                        //end status key-value
                        subTotal: vm.subTotal,
                        declaredPrice: vm.declaredPrice === undefined ? '0' : vm.declaredPrice,
                        additionalFee: vm.additionalFee === undefined ? '0' : vm.additionalFee,
                        prepaid: vm.prepaid === undefined ? '0' : vm.prepaid,
                        bolFromId: vm.branchInfo.sentBranchCode.selected.Id,
                        bolFromName: vm.branchInfo.sentBranchCode.selected.Name,
                        bolToId: vm.branchInfo.receivedBranchCode.selected.Id,
                        bolToName: vm.branchInfo.receivedBranchCode.selected.Name,
                        description: vm.description,
                        total: vm.finalTotal

                    }
                    /** end */

                /** data post */
                vm.transactionVM = {
                    TransactionVM: {
                        CustomerInfo: {
                            SenderName: vm.bolInfo.senderName,
                            SenderPhone: "0" + vm.bolInfo.senderPhone.toString(),
                            ReceiverName: vm.bolInfo.receiverName,
                            ReceiverPhone: "0" + vm.bolInfo.receiverPhone.toString(),
                        },
                        BillOfLandingInfo: {
                            BolCode: vm.bolInfo.bolCode,
                            SendDate: vm.bolInfo.sendDate.toLocaleDateString('en-GB'),
                            ReceiveDate: vm.bolInfo.receiveDate.toLocaleDateString('en-GB'),
                            IsGuarantee: vm.bolInfo.isGuarantee,
                            IsDeclare: vm.bolInfo.isDeclare,
                            IsOnHand: vm.bolInfo.isOnHand,
                            CollectInBehalf: vm.bolInfo.collectInBehalf,
                            SendAddress: vm.bolInfo.sendAddress,
                            ReceiveTime: vm.receivedTime.toLocaleTimeString('en-GB'),
                            DeliveryType: vm.bolInfo.deliveryTypeId,
                            DeliveryName: vm.bolInfo.deliveryTypeName,
                            DeliveryPrice: vm.bolInfo.deliveryPrice,
                            DeclareValue: vm.bolInfo.declaredPrice,
                            AdditionalFee: vm.bolInfo.additionalFee,
                            SubTotal: vm.bolInfo.subTotal,
                            Total: vm.bolInfo.total,
                            Prepaid: vm.bolInfo.prepaid,
                            Quantity: vm.bolInfo.quantity,
                            Weight: vm.bolInfo.weight,
                            Liabilities: vm.finalLiabilities,
                            StatusCode: vm.bolInfo.statusCodeId,
                            StatusName: vm.bolInfo.statusCodeName,
                            BolFromId: vm.bolInfo.bolFromId,
                            BolToId: vm.bolInfo.bolToId,
                            BolFromName: vm.bolInfo.bolFromName,
                            BolToName: vm.bolInfo.bolToName,
                            MerchandiseTypeId: vm.bolInfo.merchandiseId,
                            MerchandiseName: vm.bolInfo.merchandiseName,
                            Description: vm.description
                        }
                    }
                };
                /** end */
                shareDataService.addItem(vm.transactionVM);
                if (window.innerWidth < 768 && window.innerHeight < 768) {
                    alert('Completed');
                } else {
                    $uibModal.open({
                        animation: true,
                        templateUrl: 'app/pages/components/notifications/confirm.component.html',
                        size: 'lg',
                        controller: 'bolReviewCtrl',
                        controllerAs: 'bolConfirm'
                    });
                }
                console.log(vm.transactionVM);

            }
            /** end */
    }
})(jQuery);