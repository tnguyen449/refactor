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
        var stampCodeList = [];
        var bolCode = {};

        return {
            getInitData: getInitData,
            addInitData: addInitData,
            getBranchCode: getBranchCode,
            addBranchCode: addBranchCode,
            addBolCode: addBolCode,
            getBolCode: getBolCode,
            addItem: addItem,
            getList: getList,
            getAllBol: getAllBol,
            addAllBol: addAllBol,
            addBranch: addBranch,
            getAllBranch: getAllBranch,
            addStampCode: addStampCode,
            getStampCode: getStampCode
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
        function addBolCode(code) {
            bolCode = code;
        }

        function getBolCode() {
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

        function addStampCode(stampCode) {
            stampCodeList.push(stampCode);
        }

        function getStampCode() {
            return stampCodeList;
        }
    }
})();