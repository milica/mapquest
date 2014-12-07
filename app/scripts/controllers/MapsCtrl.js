'use strict';

angular.module('mapQuestApp')
    .controller('MapsCtrl', ['$scope', 'Map', function ($scope, Map) {

        $scope.view = {};

        $scope.view.loading = true;

        $scope.view.maps = [];

        Map.getList()
            .then(function(result) {

                $scope.view.maps = result.list;
                $scope.view.loading = false;

            });


        /**
         * Clear search filed and reset filtering
         */
        $scope.clearSearch = function() {

            $scope.view.search = null;

        };

    }]);
