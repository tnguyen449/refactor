(function() {
    'use strict';

    angular.module('BlurAdmin.pages')
    .constant('Url', {
      'hostDomain': 'http://localhost:57363/NgocTrang/Api',
      'testGetComponent': 'http://localhost:3000/API/NgocTrang/Api/Bol/GetComponent',
      'getComponent': 'http://192.168.1.193:57364/API/NgocTrang/Api/Bol/GetComponent',
      'bolView': 'http://localhost:3000/#/logistics/view'
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
