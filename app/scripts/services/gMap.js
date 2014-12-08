'use strict';


angular.module('mapQuestApp')
    .service('gMap', ['$q', '$rootScope',  function($q, $rootScope) {

        var self = {};

        /**
         * Map object
         *
         * @type {Object}
         */
        self.map = null;

        /**
         * Map bounds
         *
         * @type {Object}
         */
        self.bounds = null;

        /**
         * List of polies loaded on map
         *
         * @type {Array}
         */
        self.polies = [];

        /**
         * List of areas (polies' models) loaded on map
         *
         * @type {Array}
         */
        self.areas = [];

        /**
         * Current quest loaded with map
         *
         * @type {null}
         */
        self.quest = null;

        /**
         * Event listeners object
         *
         * @type {Object}
         */
        self.listeners = {};

        /**
         * Map default options
         *
         * @type {Object}
         */
        self.options = {
            zoom: 14,
            mapTypeControlOptions: { mapTypeIds: [] },
            streetViewControl: false,
            zoomControl: true,
            zoomControlOptions: {style: google.maps.ZoomControlStyle.SMALL},
            disableDoubleClickZoom: true
        };

        /**
         * Draw area on the map
         *
         * @param area
         */
        self.drawArea = function(area) {

            var latlng;
            var latlngs = [];
            var bounds = self.getBounds();
            var center = self.getLatLng(area.latitude, area.longitude);

            _.each(area.bounds, function(coords) {

                latlng = self.getLatLng(coords[0], coords[1]);

                latlngs.push(latlng);
                bounds.extend(latlng);
            });

            var poly = self.getPolygon({
                paths: latlngs,
                strokeWeight: 1,
                strokeColor: area.status ? '#003118' : '#cc0000',
                strokeOpacity: 1.0,
                name: area.title,
                fillColor: area.status ? '#005826' : '#ff0000'
            });

            poly.setMap(self.map);

            if (self.quest && self.quest.status === 'running' && self.quest.participant) {
                self.listeners['list-' + area.id] = google.maps.event.addListener(poly, 'click', function(e) {
                    self.handleAreaClick(e, area, poly);
                });
            }

            self.polies.push(poly);

            self.bounds.extend(center);
//            self.bounds.extend(bounds.getCenter());

        };

        /**
         * Remove area from the map and its listeners
         *
         * @param area
         * @param poly
         */
        self.removeArea = function(area, poly) {

            var listener = self.listeners['list-' + area.id];

            if (!_.isUndefined(listener)) {
                poly.setMap(null);
                google.maps.event.removeListener(listener);
            }

        };

        /**
         * Handle area click event
         *
         * @param e
         * @param area
         * @param poly
         */
        self.handleAreaClick = function(e, area, poly) {

            var isWithinPolygon;

            if (area.status) {

                $rootScope.$broadcast('area-click:done', area, poly);

            } else {
                $rootScope.$broadcast('area-click:start', true);

                self.getCurrentLocation()
                    .then(function(position) {

                        isWithinPolygon = poly.containsLatLng(position);

                        $rootScope.$broadcast('area-click:end', area, poly, isWithinPolygon);

                    });
            }


        };

        /**
         * Mark area as done
         *
         * @param area
         * @param poly
         */
        self.markAsDone = function(area, poly) {

            self.removeArea(area, poly);

            area.status = 1;

            self.drawArea(area);

        };

        /**
         * Load google map and set its bound and areas if provided
         *
         * @param options
         * @param options.lat
         * @param options.lng
         * @param options.el
         * @param options.areas
         * @param options.quest
         * @returns {Object}
         */
        self.loadMap = function(options) {

            self.options.center = self.getLatLng(options.lat, options.lng);

            self.map = self.getMap(options.el, self.options);
            self.bounds = self.getBounds();

            if (options.areas) {

                self.areas = options.areas;
                self.quest = options.quest;

                _.each(options.areas, function(area) {
                    self.drawArea(area);
                });

                self.map.panTo(self.bounds.getCenter());

                self.map.fitBounds(self.bounds);

                self.getCurrentLocation();
            }

            return self.map;

        };

        /**
         * Show all areas on the map
         */
        self.showAll = function() {

            self.map.panTo(self.bounds.getCenter());
            self.map.fitBounds(self.bounds);

        };

        /**
         * Get map instance
         *
         * @param el
         * @param options
         * @returns {google.maps.Map}
         */
        self.getMap = function(el, options) {

            return new google.maps.Map(el, options);

        };

        /**
         * Get polygon instance
         *
         * @param options
         * @returns {google.maps.Polygon}
         */
        self.getPolygon = function(options) {

            return new google.maps.Polygon(options);

        };

        /**
         * Get bounds instance
         *
         * @returns {google.maps.LatLngBounds}
         */
        self.getBounds = function() {

            return new google.maps.LatLngBounds();

        };

        /**
         * Get latlng instance
         *
         * @param lat
         * @param lng
         * @returns {google.maps.LatLng}
         */
        self.getLatLng = function(lat, lng) {

            return new google.maps.LatLng(lat, lng);

        };

        /**
         * Get marker instance
         *
         * @param options
         * @returns {google.maps.Marker}
         */
        self.getMaker = function(options) {

            return new google.maps.Marker(options);

        };

        /**
         * Get current location
         *
         * @param move
         * @returns {*}
         */
        self.getCurrentLocation = function(move) {

            var deferred = $q.defer();

            if(navigator.geolocation) {

                navigator.geolocation.getCurrentPosition(function(position) {

                    var p = self.getLatLng(position.coords.latitude, position.coords.longitude);

                    if (self.currentPosition) {
                        self.currentPosition.setMap(self.map);
                    }

                    self.currentPosition = self.getMaker({
                        position: p,
                        map: self.map,
                        flat: true,
                        icon: {
                            path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                            scale: 5,
                            fillOpacity: 1,
                            strokeWeight: 1,
                            fillColor: '#005826',
                            strokeColor: '#730000'
                        }
                    });

                    if (move) {
                        self.map.setCenter(p);
                    }

                    deferred.resolve(p);

                }, function() {
                    var error = 'The Geolocation service failed.';

                    $rootScope.$broadcast('httpError', {message: error});
                    deferred.reject(error);
                });
            } else {
                var error = 'Your browser doesn\'t support geolocation.';

                $rootScope.$broadcast('httpError', {message: error});
                deferred.reject(error);
            }

            return deferred.promise;
        };

        /**
         * Map detach functionality
         */
        self.detachListeners = function() {

            _.each(self.listeners, function(listener) {
                google.maps.event.removeListener(listener);
            });

            self.listeners = {};

        };

        return self;

    }]);