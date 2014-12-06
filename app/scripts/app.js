'use strict';

angular
    .module('mapQuestApp', ['ngAnimate', 'ngResource', 'ngRoute', 'ngTouch'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
