'use strict';

angular.module('mapQuestApp')
    .factory('HTTPInterceptor', ['$q', '$rootScope', function ($q, $rootScope) {

        return {
            'request': function(config) {
                // intercept request success
                return config || $q.when(config);
            },

            'requestError': function(rejection) {
                // intercept request error
                $rootScope.$broadcast('httpError', 'An error occurred while attempting to send request to ' + rejection.config.url);
                return $q.reject(rejection);
            },

            'response': function(response) {
                // intercept response success
                return response || $q.when(response);
            },

            'responseError': function(rejection) {
                // intercept response error
                var error = (_.isEmpty(rejection.data.message)) ? {message: 'An error occurred while attempting to retrieve response from ' + rejection.config.url} : rejection.data;
                $rootScope.$broadcast('httpError', error);
                return $q.reject(rejection);
            }

        };


    }]);