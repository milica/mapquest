'use strict';

angular.module('mapQuestApp')
    .service('Quest', ['$q', 'Api', function ($q, Api) {

        var self = {};

        /**
         * Get all quests
         *
         * @returns {*}
         */
        self.getList = function(mapId) {

            if (mapId) {
                return Api.questByMap.get({id: mapId}).$promise;
            } else {
                return Api.quests.get().$promise;
            }

        };

        /**
         * Get quest by id
         *
         * @param id
         * @returns {*}
         */
        self.getItem = function(id) {

            return Api.quests.get({id: id}).$promise;

        };

        /**
         * Create new quest
         *
         * @returns {*}
         */
        self.create = function(quest) {

            return Api.quests.create({}, quest).$promise;

        };

        /**
         * Mark area as visited
         *
         * @param id
         * @param areaId
         * @returns {*}
         */
        self.markAreaAsDone = function(id, areaId) {

            return Api.path.update({id: areaId}).$promise;

        };

        return self;

    }]);