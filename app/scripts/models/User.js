'use strict';

angular.module('mapQuestApp')
    .service('User', ['$q', 'localStorageService', 'Api', function ($q, localStorageService, Api) {

        var self = {};

        /**
         * Set current session user
         *
         * @returns {*}
         */
        self.setSessionUser = function (user) {

            return localStorageService.add('user', user);

        };

        /**
         * Get current session user
         */
        self.getSessionUser = function () {

            return localStorageService.get('user');

        };

        /**
         * Login user
         *
         * @param username
         * @param password
         * @returns {*}
         */
        self.login = function(username, password) {

            var deferred = $q.defer();

            var user = {
                username: username,
                password: password,
                id: 1
            };

            self.setSessionUser(user);
            deferred.resolve();

//            Api.login.post({}, {username: username, password: password}).$promise
//                .then(function(result) {
//
//                    console.log(result);
//                    user.id = result.id;
//
//                    self.setSessionUser(user);
//
//                    deferred.resolve(user);
//
//                }, function(error) {
//                    console.log(error);
//                    deferred.reject(error.message);
//                });

            return deferred.promise;

        };

        /**
         * Log out the user
         *
         * @returns {*}
         */
        self.logout = function() {

            localStorageService.remove('user');

            var deferred = $q.defer();

            deferred.resolve();

            return deferred.promise;

            //return Api.logout.post().$promise;

        };

        /**
         * Get list of participants for particular quest
         *
         * @param questId
         * @returns {*}
         */
        self.getParticipants = function(questId) {

            var deferred = $q.defer();

            var participants = [];

            _.times(50, function(i) {

                participants.push({
                    id: i,
                    name: 'Participant ' + i,
                    score: _.random(1, 7),
                    rank: _.random(1, 50),
                    path: [
                        {id_area: 1, status: 0},
                        {id_area: 2, status: 0},
                        {id_area: 3, status: 0},
                        {id_area: 4, status: 0},
                        {id_area: 5, status: 0},
                        {id_area: 6, status: 0}
                    ]
                });

            });

            deferred.resolve({list: participants});

            return deferred.promise;

            //return Api.participants.get({quest_id: questId}).$promise;
        };

        /**
         * Get user by id
         *
         * @param id
         * @returns {*}
         */
        self.getUser = function(id) {

            var deferred = $q.defer();

            id = (id === 'mine') ? self.getSessionUser().id : id;

            var quests = [];

            _.times(50, function(i) {

                quests.push({
                    id: i,
                    name: 'Quest ' + i,
                    score: _.random(1, 7),
                    rank: _.random(1, 50)
                });

            });

            var user = {
                id: 1,
                name: 'Some User',
                quests: quests
            };

            deferred.resolve({data: user});

            return deferred.promise;

            //return Api.users.get({id: id}).$promise;
        };

        /**
         * Get participant info for particular quest
         *
         * @param questId
         * @returns {*}
         */
        self.getParticipant = function(questId) {

            var userId = self.getSessionUser();

            var deferred = $q.defer();

            var participant = {
                id: 1,
                score: 1,
                rank: 10,
                path: [
                    {
                        id_area: 1,
                        status: 0
                    },
                    {
                        id_area: 2,
                        status: 0
                    },
                    {
                        id_area: 3,
                        status: 0
                    },
                    {
                        id_area: 4,
                        status: 0
                    },
                    {
                        id_area: 5,
                        status: 0
                    },
                    {
                        id_area: 6,
                        status: 0
                    }
                ]
            };

            deferred.resolve({data: participant});

            return deferred.promise;

            //return Api.participants.get({quest_id: questId, user_id: userId}).$promise;

        };

        /**
         * Join the quest (create new participant)
         *
         * @param questId
         * @returns {*}
         */
        self.join = function(questId) {

            var userId = self.getSessionUser();

            var deferred = $q.defer();

            var participant = {
                score: 1,
                rank: 10,
                path: [
                    {
                        id_area: 1,
                        status: 1
                    },
                    {
                        id_area: 2,
                        status: 0
                    },
                    {
                        id_area: 3,
                        status: 1
                    },
                    {
                        id_area: 4,
                        status: 1
                    }
                ]
            };

            deferred.resolve({data: participant});

            return deferred.promise;

            //return Api.participants.create({quest_id: questId, user_id: userId}).$promise;

        };

        /**
         * Quit the quest
         *
         * @param questId
         * @returns {*}
         */
        self.quit = function(questId) {

            var userId = self.getSessionUser();
            var deferred = $q.defer();

            deferred.resolve({data: 'removed'});

            return deferred.promise;

            //return Api.participants.remove({quest_id: questId, user_id: userId}).$promise;

        };

        return self;

    }]);