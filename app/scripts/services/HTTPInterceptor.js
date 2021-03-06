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
                var error = (_.isEmpty(rejection.data.message)) ? {message: 'An error occurred! Try to logout from the upper right menu.'} : rejection.data.message;
                $rootScope.$broadcast('httpError', error);
                console.log(rejection);
                if (rejection.status === 500) {
                    $rootScope.$broadcast('reload500', true);
                }
                return $q.reject(rejection);
            }

        };


    }]);