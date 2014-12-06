'use strict';

angular.module('mapQuestApp')
    .service('Api', ['$resource', function ($resource) {

        var self = {};
        var apiUrl = '/api';

        self.login = $resource(apiUrl + '/login', {}, {
            post: {method: 'POST'}
        });

        self.maps = $resource(apiUrl + '/maps', {id: '@id'});

        self.quests = $resource(apiUrl + '/quests', {id: '@id'}, {
            create: {method: 'POST'}
        });


        return self;


    }]);