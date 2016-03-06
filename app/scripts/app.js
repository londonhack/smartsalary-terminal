;(function (angular) {
    'use strict';

    var app = angular.module('MainApp', [
        'MainRouter',
        'angular-loading-bar',

        'controllers.Auth',
        'controllers.Menu',
        'controllers.Pagination',
        'controllers.BlockChain',

        'services.Pagination',
        'services.Tabular',
        'services.BlockChain',

        'directives.Pagination',
        'directives.Tabular',
        'directives.showIf'
    ]);

    app.constant('Constants', {
        users: [
            {
                name:"Daniel Louise",
                image:"matthew.png",
                address:"0xdf315f7485c3a86eb692487588735f224482abe3"
            },
            {
                name:"Elliot Fu",
                image:"elliot.png",
                address:"0xcd2a3d9f938e13cd947ec05abc7fe734df8dd830"
            }

        ],
        baseUrl: 'https://api.github.com',
        sandboxId: "6087e16aa9",
        defaultAccount: "0xdedb49385ad5b94a16f236a6890cf9e0b1e30392",
        refAddress: "0xcd2a3d9f938e13cd947ec05abc7fe734df8dd827",
        companyAbi: [
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

        ],
        transactionAbi:[
            {
                "constant": false,
                "inputs": [],
                "name": "nameRegAddress",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "sender",
                        "type": "address"
                    },
                    {
                        "name": "receiver",
                        "type": "address"
                    },
                    {
                        "name": "amount",
                        "type": "int256"
                    }
                ],
                "name": "addTransaction",
                "outputs": [],
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "balanceOf",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "name",
                        "type": "bytes32"
                    }
                ],
                "name": "named",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "type": "function"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "sender",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "receiver",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "amount",
                        "type": "int256"
                    }
                ],
                "name": "TransactionDone",
                "type": "event"
            }
        ],
        nameRegAbi:[
            {
                "constant": false,
                "inputs": [],
                "name": "kill",
                "outputs": [],
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "name",
                        "type": "bytes32"
                    }
                ],
                "name": "addressOf",
                "outputs": [
                    {
                        "name": "addr",
                        "type": "address"
                    }
                ],
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "name",
                        "type": "bytes32"
                    }
                ],
                "name": "register",
                "outputs": [],
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [],
                "name": "unregister",
                "outputs": [],
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "addr",
                        "type": "address"
                    }
                ],
                "name": "nameOf",
                "outputs": [
                    {
                        "name": "name",
                        "type": "bytes32"
                    }
                ],
                "type": "function"
            },
            {
                "inputs": [],
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "addr",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "name",
                        "type": "bytes32"
                    }
                ],
                "name": "Register",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "addre",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "name",
                        "type": "bytes32"
                    }
                ],
                "name": "Unregister",
                "type": "event"
            }
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
