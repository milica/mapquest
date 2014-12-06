'use strict';

angular
    .module('mapQuestApp', ['ngAnimate', 'ngResource', 'ngRoute', 'ngTouch', 'LocalStorageModule'])
    .config(['$routeProvider', '$httpProvider', 'localStorageServiceProvider', function ($routeProvider, $httpProvider, localStorageServiceProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/', {
                templateUrl: 'views/quests.html',
                controller: 'QuestsCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

        $httpProvider.interceptors.push('HTTPInterceptor');

        localStorageServiceProvider.setPrefix('mapQuest');
    }])
    .run(['$rootScope', '$location', 'User', function($rootScope, $location, User) {

        $rootScope.$on('$locationChangeStart', function(e, newUrl) {

            var isLoggedIn = User.getSessionUser();

            if (isLoggedIn) {
                if (_.contains(newUrl, '/login')) {
                    $location.path('/');
                }
            } else {
                if (!_.contains(newUrl, '/login')) {
                    $location.path('/login');
                }
            }

        });

    }]);

