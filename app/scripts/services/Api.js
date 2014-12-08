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

        self.map = $resource(apiUrl + '/map/:id', {id: '@id'});

        self.quests = $resource(apiUrl + '/quests/:id', {id: '@id'}, {
            create: {method: 'POST'}
        });

        self.participants = $resource(apiUrl + '/participants/:quest_id/:user_id', {quest_id: '@quest_id', user_id: '@user_id'}, {
            create: {method: 'POST'},
            update: {method: 'PUT'},
            remove: {method: 'DELETE'}
        });

        self.users = $resource(apiUrl + '/user/:id', {id: '@id'});


        return self;


    }]);