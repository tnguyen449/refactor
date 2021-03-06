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
        vm.isAlarm = true;
        vm.merchandiseType = {};
        vm.merchandiseType.selected = vm.merchandiseTypeVM[0];

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

        vm.deliveryTime = new Date();
        vm.change = function() {
            vm.deliveryTime.setHours(vm.receivedTime.getHours());
            vm.deliveryTime.setMinutes(vm.receivedTime.getMinutes());
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
            if (formatDataService.convertToNumber(discount) > formatDataService.convertToNumber(subTotal)) {
                toastr.info('Số tiền khấu hao phải ít hơn hoặc bằng tổng cước', 'THÔNG BÁO');
                vm.discount = "";
            } else {
                vm.finalTotal = businessService.calculateTotal(subTotal, declareFee, deliveryPrice, discount, onHandFee, guaranteeFee);
            }
            // vm.finalTotal = (subTotal + declareFee + onHandFee + guaranteeFee + deliveryPrice).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            return vm.finalTotal;
        };

        $scope.$watch("bolInfoCtrl.finalTotal", function(newValue) {
            vm.prepaid = newValue;
        });

        vm.bindingLiabilities = function() {
                var finalTotal = vm.finalTotal;
                var prepaid = vm.prepaid == "" ? "0" : vm.prepaid;
                var discount = vm.discount == "" ? "0" : vm.discount;
                if (formatDataService.convertToNumber(prepaid) > formatDataService.convertToNumber(finalTotal)) {
                    toastr.info('Số tiền trả trước phải ít hơn hoặc bằng tổng cước', 'THÔNG BÁO');
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
                if ($('input[name = "Hẹn giờ"]').is(':checked') == false) {
                    vm.isAlarm = false;
                } else {
                    vm.isAlarm = true;
                }
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
                        sendAddress: vm.sendAddress === undefined || vm.deliveryName === "Tại văn phòng" ? "" : vm.sendAddress,
                        receivedTime: vm.deliveryType.Id == 2 ? vm.receivedTime : "",
                        discount: vm.discount === undefined ? '0' : vm.discount,
                        contact: vm.customerInfo.senderPhone,

                        //delivery key-value
                        deliveryTypeId: vm.deliveryType.Id === undefined ? "" : vm.deliveryType.Id,
                        deliveryTypeName: vm.deliveryName,
                        deliveryPrice: vm.deliveryPrice,
                        //end delivery key-value
                        //status key-value
                        statusCodeId: 1,
                        statusCodeName: "Đã nhận hàng",
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
                        total: vm.finalTotal,
                        start: vm.branchInfo.sentBranchCode.selected.Id

                    }
                    /** end */

                /** data post */
                vm.transactionVM = {
                    TransactionVM: {
                        CustomerInfo: {
                            SenderName: vm.bolInfo.senderName,
                            SenderPhone: vm.bolInfo.senderPhone,
                            ReceiverName: vm.bolInfo.receiverName,
                            ReceiverPhone: vm.bolInfo.receiverPhone,
                        },
                        BillOfLandingInfo: {
                            BolCode: vm.bolInfo.bolCode,
                            SendDate: vm.bolInfo.sendDate.toLocaleDateString('en-GB'),
                            ReceiveDate: vm.bolInfo.receiveDate.toLocaleDateString('en-GB'),
                            IsGuarantee: vm.bolInfo.isGuarantee,
                            IsDeclare: vm.bolInfo.isDeclare,
                            IsOnHand: vm.bolInfo.isOnHand,
                            IsAlarm: vm.isAlarm,
                            CollectInBehalf: vm.bolInfo.collectInBehalf,
                            SendAddress: vm.bolInfo.sendAddress,
                            ReceiveTime: vm.receivedTime.toLocaleTimeString('en-GB'),
                            DeliveryType: vm.bolInfo.deliveryTypeId,
                            DeliveryName: vm.bolInfo.deliveryTypeName,
                            DeliveryPrice: vm.bolInfo.deliveryPrice,
                            DeclareValue: vm.bolInfo.declaredPrice,
                            Discount: vm.bolInfo.discount,
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
                            Contact: vm.bolInfo.contact,
                            Start: vm.bolInfo.start,
                            MerchandiseTypeId: vm.bolInfo.merchandiseId,
                            MerchandiseName: vm.bolInfo.merchandiseName,
                            Description: vm.description,
                            MixedValue: vm.mixedValue
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
            }
            /** end */
    }
})(jQuery);