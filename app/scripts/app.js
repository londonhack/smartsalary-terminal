;(function (angular) {
    'use strict';

    var app = angular.module('MainApp', [
        'MainRouter',
        'angular-loading-bar',

        'controllers.Auth',
        'controllers.Menu',
        'controllers.Pagination',
        'controllers.Tabular',

        'services.Pagination',
        'services.Tabular',
        'services.BlockChain',

        'directives.Pagination',
        'directives.Tabular',
        'directives.showIf'
    ]);

    app.constant('Constants', {
        baseUrl: 'https://api.github.com',
        sandboxId: "abfeb5312e",
        defaultAccount: "0xdedb49385ad5b94a16f236a6890cf9e0b1e30392",
        companyContractAccount: "0xaefa01276783e1436e5b461c099edccb0448dcf6",
        abi: [
            [
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "name": "salaryOf",
                    "outputs": [
                        {
                            "name": "",
                            "type": "int256"
                        }
                    ],
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "employeeDelegate",
                            "type": "address"
                        },
                        {
                            "name": "month",
                            "type": "int256"
                        },
                        {
                            "name": "year",
                            "type": "int256"
                        }
                    ],
                    "name": "executePayments",
                    "outputs": [],
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "delegate",
                            "type": "address"
                        },
                        {
                            "name": "salary",
                            "type": "int256"
                        }
                    ],
                    "name": "setSalaryOf",
                    "outputs": [],
                    "type": "function"
                }
            ]
        ]
    });

    app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
    }]);
    /*
    app.config(['$httpProvider', function ($httpProvider) {
        // CORS
        $httpProvider.interceptors.push('AuthInterceptor');
        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};
    }]);

    app.factory('AuthInterceptor', [function () {
        return {
            request: function (config) {
                var token = '';
                config.headers = config.headers || {};
                config.headers.Authorization = 'Bearer ' + token;
                return config;
            }
        };
    }]);
    */

})(angular);
