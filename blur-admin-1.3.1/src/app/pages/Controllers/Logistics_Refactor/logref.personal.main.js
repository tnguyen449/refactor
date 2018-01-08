(function($) {
    'use strict';

    angular.module('BlurAdmin.pages.logistics')
        .controller('PersonalMainController', PersonalMainController);

<<<<<<< HEAD
    PersonalMainController.$inject = ['$scope', '$rootScope', '$state', '$http', 'shareDataService', 'businessService',  'utility', '$uibModal', '$uibModalStack', 'toastr', 'Url', 'backendController'];

    /** @ngInject */
    function PersonalMainController($scope, $rootScope, $state, $http, shareDataService, businessService, utility, $uibModal, $uibModalStack, toastr, Url, backendController) { 
=======
    PersonalMainController.$inject = ['$scope', '$rootScope', '$state', '$http', 'shareDataService', 'businessService', 'AuthenticationService', 'utility', '$uibModal', '$uibModalStack', 'toastr', 'Url', 'backendController', 'USER_ROLES']

    /** @ngInject */
    function PersonalMainController($scope, $rootScope, $state, $http, shareDataService, businessService, AuthenticationService, utility, $uibModal, $uibModalStack, toastr, Url, backendController, USER_ROLES) {
>>>>>>> 3d5b96d6fa6ccc7550ea0eb6c262f814c1f07777
        var vm = this;
        vm.branchInfoVM = [];
        vm.merchandiseTypeVM = [];
        vm.serverTimeStampVM = "";
        vm.deliveryTypeVM = [];
        vm.customerInfoVM = [];
        vm.bolDetails = {};
        vm.itemsByPage = 2;
        vm.conditionQuery = new Date();
<<<<<<< HEAD
=======
        vm.currentUser = null;
        vm.userRoles = USER_ROLES;
        vm.isAuthorized = AuthenticationService.isAuthorized;
       
        vm.setCurrentUser = (user) => {
            vm.currentUser = user;
        };
>>>>>>> 3d5b96d6fa6ccc7550ea0eb6c262f814c1f07777
        vm.getTransactionComponent = () => {
            if (vm.branchInfoVM.length == 0 && vm.merchandiseTypeVM.length == 0 && vm.deliveryTypeVM.length == 0) {
              
                utility.getData(backendController.getComponents).then(
                    function(response) {

                        vm.branchInfoVM = response.Branch;
                        vm.merchandiseTypeVM = response.Type;
                        vm.serverTimeStampVM = response.CurrentTimeStamp;
                        vm.deliveryTypeVM = response.DeliveryType;
                        vm.initData = {
                            data: {
                                branchInfoVM: vm.branchInfoVM,
                                merchandiseTypeVM: vm.merchandiseTypeVM,
                                deliveryTypeVM: vm.deliveryTypeVM,
                                serverTimeStamp: vm.serverTimeStampVM
                            }
                        }
                        shareDataService.addInitData(vm.initData);
                    },
                    function(response) {
                        vm.branchInfoVM = [{
                            'Name': 'Lỗi từ máy chủ',
                            'Description': 'Không thể tải danh sách chi nhánh'
                        }];
                        vm.merchandiseTypeVM = [{
                            'Name': 'Lỗi từ máy chủ',
                            'Description': 'Không thể tải danh sách loại hàng'
                        }];
                        vm.deliveryTypeVM = "Lỗi từ máy chủ";
                    }
                )
            }
        };

        /** setup datepicker */
        vm.today = new Date();
        vm.opened = false;
        vm.formats = ['dd/MM/yyyy'];
        vm.format = vm.formats[0];
        vm.options = {
            showWeeks: false
        };
        vm.dateOptions = {
            formatYear: 'yyyy',
            maxDate: new Date(2099, 12, 31),
            minDate: new Date(),
            startingDay: 1
        };
        vm.receiveDate = {
            minDate: new Date(vm.dateOptions.minDate.getFullYear(), vm.dateOptions.minDate.getMonth(), vm.dateOptions.minDate.getDate() + 1)
        };
        vm.bindingDate = {
            minDate: new Date(vm.today.getFullYear(), vm.today.getMonth(), vm.today.getDate()).toLocaleDateString('en-GB')
        };

        vm.receivedDate = vm.receiveDate.minDate;
        vm.open = function() {
            vm.opened = true;
        };
        /** end */

        vm.getAllBol = function() {

            utility.getData(backendController.getAllBol + vm.conditionQuery.toLocaleDateString('en-GB')).then(
                function(response) {
                    vm.bolDetails = response.reverse();
                }
            )
        };

        vm.filterBol = function(filterCondition) {
            utility.getData(backendController.getAllBol + filterCondition.toLocaleDateString('en-GB')).then(
                function(response) {
                    vm.bolDetails = response.reverse();
                }
            )
        };

        vm.updateStatus = function(bolCode, sttCode, id) {
            if (sttCode == 5) {

            } else {
                utility.postData(backendController.updateStatus + id).then(function() {
                    $state.reload();
                    toastr.success("Vận đơn " + bolCode + " cập nhật trạng thái thành công!")
                })
            }

        };

        $scope.stampCode = [];
        vm.printStamps = function(bolCode, quantity) {
            $scope.stampCode = [];
            $scope.records = {};
            var count = 1;
            utility.getData(backendController.getBolByBolCode + bolCode).then(
                function(response) {
                    $scope.records = response;
                }
            );
            while (count <= quantity) {
                var stampCode = bolCode + "-" + count + "/" + quantity;
                $scope.stampCode.push(stampCode);
                count++;
            }

            $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/Templates/Logistics/Main_View_Refactor/stampRecipe.html',
                size: 'lg',
                controller: 'PersonalMainController',
                controllerAs: 'stampViewCtrl',
                bindToController: true,
                scope: $scope
            });
        };
        vm.print = function() {
            //get all canvas
            var imgArr = [];
            var test = document.getElementsByName('convert-here')
            for (var i = 0; i < test.length; i++) {
                var fullQuality = test[i].childNodes[0].toDataURL();
                var img = $('<img>');
                img.attr('src', fullQuality);
                imgArr.push(img);
            }

            var frameDoc = window.open();
            frameDoc.document.write('<html><head>');
            frameDoc.document.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous"><link rel="stylesheet" href="styles/app-638196aabe.css"><title>In tem</title>')
                //frameDoc.document.write('<link rel="stylesheet" href="../bower_components/bootstrap/dist/css/bootstrap.css"><link rel="stylesheet" href="app/main.css"><title>In tem</title>')
            frameDoc.document.write('</head><body>');
            //replace
            var canvas = $("[name='convert-here']");
            $.each(canvas, function(index, value) {
                imgArr[index].appendTo(canvas[index]);
            })
            frameDoc.document.write($('#test').html());
            frameDoc.document.write('</body></html>');

            vm.cancel();
        };
        vm.cancel = function() {
            $uibModalStack.dismissAll();
        };

        $scope.bolInformation = {};

        vm.bolDetail = (bolId) => {
            utility.getData(backendController.getBolByBolCode + bolId).then(
                function(response) {
                    $scope.bolInformation = response;
                    $scope.bolInformation.calculatedDeclareValue = businessService.calculateDeclareFee($scope.bolInformation.DeclareValue);
                    $uibModal.open({
                        animation: true,
                        templateUrl: 'app/pages/components/notifications/bolDetail.component.html',
                        size: 'lg',
                        controller: 'PersonalMainController',
                        controllerAs: 'detailCtrl',
                        scope: $scope,
                        bindToController: true
                    })

                }
            )

        }
        $('.user-profile').show();
    }
})(jQuery);