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
                id: 2,
                name: 'Quest some',
                status: statuses[status],
                startDate: '2014-10-11',
                finishDate: '2014-12-11',
                participants: _.random(0, 1000),
                map: {
                    id: 2,
                    title: 'Beograd',
                    areas: [
                        {
                            id: 1,
                            title: 'tosin bunar',
                            bounds: [
                                [44.83079564666987, 20.39332866668701],
                                [44.8261693083789, 20.39435863494873],
                                [44.82476915912614, 20.40285587310791],
                                [44.828786887497415, 20.406804084777832],
                                [44.8324999934906, 20.40036678314209]
                            ],
                            latitude: 44.828634576308374,
                            longitude: 20.400066375732422
                        },
                        {
                            id: 2,
                            title: 'novi beograd',
                            bounds: [
                                [44.82629105888064, 20.41186809539795],
                                [44.82251667375207, 20.410408973693848],
                                [44.81728082719224, 20.4146146774292],
                                [44.82032498188776, 20.42482852935791],
                                [44.82531704766643, 20.422167778015137]
                            ],
                            latitude: 44.821785943036446,
                            longitude: 20.41761875152588
                        },
                        {
                            id: 3,
                            title: 'blokovi',
                            bounds: [
                                [44.81429739966232, 20.397191047668457],
                                [44.81009598489741, 20.396761894226074],
                                [44.80632053954651, 20.401225090026855],
                                [44.80863455149579, 20.41238307952881],
                                [44.81344496344603, 20.413498878479004]
                            ],
                            latitude: 44.81030896960442,
                            longitude: 20.40513038635254
                        },
                        {
                            id: 4,
                            title: 'save',
                            bounds: [
                                [44.81149649049356, 20.439162254333496],
                                [44.80552888256852, 20.43778896331787],
                                [44.8018749403434, 20.451607704162598],
                                [44.80723397640544, 20.460362434387207],
                                [44.815758689575325, 20.451693534851074]
                            ],
                            latitude: 44.808816814959364,
                            longitude: 20.44907569885254
                        },
                        {
                            id: 5,
                            title: 'zemun',
                            bounds: [
                                [44.84558526294666, 20.40088176727295],
                                [44.84442901000019, 20.41306972503662],
                                [44.83676064003701, 20.4146146774292],
                                [44.83657804736018, 20.39865016937256],
                                [44.84114269070498, 20.39384365081787]
                            ],
                            latitude: 44.84108165515342,
                            longitude: 20.404229164123535
                        },
                        {
                            id: 6,
                            title: 'centar',
                            bounds: [
                                [44.81697640288321, 20.46379566192627],
                                [44.81113114448624, 20.46654224395752],
                                [44.80826918735956, 20.47400951385498],
                                [44.811313817779194, 20.483450889587402],
                                [44.81581957585145, 20.48396587371826]
                            ],
                            latitude: 44.812622795121385,
                            longitude: 20.473880767822266
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

//            console.log(quest);
//            var deferred = $q.defer();
//
//            deferred.resolve();
//
//            return deferred.promise;

            console.log(quest);

            return Api.quests.create({}, quest).$promise;

        };

        self.markAreaAsDone = function(id, areaId) {

            var deferred = $q.defer();

            deferred.resolve();

            return deferred.promise;

            //return Api.quests.update({id: id}, {area_id: areaId}).$promise;

        };

        return self;

    }]);