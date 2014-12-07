'use strict';

angular.module('mapQuestApp')
    .directive('header', ['$templateCache', '$location', 'User', function ($templateCache, $location, User) {
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

                /**
                 * Logout user
                 */
                scope.logout = function() {
                    User.logout()
                        .then(function() {
                            //$route.reload();
                            $location.path('/login');
                        });

                };

            }
        };
    }]);