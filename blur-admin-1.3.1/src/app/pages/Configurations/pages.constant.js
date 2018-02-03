(function() {
    'use strict';

    angular.module('BlurAdmin.pages.configuration')
        .constant('Url', {
            //'hostDomain': 'http://api.ntl.com.vn/NgocTrang/Api/',
            'hostDomain': 'http://localhost:57363/NgocTrang/Api/'
        })

    .constant('backendController', {
        //Bill of landing const
        'getComponents': 'Bol/GetComponent',
        'getCurrentTimeStamp': 'Bol/GetCurrentTimeStamp',
        'getAllBol': 'Bol/GetAllBol?conditionQuery=',
        'getBolDeliveryByBolCode': 'Bol/GetBolDeliveryByBolCode?bolCode=',
        'getBolByBolCode': 'Bol/GetBolByBolCode?bolCode=',
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
        //Employee
        'getAllEmployee': 'Employee/GetAll',
        'getEmployeeById': 'Employee/GetEmployeeId?conditionQuery=',
        'addEmployee': 'Employee/AddEmployee',
        'deleteEmployee': 'Employee/DeleteEmployee',
        'updateEmployee': '',
        //User const
        'login': 'User/Login',
// Statistic
'Statistic':'Statistic/GetBolData?filterdate=',

        //Statistic
        //BolData
        'bolData': 'Statistic/GetBolData',
        'bolBasedLocationData': 'Statistic/GetBolOnLocationData'
    })

    .constant('businessConst', {
        'intDeclaredFee': 0.01,
        'StrGuaranteeFee': '100,000',
        'StrOnHandFee': '40,000',
        'StrTimedDeliveryFee': '40,000'
    })

    .constant('AUTH_EVENTS', {
        'loginSuccess': 'auth-login-success',
        'loginFailed': 'auth-login-failed',
        'logoutSuccess': 'auth-logout-success',
        'sessionTimeout': 'auth-session-timeout',
        'notAuthenticated': 'auth-not-authenticated',
        'notAuthorized': 'auth-not-authorized'
    })

    .constant('USER_ROLES', {
        'guid': 'a0ce457c-b5&18-4dd3-b0c4-49f*0186fbb8-c53b2!3ac-3613-4e96-8d5f-fdefc57$9d685',
        'admin': 'admin',
        'employee': 'Emp',
        'editor': 'editor',
        'guest': 'guest'
    });

})();