(function () {
    'use strict';
    angular.module('BlurAdmin.pages.statistics')
        .controller('statisticsCtrl', statisticsCtrl);

    statisticsCtrl.$inject = ['$scope', 'utility', 'backendController', 'Excel', '$timeout']

    /** @ngInject */
    function statisticsCtrl($scope, utility, backendController, Excel, $timeout) {
        var vm = this;
        /** setup datetime */
        vm.DailyStatisticList = [];
        vm.conditionQuery = new Date();
        //  vm.GetDailyConditionQuery= new Date();   
        vm.receivedTime = new Date();
        vm.sendDate = new Date();
        var today= new Date();

        vm.ismeridian = true;
        vm.dateOptions = {
            formatYear: 'yyyy',
            maxDate: new Date(),
            // minDate: new Date(),
            startingDay: 1
        };
        vm.receiveDate = {
            minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
        };

        vm.deliveryTime = new Date();
        vm.change = function () {
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
        vm.open = function () {
            vm.opened = true;
        };


        vm.filterStatistic = function (conditionQuery) {
            vm.DailyStatisticList = [];
            utility.getData(backendController.Statistic + conditionQuery.toLocaleDateString('en-GB')).then(
                function (response) {
                    vm.DailyStatisticList = response.GetDailyBol;
                    // var StatisticDataChart = AmCharts.makeChart("StatisticDataChart", {
                    //     "type": "serial",
                    //     "theme": "light",
                    //     "dataProvider": response.GetDailyBol,
                    //     "marginRight": 70,
                    //     "valueAxes": [{
                    //         "axisAlpha": 0,
                    //         "position": "left",
                    //         "title": "Tổng vận đơn từng chi nhánh"
                    //     }],
                    //     "startDuration": 1,
                    //     "graphs": [{
                    //         "balloonText": "[[category]]: <b>[[value]]</b>",
                    //         "fillColorsField": "color",
                    //         "fillAlphas": 0.5,
                    //         "lineAlpha": 1,
                    //         "type": "column",
                    //         "valueField": "Id"
                    //     }],
                    //     "chartCursor": {
                    //         "categoryBalloonEnabled": false,
                    //         "cursorAlpha": 0,
                    //         "zoomable": false
                    //     },
                    //     "categoryField": "Id",
                    //     "categoryAxis": {
                    //         "gridPosition": "start",
                    //         "labelRotation": 0
                    //     },
                    //     "export": {
                    //         "enabled": true
                    //     },
                    //     "autoGridCount": false
                    // });
                }
            )
        }
        vm.InitStatistic = function () {
            var date = new Date();
            utility.getData(backendController.Statistic + date.toLocaleDateString('en-GB')).then(
                function (response) {
                    vm.DailyStatisticList = response.GetDailyBol;
                    // var StatisticDataChart = AmCharts.makeChart("StatisticDataChart", {
                    //     "type": "serial",
                    //     "theme": "light",
                    //     "dataProvider": response.GetDailyBol,
                    //     "marginRight": 70,
                    //     "valueAxes": [{
                    //         "axisAlpha": 0,
                    //         "position": "left",
                    //         "title": "Tổng vận đơn từng chi nhánh"
                    //     }],
                    //     "startDuration": 1,
                    //     "graphs": [{
                    //         "balloonText": "[[category]]: <b>[[value]]</b>",
                    //         "fillColorsField": "color",
                    //         "fillAlphas": 0.5,
                    //         "lineAlpha": 1,
                    //         "type": "column",
                    //         "valueField": "Id"
                    //     }],
                    //     "chartCursor": {
                    //         "categoryBalloonEnabled": false,
                    //         "cursorAlpha": 0,
                    //         "zoomable": false
                    //     },
                    //     "categoryField": "Id",
                    //     "categoryAxis": {
                    //         "gridPosition": "start",
                    //         "labelRotation": 0
                    //     },
                    //     "export": {
                    //         "enabled": true
                    //     },
                    //     "autoGridCount": false
                    // });
                }
            )
        }
        vm.exportToExcel = function (tableId) { // ex: '#my-table'
            // var exportHref=Excel.tableToExcel(tableId,'WireWorkbenchDataExport');
            // exportHref.download= 'abcd'
            // $timeout(function(){
            //     location.href=exportHref;},100); // trigger download
            $scope.exportHref = Excel.tableToExcel(tableId, 'sheet name');
            $timeout(function () {
                var link = document.createElement('a');
                link.download = "BaoCao_ngay "+vm.conditionQuery.getDate()+'-'+(vm.conditionQuery.getMonth()+1)+'-'+vm.conditionQuery.getFullYear()+".xls";
                link.href = $scope.exportHref;
                link.click();
            }, 100);
        }
    }

})();