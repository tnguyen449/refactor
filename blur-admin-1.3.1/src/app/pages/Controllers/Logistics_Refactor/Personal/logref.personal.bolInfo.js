(function() {
    'use strict';

    angular.module('BlurAdmin.pages.logistics')
        .controller('BolInfoController', BolInfoController);

    BolInfoController.$inject = ['$scope', '$rootScope', '$uibModal', 'shareDataService']

    function BolInfoController($scope, $rootScope, $uibModal, shareDataService) {
        var vm = this;

        /** init data and create object */
        var initDataList = shareDataService.setInitData();
        vm.branchInfo = shareDataService.setBranchCode();
        vm.bolCode = shareDataService.setBolCode();
        vm.sendDate = new Date();
        vm.merchandiseTypeVM = initDataList[0].data.merchandiseTypeVM;
        vm.deliveryTypeVM = initDataList[0].data.deliveryTypeVM;
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
            minDate: new Date(vm.dateOptions.minDate.getFullYear(), vm.dateOptions.minDate.getMonth(), vm.dateOptions.minDate.getDate() + 1).toLocaleDateString('en-GB')
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
        vm.post = function(formValid) {
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
                        bolCode: vm.bolCode === undefined ? "" : vm.bolCode,
                        sendDate: vm.dateOptions.minDate === undefined ? "" : vm.dateOptions.minDate,
                        receiveDate: vm.receivedDate === undefined ? "" : vm.receivedDate,
                        isGuarantee: vm.isGuarantee,
                        mixedValue: vm.mixedValue,
                        collectInBehalf: vm.collectInBehalf === undefined ? "" : vm.collectInBehalf,
                        sendAddress: vm.sendAddress === undefined ? "" : vm.sendAddress,
                        receivedTime: vm.deliveryType.Id == 2 ? vm.receivedTime : "",
                        deliveryTypeId: vm.deliveryType.Id === undefined ? "" : vm.deliveryType.Id,
                        declaredPrice: vm.declaredPrice === undefined ? '0' : vm.declaredPrice,
                        additionalFee: vm.additionalFee === undefined ? '0' : vm.additionalFee,
                        prepaid: vm.prepaid === undefined ? '0' : vm.prepaid,
                        bolFromId: vm.branchInfo.sentBranchCode.selected.Id,
                        bolToId: vm.branchInfo.receivedBranchCode.selected.Id,
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
                        MerchandiseInfo: vm.bolInfo.merchandiseId,
                        BillOfLandingInfo: {
                            BolCode: vm.bolInfo.bolCode,
                            SendDate: vm.bolInfo.sendDate.toLocaleDateString('en-GB'),
                            ReceiveDate: vm.bolInfo.receiveDate,
                            IsGuarantee: vm.bolInfo.isGuarantee,
                            CollectInBehalf: vm.bolInfo.collectInBehalf,
                            SendAddress: vm.bolInfo.sendAddress,
                            ReceiveTime: receivedTime,
                            DeliveryType: vm.bolInfo.deliveryTypeId,
                            DeclareValue: vm.bolInfo.declaredPrice,
                            AdditionalFee: vm.bolInfo.additionalFee,
                            Total: vm.total,
                            Prepaid: vm.bolInfo.prepaid,
                            Liabilities: vm.liabilities,
                            StatusCode: vm.statusCode,
                            BolFromId: vm.bolInfo.bolFromId,
                            BolToId: vm.bolInfo.bolToId
                        }
                    }
                };
                /** end */

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