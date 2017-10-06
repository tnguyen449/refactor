(function() {
    'use strict';
    angular.module('BlurAdmin.pages.statistics')

    .controller('statisticsCtrl', statisticsCtrl);

    statisticsCtrl.$inject = ['$scope', 'utility', 'backendController']

    function statisticsCtrl($scope, utility, backendController) {

        utility.getData(backendController.bolData).then(function(response) {
            var bolList = response;
            var bolDailyChart = AmCharts.makeChart("bolDailyChart", {
                "type": "serial",
                "theme": "light",
                "dataProvider": bolList,
                "marginRight": 70,
                "valueAxes": [{
                    "axisAlpha": 0,
                    "position": "left",
                    "title": "Vận đơn theo ngày"
                }],
                "startDuration": 1,
                "graphs": [{
                    "balloonText": "[[category]]: <b>[[value]]</b>",
                    "fillColorsField": "color",
                    "fillAlphas": 0.9,
                    "lineAlpha": 0.2,
                    "type": "column",
                    "valueField": "Total"
                }],
                "chartCursor": {
                    "categoryBalloonEnabled": false,
                    "cursorAlpha": 0,
                    "zoomable": false
                },
                "categoryField": "CreatedDate",
                "categoryAxis": {
                    "gridPosition": "start",
                    "labelRotation": 0
                },
                "export": {
                    "enabled": true
                }
            });
        });

        utility.getData(backendController.bolBasedLocationData).then(function(response) {
            var bolBasedLocation = response;
            var bolBasedLocationChart = AmCharts.makeChart("bolBasedLocationChart", {
                "type": "serial",
                "theme": "light",
                "dataProvider": bolBasedLocation,
                "marginRight": 70,
                "valueAxes": [{
                    "axisAlpha": 0,
                    "position": "left",
                    "title": "Tổng vận đơn từng chi nhánh"
                }],
                "startDuration": 1,
                "graphs": [{
                    "balloonText": "[[category]]: <b>[[value]]</b>",
                    "fillColorsField": "color",
                    "fillAlphas": 0.5,
                    "lineAlpha": 1,
                    "type": "column",
                    "valueField": "Total"
                }],
                "chartCursor": {
                    "categoryBalloonEnabled": false,
                    "cursorAlpha": 0,
                    "zoomable": false
                },
                "categoryField": "Location",
                "categoryAxis": {
                    "gridPosition": "start",
                    "labelRotation": 0
                },
                "export": {
                    "enabled": true
                },
                "autoGridCount": false
            });
        });
    }

})();