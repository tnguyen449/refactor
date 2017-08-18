(function() {
    'use strict';

    angular.module('BlurAdmin.pages.logistics').factory('shareDataService', shareDataService);

    shareDataService.$inject = ['$rootScope']

    function shareDataService($rootScope) {
        var dataList = [];
        var initDataList = [];
        var branchCode = {};
        return {
            setInitData: setInitData,
            getInitData: getInitData,
            getBranchCode: getBranchCode,
            setBranchCode: setBranchCode,
            setBolCode: setBolCode,
            addItem: addItem,
            getList: getList
        };

        /** initData {get; set;} */
        function setInitData() {
            return initDataList;
        }

        function getInitData(initData) {
            initDataList.push(initData);
        }
        /** end */

        function getBranchCode(branch) {
            branchCode = branch;
        }

        function setBranchCode() {
            return branchCode;
        }

        function setBolCode() {
            var to = branchCode.receivedBranchCode.selected.BranchCode.trim();
            var from = branchCode.sentBranchCode.selected.BranchCode.trim();
            var dateCode = initDataList[0].data.serverTimeStamp.substring(0, 6);
            var timeCode = initDataList[0].data.serverTimeStamp.substring(6, 12);
            var bolCode = from + "-" + dateCode + "-" + to + "-" + timeCode;
            return bolCode;
        }

        function addItem(item) {
            dataList.push(item);
        }

        function getList() {
            return dataList;
        }
    }
})();