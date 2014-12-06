'use strict';

angular.module('mapQuestApp')
    .controller('NewQuestCtrl', ['$scope', '$location', 'Map', 'Quest', function ($scope, $location, Map, Quest) {

        $scope.view = {};

        $scope.view.maps = [];
        $scope.view.quest = {};
        $scope.view.loading = true;

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

            Quest.create($scope.view.form)
                .then(function() {

                    $location.path('/');

                }, function(error) {
                    $scope.view.loading = false;
                    $scope.view.error = error;
                });

        };

    }]);
