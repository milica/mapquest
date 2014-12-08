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

            Api.login.post({}, {username: username, password: password}).$promise
                .then(function(result) {

                    console.log(result);
                    user.id = result.id;

                    self.setSessionUser(user);

                    deferred.resolve(user);

                }, function(error) {
                    deferred.reject(error);
                });

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
         * Get user by id
         *
         * @param id
         * @returns {*}
         */
        self.getUser = function(id) {

//            var deferred = $q.defer();
//
//            id = (id === 'mine') ? self.getSessionUser().id : id;
//
//            var quests = [];
//
//            _.times(50, function(i) {
//
//                quests.push({
//                    id: i,
//                    name: 'Quest ' + i,
//                    score: _.random(1, 7),
//                    rank: _.random(1, 50)
//                });
//
//            });
//
//            var user = {
//                id: 1,
//                name: 'Some User',
//                quests: quests
//            };
//
//            deferred.resolve({data: user});
//
//            return deferred.promise;

            return Api.users.get({id: id}).$promise;
        };

        /**
         * Get participants for particular quest
         *
         * @param questId
         * @returns {*}
         */
        self.getParticipants = function(questId) {

            return Api.participants.get({id: questId}).$promise;

        };

        /**
         * Join the quest (create new participant)
         *
         * @param questId
         * @returns {*}
         */
        self.join = function(questId) {

            return Api.join.post({}, {quest: questId}).$promise;

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