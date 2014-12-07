'use strict';

angular.module('mapQuestApp')
    .controller('ParticipantsCtrl', ['$scope', '$routeParams', 'User', function ($scope, $routeParams, User) {

        $scope.view = {};

        $scope.view.loading = true;

        $scope.view.participants = [];

        User.getParticipants($routeParams.quest)
            .then(function(result) {

                $scope.view.participants = result.list;
                $scope.view.loading = false;

            });


        /**
         * Clear search filed and reset filtering
         */
        $scope.clearSearch = function() {

            $scope.view.search = null;

        };

    }]);
