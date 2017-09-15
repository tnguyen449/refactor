(function() {
    'use strict';

    angular.module('BlurAdmin.pages.logistics').factory('shareDataService', shareDataService);

    shareDataService.$inject = ['$rootScope']

    function shareDataService($rootScope) {
        var dataList = {};
        var initDataList = [];
        var bolList = [];
        var branchCode = {};
        var branchList = [];

        return {
            getInitData: getInitData,
            addInitData: addInitData,
            getBranchCode: getBranchCode,
            addBranchCode: addBranchCode,
            getBolCode: getBolCode,
            addItem: addItem,
            getList: getList,
            getAllBol: getAllBol,
            addAllBol: addAllBol,
            addBranch: addBranch,
            getAllBranch: getAllBranch
        };

        /**init data { get; set; } */
        function getInitData() {
            return initDataList;
        }

        function addInitData(initData) {
            initDataList.push(initData);
        }
        /**end */

        /**branchCode { get; set; } */
        function addBranchCode(branch) {
            branchCode = branch;
        }

        function getBranchCode() {
            return branchCode;
        }
        /**end */

        /**Bol Code { get; } */
        function getBolCode() {
            var to = branchCode.receivedBranchCode.selected.BranchCode.trim();
            var from = branchCode.sentBranchCode.selected.BranchCode.trim();
            var dateCode = initDataList[0].data.serverTimeStamp.substring(0, 6);
            var timeCode = initDataList[0].data.serverTimeStamp.substring(6, 12);
            var bolCode = from + "-" + dateCode + "-" + to + "-" + timeCode;
            return bolCode;
        }

        /**get all Bol { get; set; } */
        function addAllBol(bol) {
            bolList.push(bol);
        }

        function getAllBol() {
            return bolList;
        }
        /**end */

        /** */
        function addItem(item) {
            dataList = item;
        }

        function getList() {
            return dataList;
        }

        /**get branch { get; set; } */
        function addBranch(branch) {
            branchList.push(branch);
        }

        function getAllBranch() {
            return branchList;
        }
        /**end */
    }
})();