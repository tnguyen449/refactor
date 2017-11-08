(function() {
    'use strict';

    angular.module('BlurAdmin.pages')
        .constant('Url', {
            //'hostDomain': 'http://ngoctrangapi.azurewebsites.net/NgocTrang/Api/',
            'hostDomain': 'http://localhost:57363/NgocTrang/Api/',
            //'externalDomain': 'http://192.168.56.1:57363/NgocTrang/Api/'
        })
        .constant('backendController', {
            //Bill of landing const
            'getComponents': 'Bol/GetComponent',
            'getCurrentTimeStamp': 'Bol/GetCurrentTimeStamp',
            'getAllBol': 'Bol/GetAllBol?conditionQuery=',
            'getBolDeliveryByBolCode': 'Bol/GetBolDeliveryByBolCode?bolCode=',
            'addBol': 'Bol/Add',
            'updateStatus': 'Bol/UpdateStatus/',
            //Branches const
            'getAllBranches': 'Branch/GetAll',
            'addBranch': 'Branch/Add',
            'updateBranchName': 'Branch/UpdateName/',
            'updateBranchAddress': 'Branch/UpdateAddress/',
            'updateBranchPhone': 'Branch/UpdatePhone/',
            'updateBranchEmail': 'Branch/UpdateEmail/',
            'updateBranchCode': 'Branch/UpdateCode/',
            'deleteBranch': 'Branch/Delete/',
            //Delivery types const
            'getAllDeliveryTypes': 'DeliveryType/GetAll',
            //Merchandise type const
            'getAllMerchandiseTypes': 'MerchandiseType/GetAll',
            'addMerchandiseType': 'MerchandiseType/Add',
            'deleteMerchandiseType': 'MerchandiseType/Delete',
            //Status const
            'getStatus': 'Status/GetStatus',
            //User const
            'login': 'User/Login',

            //Statistic
            //BolData
            'bolData': 'Statistic/GetBolData',
            'bolBasedLocationData': 'Statistic/GetBolOnLocationData'

        })
        // .constant('hostDomain', 'http://localhost::57363/NgocTrang/Api')
        // .constant('StrBolView', 'http://localhost::3000/#/logistics/view')
        .constant('businessConst', {
            'intDeclaredFee': 0.01,
            'StrGuaranteeFee': '100,000',
            'StrOnHandFee': '40,000',
            'StrTimedDeliveryFee': '40,000'
        });
})();