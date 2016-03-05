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
        'services.Eth',

        'directives.Pagination',
        'directives.Tabular',
        'directives.showIf'
    ]);

    app.constant('Constants', {
        baseUrl: 'https://api.github.com'
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
