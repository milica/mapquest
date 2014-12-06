'use strict';

angular.module('mapQuestApp')
    .controller('QuestCtrl', ['$scope', '$routeParams', '$q', 'Map', 'Quest', 'User', function ($scope, $routeParams, $q, Map, Quest, User) {

        $scope.view = {};

        $scope.view.loading = true;

        $scope.view.quest = null;
        $scope.view.participant = null;

        $scope.view.tab = 'info';

        $scope.view.showModal = {
            quit: false,
            join: false
        };

        $q.all([
                Quest.getItem($routeParams.id),
                User.getParticipant($routeParams.id)
            ]).then(function(result) {

                $scope.view.quest = result[0].data;
                $scope.view.participant = result[1].data;


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
         * Join the quest
         */
        $scope.join = function() {

            $scope.view.saving = true;

            User.join($routeParams.id)
                .then(function(result) {
                    $scope.view.saving = false;
                    $scope.view.participant = result.data;
                    $scope.view.showModal.join = true;
                });

        };

        /**
         * Confirm quiting the quest
         */
        $scope.quit = function() {

            $scope.view.showModal.quit = true;

        };

        $scope.hideConfirmQuit = function() {

            $scope.view.showModal.quit = false;

        };

        $scope.confirmQuit = function() {

            $scope.view.showModal.quit = false;

            $scope.view.saving = true;

            User.quit($routeParams.id)
                .then(function() {
                    $scope.view.saving = false;
                    $scope.view.participant = null;
                });
        };

        $scope.hideConfirmJoin = function() {

            $scope.view.showModal.join = false;

        };


    }]);
