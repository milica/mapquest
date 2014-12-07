'use strict';

angular.module('mapQuestApp')
    .directive('error', ['$templateCache', function ($templateCache) {
        return {
            restrict: 'E',
            replace: true,
            template: $templateCache.get('views/partials/error.html'),
            link: function(scope) {

                scope.errors = [];

                scope.$on('httpError', function (e, message) {

                    var messages = _.pluck(scope.errors, 'message');

                    if (!_.contains(messages, message.message)) {
                        scope.errors.push(message);
                    }

                    if(!scope.$$phase) { scope.$digest(); }

                });

                /**
                 * Close the error alert
                 */
                scope.closeErrors = function () {
                    scope.errors = [];
                };

            }
        };
    }]);