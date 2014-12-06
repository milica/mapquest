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

            var deferred = $q.defer();
            var quests = [];

            _.times(10, function(i) {

                quests.push({
                    id: i,
                    name: 'Map ' + i
                });

            });

            deferred.resolve({list: quests});

            return deferred.promise;

            //return Api.quests.get().$promise;

        };

        return self;

    }]);