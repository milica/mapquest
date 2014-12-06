'use strict';

angular.module('mapQuestApp')
    .controller('QuestsCtrl', ['$scope', 'Quest', function ($scope, Quest) {

        $scope.view = {};

        $scope.view.loading = true;

        var quests = [];

        Quest.getList()
            .then(function(result) {

                quests = result.list;
                $scope.filter('running');
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

            $scope.view.quests = _.filter(quests, function(q) {
                return q.status === status;
            });

        };

    }]);
