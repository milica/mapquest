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
                    status: statuses[status],
                    startDate: '2014-10-11',
                    finishDate: '2014-12-11'
                });

            });

            deferred.resolve({list: quests});

            return deferred.promise;

            //return Api.quests.get().$promise;

        };

        /**
         * Get quest by id
         *
         * @param id
         * @returns {*}
         */
        self.getItem = function(id) {

            var deferred = $q.defer();

            var statuses = ['finished', 'running', 'pending'];
            var status = _.random(0, (statuses.length - 1));

            deferred.resolve({data: {
                id: 123124,
                name: 'Quest some',
                status: statuses[status],
                startDate: '2014-10-11',
                finishDate: '2014-12-11',
                map: {
                    title: 'New York',
                    areas: [
                        {
                            id: 1,
                            title: 'Area 1',
                            bounds: [],
                            latitude: 0,
                            longitude: 0
                        },
                        {
                            id: 2,
                            title: 'Area 2',
                            bounds: [],
                            latitude: 0,
                            longitude: 0
                        },
                        {
                            id: 3,
                            title: 'Area 3',
                            bounds: [],
                            latitude: 0,
                            longitude: 0
                        }
                    ]
                }
            }});

            return deferred.promise;

            //return Api.quests.get({id: id}).$promise;

        };

        /**
         * Create new quest
         *
         * @returns {*}
         */
        self.create = function(quest) {

            console.log(quest);
            var deferred = $q.defer();

            deferred.resolve();

            return deferred.promise;

            //return Api.quests.create().$promise;

        };

        return self;

    }]);