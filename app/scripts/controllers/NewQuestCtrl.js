'use strict';

angular.module('mapQuestApp')
    .controller('NewQuestCtrl', ['$scope', '$location', '$filter', '$routeParams', 'Map', 'Quest', function ($scope, $location, $filter, $routeParams, Map, Quest) {

        $scope.view = {};

        $scope.view.maps = [];
        $scope.view.loading = true;

        $scope.view.quest = {};

        if ($routeParams.map) {
            $scope.view.quest.map = parseInt($routeParams.map, 10);
        }

        $scope.view.datepicker = {
            start: false,
            finish: false
        };

        /**
         * Open datepicker for particular field
         *
         * @param which
         */
        $scope.openDatepicker = function(which) {

            $scope.view.datepicker[which] = true;

        };

        Map.getList()
            .then(function(result) {
                $scope.view.maps = result.list;
                $scope.view.loading = true;
            });


        /**
         * Create quest
         *
         * @returns {boolean}
         */
        $scope.create = function() {

            $scope.view.error = '';

            if ($scope.view.form.$invalid) {
                $scope.view.form.$setDirty();
                return false;
            }

            $scope.view.loading = true;

            var quest = {};
            quest.name = $scope.view.quest.name;
            quest.startDate = $filter('date')($scope.view.quest.startDate, 'yyyy-MM-dd');
            quest.finishDate = $filter('date')($scope.view.quest.finishDate, 'yyyy-MM-dd');
            quest.id_map = $scope.view.quest.map.id;

            Quest.create(quest)
                .then(function() {

                    $location.path('/');

                }, function(error) {
                    $scope.view.loading = false;
                    $scope.view.error = error;
                });

        };

    }]);
