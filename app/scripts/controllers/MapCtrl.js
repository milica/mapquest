'use strict';

angular.module('mapQuestApp')
    .controller('MapCtrl', ['$scope', '$rootScope', '$routeParams', '$q', 'Map', 'User', 'gMap', function ($scope, $rootScope, $routeParams, $q, Map, User, gMap) {

        $scope.view = {};

        $scope.view.loading = true;

        $scope.view.map = null;

        $scope.view.tab = 'info';

        Map.getItem($routeParams.id)
            .then(function(result) {

                $scope.view.map = result.data;
                $scope.view.loading = false;

            });

        /**
         * Switch tab
         *
         * @param {string} tab - info|map
         */
        $scope.switchTab = function(tab) {

            $scope.view.tab = tab;

        };

        /**
         * Show all areas on the map
         */
        $scope.showAll = function() {

            gMap.showAll();

        };

        /**
         * Get current location of the user
         */
        $scope.getCurrentLocation = function() {

            $scope.view.loading = true;

            gMap.getCurrentLocation(true)
                .then(function() {
                    $scope.view.loading = false;
                });

        };


    }]);
