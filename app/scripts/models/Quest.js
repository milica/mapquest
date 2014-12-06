'use strict';

angular.module('mapQuestApp')
    .service('Quest', ['$q', 'Api', function ($q, Api) {

        var self = {};

        /**
         * Get all quests
         *
         * @returns {*}
         */
        self.getList = function() {

            var deferred = $q.defer();
            var quests = [];

            _.times(50, function(i) {

                var statuses = ['finished', 'running', 'pending'];
                var status = _.random(0, (statuses.length - 1));

                quests.push({
                    id: i,
                    name: 'Quest ' + i,
                    status: statuses[status]
                });

            });

            deferred.resolve({list: quests});

            return deferred.promise;

            //return Api.quests.get().$promise;

        };

        /**
         * Create new quest
         *
         * @returns {*}
         */
        self.create = function() {

            var deferred = $q.defer();

            deferred.resolve();

            return deferred.promise;

            //return Api.quests.create().$promise;

        };

        return self;

    }]);