'use strict';

angular.module('mapQuestApp')
    .controller('QuestCtrl', ['$scope', '$rootScope', '$routeParams', '$q', 'Quest', 'User', 'gMap', function ($scope, $rootScope, $routeParams, $q, Quest, User, gMap) {

        $scope.view = {};

        $scope.view.loading = true;

        $scope.view.quest = null;
        $scope.view.participant = null;

        $scope.view.tab = 'info';

        $scope.view.showModal = {
            quit: false,
            join: false,
            hit: false,
            miss: false,
            done: false,
            share: false
        };

        $q.all([
                Quest.getItem($routeParams.id),
                User.getParticipant($routeParams.id)
            ]).then(function(result) {

                var quest = result[0].data;
                var participant = result[1].data;

                console.log(quest);

                $scope.transformAreas(quest, participant);

                $scope.view.quest = quest;
                $scope.view.participant = participant;

                $scope.view.loading = false;

            });

        /**
         * Transform area in order to merge participants score with loaded map
         *
         * @param quest
         * @param participant
         */
        $scope.transformAreas = function(quest, participant) {

            if (!participant) {

                quest.isParticipating = false;

            } else {

                quest.isParticipating = true;

                _.each(quest.map.areas, function(area) {

                    var path = _.find(participant.path, function(path) {
                        return path.id_area === area.id;
                    });

                    area.status = path.status;
                });
            }

        };

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
                    $scope.view.quest.isParticipating = true;

                    gMap.attachListeners();

                });

        };

        /**
         * Show confirm quiting the quest dialog
         */
        $scope.quit = function() {

            $scope.view.showModal.quit = true;

        };

        /**
         * Confirm quiting the quest
         */
        $scope.confirmQuit = function() {

            $scope.view.showModal.quit = false;

            $scope.view.saving = true;

            User.quit($routeParams.id)
                .then(function() {
                    $scope.view.saving = false;
                    $scope.view.participant = null;

                    $scope.view.quest.isParticipating = false;
                    gMap.detachListeners();
                });
        };

        /**
         * Hide join confirm dialog
         */
        $scope.hideConfirmJoin = function() {

            $scope.view.showModal.join = false;

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

        /**
         * Hide particular modal
         *
         * @param modal
         */
        $scope.hideModal = function(modal) {

            $scope.view.showModal[modal] = false;

        };

        $scope.shareResult = function() {

            $scope.view.showModal.share = true;

        };

        $scope.initShare = function(what) {

            $scope.view.showModal.share = false;

            var score = $scope.view.participant.score;
            var rank = $scope.view.participant.rank;
            var total = $scope.view.participant.path.length;

            var text = 'I won ' + score + ' out of  ' + total + '! My rank is ' + rank + '! Beat me if you can!';
            var url;

            if (what === 'tw') {
                url = 'https://twitter.com/share?text=' + text;
                window.open(url, '_blank');
            } else if (what === 'fb') {
                //url = 'https://www.facebook.com/dialog/share?app_id='+ appConfig.fbAppId +'&display=page&href=http://mapquest.kamilica.koding.io/api/share/' + $scope.participant.id + '&redirect_uri=http://mapquest.kamilica.koding.io';
            }

        };

        /**
         * Handle area click event start
         */
        var onAreaClickStartOff = $rootScope.$on('area-click:start', function() {

            if (!$scope.view.participant) { return false; }

            $scope.view.loading = true;

            if(!$scope.$$phase) { $scope.$digest(); }

        });

        /**
         * Handle area click event done
         */
        var onAreaClickDoneOff = $rootScope.$on('area-click:done', function() {

            if (!$scope.view.participant) { return false; }

            $scope.view.showModal.done = true;

            if(!$scope.$$phase) { $scope.$digest(); }

        });

        /**
         * Handle area click event end
         */
        var onAreaClickEndOff = $rootScope.$on('area-click:end', function(e, area, poly, isWithinPolygon) {

            if (!$scope.view.participant) { return false; }

            $scope.view.loading = false;

            if (isWithinPolygon) {

                $scope.view.showModal.hit = true;

                gMap.markAsDone(area, poly);

                Quest.markAreaAsDone($routeParams.id, area.id)
                    .then(function(result) {
                        area.status = 1;
                        //$scope.view.participant = result.data;
                    });

            } else {
                $scope.view.showModal.miss = true;
            }

            if(!$scope.$$phase) { $scope.$digest(); }
        });

        $scope.$on('$destroy', function() {
            onAreaClickStartOff();
            onAreaClickDoneOff();
            onAreaClickEndOff();
        });



    }]);
