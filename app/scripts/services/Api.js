'use strict';

angular.module('mapQuestApp')
    .service('Api', ['$resource', function ($resource) {

        var self = {};
        var apiUrl = '/api';

        self.maps = $resource(apiUrl + '/maps', {id: '@id'});


        return self;


    }]);