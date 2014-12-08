'use strict';

angular.module('mapQuestApp')
    .factory('HTTPInterceptor', ['$q', '$rootScope', function ($q, $rootScope) {

        return {
            request: function(config) {
                return config || $q.when(config);
            },

            requestError: function(rejection) {
                $rootScope.$broadcast('httpError', 'An error occurred while attempting to send request to ' + rejection.config.url);
                return $q.reject(rejection);
            },

            response: function(response) {
                // intercept response success
                return response || $q.when(response);
            },

            responseError: function(rejection) {
                var error = (_.isEmpty(rejection.data.message)) ? {message: 'An error occurred while attempting to retrieve response from ' + rejection.config.url} : rejection.data.message;
                $rootScope.$broadcast('httpError', error);
                return $q.reject(rejection);
            }

        };


    }]);