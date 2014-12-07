'use strict';

angular.module('mapQuestApp')
    .service('Api', ['$resource', function ($resource) {

        var self = {};
        var apiUrl = 'api';

        self.login = $resource(apiUrl + '/login', {}, {
            post: {method: 'POST'}
        });

        self.logout = $resource(apiUrl + '/logout', {}, {
            post: {method: 'POST'}
        });

        self.maps = $resource(apiUrl + '/maps', {id: '@id'});

        self.quests = $resource(apiUrl + '/quests', {id: '@id'}, {
            create: {method: 'POST'}
        });

        self.participants = $resource(apiUrl + '/participants/:quest_id/:user_id', {quest_id: '@quest_id', user_id: '@user_id'}, {
            create: {method: 'POST'},
            update: {method: 'PUT'},
            remove: {method: 'DELETE'}
        });

        self.users = $resource(apiUrl + '/users', {id: '@id'});


        return self;


    }]);