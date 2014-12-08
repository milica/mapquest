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
         * Remove current session user
         *
         * @returns {*}
         */
        self.removeSessionUser = function () {

            return localStorageService.remove('user');

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

                    user.id = result.user_id;

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
            //return Api.login.delete().$promise;

        };

        /**
         * Get user by id
         *
         * @param id
         * @returns {*}
         */
        self.getUser = function(id) {

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

            return Api.quit.update({id: questId}).$promise;

        };

        return self;

    }]);