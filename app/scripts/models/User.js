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

        return self;

    }]);