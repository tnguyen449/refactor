(function() {
    'use strict';

    angular.module('BlurAdmin.pages')
        .constant('hostDomain', 'http://localhost::57363/NgocTrang/Api')
        .constant('businessConst', {
            'intDeclaredFee': 0.01,
            'StrGuaranteeFee': '100,000',
            'StrOnHandFee': '40,000',
            'StrTimedDeliveryFee': '40,000'
        });
})();