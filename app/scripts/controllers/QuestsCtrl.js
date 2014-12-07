'use strict';

angular.module('mapQuestApp')
    .controller('QuestsCtrl', ['$scope', '$q', '$routeParams', '$location', 'Quest', 'Map', function ($scope, $q, $routeParams, $location, Quest, Map) {

        $scope.view = {};

        $scope.view.loading = true;
        $scope.view.mapId = $routeParams.map ? parseInt($routeParams.map, 10) : null;

        var quests = [];


        $q.all([
                Map.getList(),
                Quest.getList($routeParams.map)
            ]).then(function(result) {

                $scope.view.maps = result[0].list;

                quests = result[1].list;

                $scope.filter('all');

                $scope.view.loading = false;

            });

        /**
         * Toggle filter visibility
         */
        $scope.toggleFilter = function() {

            $scope.view.filterOpen = !$scope.view.filterOpen;

        };

        /**
         * Filter quests by status
         *
         * @param status
         */
        $scope.filter = function(status) {

            $scope.view.filterOpen = false;

            $scope.view.status = status;

            if (status === 'all') {
                $scope.view.quests = quests;
            } else {
                $scope.view.quests = _.filter(quests, function(q) {
                    return q.status === status;
                });
            }

        };

        /**
         * Clear search filed and reset filtering
         */
        $scope.clearSearch = function() {

            $scope.view.search = null;

        };

        /**
         * Filter quests by map
         */
        $scope.changeMap = function() {

            $location.path('/quests/' + $scope.view.mapId);

        };

    }]);
