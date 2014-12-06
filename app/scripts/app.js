'use strict';

angular
    .module('mapQuestApp', ['ngAnimate', 'ngResource', 'ngRoute', 'ngTouch'])
    .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

        $httpProvider.interceptors.push('HTTPInterceptor');
    }]);
