(function() {
    'use strict';

    angular.module('BlurAdmin.pages')
        .constant('Url', {
            'hostDomain': 'http://localhost:57363/NgocTrang/Api',
        })
        .constant('backendController', {
            'getAllComponent': '/Bol/GetComponent',
            'getAllBol': '/Bol/GetAllBol',
            'getAllLocation': '',
            'getAllBranch': '',
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