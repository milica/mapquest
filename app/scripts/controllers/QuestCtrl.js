'use strict';

angular.module('mapQuestApp')
    .controller('QuestCtrl', ['$scope', '$rootScope', '$routeParams', '$q', '$route', 'Quest', 'User', 'gMap', function ($scope, $rootScope, $routeParams, $q, $route, Quest, User, gMap) {

        $scope.view = {};

        $scope.view.loading = true;

        $scope.view.quest = null;
        $scope.view.map = null;

        $scope.view.tab = 'info';

        $scope.view.showModal = {
            quit: false,
            join: false,
            hit: false,
            miss: false,
            done: false,
            share: false
        };

        Quest.getItem($routeParams.id)
            .then(function(result) {

                var quest = result.data;

                $scope.view.map = {areas: quest.areas};

                $scope.transformAreas(quest);

                //$scope.view.quest = quest;

                $scope.view.loading = false;

            });

        /**
         * Transform area in order to merge participants score with loaded map
         *
         * @param quest
         */
        $scope.transformAreas = function(quest) {

            if (quest.participant) {

                _.each(quest.areas, function(area) {

                    var status = _.find(quest.participant, function(path, areaId) {
                        return areaId === area.id;
                    });

                    area.status = status;
                });

            }

            quest.start = new Date(quest.start * 1000);
            quest.finish = new Date(quest.finish * 1000);

            $scope.view.quest = quest;

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
                .then(function() {
                    $scope.view.saving = false;
                    $route.reload();
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
                    $route.reload();
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

            var score = $scope.view.quest.participant.score;
            var rank = $scope.view.quest.participant.rank;

            var text = 'I won ' + score + '! My rank is ' + rank + '! Beat me if you can!';
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

            $scope.view.loading = true;

            if(!$scope.$$phase) { $scope.$digest(); }

        });

        /**
         * Handle area click event done
         */
        var onAreaClickDoneOff = $rootScope.$on('area-click:done', function() {

            $scope.view.showModal.done = true;

            if(!$scope.$$phase) { $scope.$digest(); }

        });

        /**
         * Handle area click event end
         */
        var onAreaClickEndOff = $rootScope.$on('area-click:end', function(e, area, poly, isWithinPolygon) {

            $scope.view.loading = false;

            if (isWithinPolygon) {

                $scope.view.showModal.hit = true;

                gMap.markAsDone(area, poly);

                Quest.markAreaAsDone($routeParams.id, area.id)
                    .then(function() {
                        area.status = true;
                        var scoreArr = $scope.view.quest.participant_data.score.split('/');
                        var score = scoreArr[0] + 1;
                        $scope.view.quest.participant_data.score = score + '/' + scoreArr[1];
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
