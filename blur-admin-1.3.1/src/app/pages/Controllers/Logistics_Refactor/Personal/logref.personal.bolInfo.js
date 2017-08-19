(function() {
    'use strict';

    angular.module('BlurAdmin.pages.logistics')
        .controller('BolInfoController', BolInfoController);

    BolInfoController.$inject = ['$scope', '$rootScope', '$uibModal', 'shareDataService', 'businessService']

    function BolInfoController($scope, $rootScope, $uibModal, shareDataService, businessService) {
        var vm = this;

        /** init data and create object */
        var initDataList = shareDataService.setInitData();
        vm.branchInfo = shareDataService.setBranchCode();
        vm.bolCode = shareDataService.setBolCode();
        vm.sendDate = new Date();
        vm.isGuarantee = false;
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
                vm.deliveryPrice = vm.deliveryPrice.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
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
        // vm.formats = ['dd/MM/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
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
                        statusCodeId: 1,
                        statusCodeName: "Inactive",
                        //end status key-value
                        subTotal: vm.subTotal === undefined ? '0' : vm.subTotal,
                        declaredPrice: vm.declaredPrice === undefined ? '0' : vm.declaredPrice,
                        additionalFee: vm.additionalFee === undefined ? '0' : vm.additionalFee,
                        prepaid: vm.prepaid === undefined ? '0' : vm.prepaid,
                        bolFromId: vm.branchInfo.sentBranchCode.selected.Id,
                        bolToId: vm.branchInfo.receivedBranchCode.selected.Id,
                        bolToName: vm.branchInfo.receivedBranchCode.selected.Name,
                        description: vm.description,
                        total: businessService.calculateTotal(vm.subTotal, vm.declaredPrice, vm.discount, vm.additionalFee, vm.deliveryPrice, vm.isGuarantee).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"),

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
                            CollectInBehalf: vm.bolInfo.collectInBehalf,
                            SendAddress: vm.bolInfo.sendAddress,
                            ReceiveTime: vm.receivedTime.toLocaleTimeString('en-GB'),
                            DeliveryType: vm.bolInfo.deliveryTypeId,
                            DeliveryName: vm.bolInfo.deliveryTypeName,
                            DeliveryPrice: vm.bolInfo.deliveryPrice,
                            DeclareValue: vm.bolInfo.declaredPrice,
                            AdditionalFee: vm.bolInfo.additionalFee,
                            SubTotal: vm.bolInfo.subTotal.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"),
                            Total: vm.bolInfo.total,
                            Prepaid: vm.bolInfo.prepaid,
                            Quantity: vm.bolInfo.quantity,
                            Weight: vm.bolInfo.weight,
                            Liabilities: businessService.calculateLiabilities(vm.bolInfo.total, vm.bolInfo.prepaid).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"),
                            StatusCode: vm.bolInfo.statusCodeId,
                            StatusName: vm.bolInfo.statusCodeName,
                            BolFromId: vm.bolInfo.bolFromId,
                            BolToId: vm.bolInfo.bolToId,
                            BolToName: vm.bolInfo.bolToName,
                            MerchandiseTypeId: vm.bolInfo.merchandiseId,
                            MerchandiseName: vm.bolInfo.merchandiseName,
                            Description: vm.description
                        }
                    }
                };
                /** end */
                shareDataService.addItem(vm.transactionVM);
                $uibModal.open({
                    animation: true,
                    templateUrl: 'app/pages/components/notifications/confirm.component.html',
                    size: 'lg',
                    controller: 'bolReviewCtrl',
                    controllerAs: 'bolConfirm'
                });
                console.log(vm.transactionVM);
            }
            /** end */
    }
})();