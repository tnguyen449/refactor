(function() {
    'use strict';

    angular.module('BlurAdmin.pages.logistics').factory('shareDataService', shareDataService);

    function shareDataService() {
        var dataList = [];

        return {
            addItem: addItem,
            getList: getList
        };

        function addItem(item) {
            dataList.push(item);
        }

        function getList() {
            return dataList;
        }
    }
})();