(function() {
    'use strict';
    angular.module('BlurAdmin.pages.statistics')

    .controller('statisticsCtrl', statisticsCtrl);

    statisticsCtrl.$inject = ['$scope', 'utility', 'backendController']

    function statisticsCtrl($scope, utility, backendController) {
        var vm = this;
        var bolList = [];
        utility.getData(backendController.bolData).then(function(response) {
            bolList = response;
            console.log(bolList);


            var bolChart = AmCharts.makeChart("bolChart", {
                "type": "serial",
                "theme": "light",
                "dataProvider": bolList,
                "valueAxes": [{
                    "gridColor": "#FFFFFF",
                    "gridAlpha": 1,
                    "dashLength": 0
                }],
                "gridAboveGraphs": true,
                "startDuration": 1,
                "graphs": [{
                    "balloonText": "[[category]]: <b>[[value]]</b>",
                    "fillAlphas": 1,
                    "lineAlpha": 1,
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
                    "gridAlpha": 0,
                    "tickPosition": "start",
                    "tickLength": 20
                },
                "export": {
                    "enabled": true
                }

            });
        });
    }

})();