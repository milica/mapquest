'use strict';

angular.module('mapQuestApp')
    .service('Map', ['$q', 'Api', function ($q, Api) {

        var self = {};

        /**
         * Get all maps
         *
         * @returns {*}
         */
        self.getList = function() {

            return Api.map.get().$promise;

        };

        /**
         * Get map by id
         *
         * @param id
         * @returns {*}
         */
        self.getItem = function(id) {

            return Api.map.get({id: id}).$promise;

        };

        return self;

    }]);