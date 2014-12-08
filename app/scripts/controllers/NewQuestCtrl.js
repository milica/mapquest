'use strict';

angular.module('mapQuestApp')
    .controller('NewQuestCtrl', ['$scope', '$location', '$filter', '$routeParams', 'Map', 'Quest', function ($scope, $location, $filter, $routeParams, Map, Quest) {

        $scope.view = {};

        $scope.view.maps = [];
        $scope.view.loading = true;

        $scope.view.quest = {};

        if ($routeParams.map) {
            $scope.view.quest.map = $routeParams.map;
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
                $scope.view.maps = result.data;
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
            quest.title = $scope.view.quest.title;
            quest.start = $filter('date')($scope.view.quest.start, 'yyyy-MM-dd');
            quest.finish = $filter('date')($scope.view.quest.finish, 'yyyy-MM-dd');
            quest.map = $scope.view.quest.map.id;

            Quest.create(quest)
                .then(function() {

                    $location.path('/');

                }, function(error) {
                    $scope.view.loading = false;
                    $scope.view.error = error;
                });

        };

    }]);
