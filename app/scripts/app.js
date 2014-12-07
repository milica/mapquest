'use strict';

angular
    .module('mapQuestApp', ['ngAnimate', 'ngResource', 'ngRoute', 'ngTouch', 'LocalStorageModule', 'ui.bootstrap'])
    .config(['$routeProvider', '$httpProvider', 'localStorageServiceProvider', 'datepickerPopupConfig', 'datepickerConfig', function ($routeProvider, $httpProvider, localStorageServiceProvider, datepickerPopupConfig, datepickerConfig) {
        $routeProvider
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/', {
                templateUrl: 'views/quests.html',
                controller: 'QuestsCtrl'
            })
            .when('/quests/:map', {
                templateUrl: 'views/quests.html',
                controller: 'QuestsCtrl'
            })
            .when('/new-quest', {
                templateUrl: 'views/new-quest.html',
                controller: 'NewQuestCtrl'
            })
            .when('/new-quest/:map', {
                templateUrl: 'views/new-quest.html',
                controller: 'NewQuestCtrl'
            })
            .when('/quest/:id', {
                templateUrl: 'views/quest.html',
                controller: 'QuestCtrl'
            })
            .when('/maps', {
                templateUrl: 'views/maps.html',
                controller: 'MapsCtrl'
            })
            .when('/map/:id', {
                templateUrl: 'views/map.html',
                controller: 'MapCtrl'
            })
            .when('/participants/:quest', {
                templateUrl: 'views/participants.html',
                controller: 'ParticipantsCtrl'
            })
            .when('/profile/:id', {
                templateUrl: 'views/profile.html',
                controller: 'ProfileCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

        $httpProvider.interceptors.push('HTTPInterceptor');

        localStorageServiceProvider.setPrefix('mapQuest');

        datepickerConfig.minDate = new Date();
        datepickerConfig.showWeeks = false;

        datepickerPopupConfig.appendToBody = true;
        datepickerPopupConfig.showButtonBar = false;
        datepickerPopupConfig.datepickerPopup = 'yyyy/MM/dd';

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

