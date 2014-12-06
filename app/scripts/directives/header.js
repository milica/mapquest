'use strict';

angular.module('mapQuestApp')
    .directive('header', ['$templateCache', function ($templateCache) {
        return {
            replace: true,
            scope: {
                title: '@'
            },
            template: $templateCache.get('views/partials/header.html'),
            link: function(scope) {

                scope.view = {};

                /**
                 * Toggle menu visibility
                 */
                scope.toggleMenu = function() {

                    scope.view.menuOpen = !scope.view.menuOpen;

                };

            }
        };
    }]);