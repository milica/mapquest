'use strict';

angular.module('mapQuestApp')
    .directive('map', ['$timeout', 'gMap', function($timeout, gMap) {
        return {
            replace: true,
            template: '<div class="map" ng-class="{loading: view.loading}"></div>',
            scope: {
                map: '=',
                quest: '=',
                isOpen: '='
            },
            link: function(scope, element) {

                scope.view = {};
                scope.view.map = null;

                var timeoutId;

                var lat = 0;
                var lng = 0;

                /**
                 * Load map if not already loaded
                 */
                var loadMap = function() {

                    if (scope.isOpen && scope.map && !scope.view.map) {

                        scope.view.loading = true;

                        scope.cancelTimeout();

                        timeoutId = $timeout(function() {
                            scope.view.loading = false;
                            scope.view.map = gMap.loadMap({
                                lat: lat,
                                lng: lng,
                                el: element[0],
                                areas: scope.map.areas,
                                quest: scope.quest
                            });
                        }, 300);

                    }

                };

                /* init load map */
                loadMap();

                /* watch for map data available */
                scope.$watch('map', function(n, o) {
                    if (n !== o) { loadMap(); }
                });

                /* watch for map tab visibility */
                scope.$watch('isOpen', function(n, o) {
                    if (n !== o) { loadMap(); }
                });

                /**
                 * Cancel timeout initiate when loading map
                 */
                scope.cancelTimeout = function() {
                    if (angular.isDefined(timeoutId)) {
                        $timeout.cancel(timeoutId);
                        timeoutId = null;
                    }
                };

                scope.$on('$destroy', function() {
                    scope.cancelTimeout();
                    gMap.detachListeners();
                });



            }
        };
    }]);