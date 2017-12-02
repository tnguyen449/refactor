(function() {
    'use strict';

    angular.module('BlurAdmin.pages.logistics').factory('shareDataService', shareDataService);

    shareDataService.$inject = ['$rootScope']

    /** @ngInject */
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


        function getInitData() {
            return initDataList;
        }

        function addInitData(initData) {
            initDataList.push(initData);
        }

        function addBranchCode(branch) {
            branchCode = branch;
        }

        function getBranchCode() {
            return branchCode;
        }

        function addBolCode(code) {
            bolCode = code;
        }

        function getBolCode() {
            return bolCode;
        }


        function addAllBol(bol) {
            bolList.push(bol);
        }

        function getAllBol() {
            return bolList;
        }

        function addItem(item) {
            dataList = item;
        }

        function getList() {
            return dataList;
        }


        function addBranch(branch) {
            branchList.push(branch);
        }

        function getAllBranch() {
            return branchList;
        }


        function addStampCode(stampCode) {
            stampCodeList.push(stampCode);
        }

        function getStampCode() {
            return stampCodeList;
        }
    }
})();