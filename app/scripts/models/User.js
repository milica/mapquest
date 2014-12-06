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
                password: password
            };

            self.setSessionUser(user);

            deferred.resolve();

//            Api.login.post({}, {username: username, password: password}).$promise
//                .then(function(result) {
//
//                    user.id = result.id;
//
//                    self.setSessionUser(user);

//                    deferred.resolve(user);
//
//                }, function(error) {
//                    console.log(error);
//                    deferred.reject(error.message);
//                });

            return deferred.promise;

        };

        self.getParticipant = function(questId) {

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
                        status: 1
                    },
                    {
                        id_area: 3,
                        status: 1
                    }
                ]
            };

            deferred.resolve({data: participant});

            return deferred.promise;

            //return Api.participants.get({quest_id: questId, user_id: userId}).$promise;

        };

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
                        status: 1
                    },
                    {
                        id_area: 3,
                        status: 1
                    }
                ]
            };

            deferred.resolve({data: participant});

            return deferred.promise;

            //return Api.participants.create({quest_id: questId, user_id: userId}).$promise;

        };

        self.quit = function(questId) {

            var userId = self.getSessionUser();
            var deferred = $q.defer();

            deferred.resolve({data: 'removed'});

            return deferred.promise;

            //return Api.participants.remove({quest_id: questId, user_id: userId}).$promise;

        };

        return self;

    }]);