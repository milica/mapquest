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

        self.questByMap = $resource(apiUrl + '/quests-by-map/:id', {id: '@id'});

        self.participants = $resource(apiUrl + '/participant/:id', {id: '@id'}, {
//            create: {method: 'POST'},
//            update: {method: 'PUT'},
//            remove: {method: 'DELETE'}
        });

        self.join = $resource(apiUrl + '/join', {}, {
            post: {method: 'POST'}
        });

        self.quit = $resource(apiUrl + '/quit/:id', {id: '@id'}, {
            update: {method: 'PUT'}
        });

        self.path = $resource(apiUrl + '/path/:id', {id: '@id'}, {
            update: {method: 'PUT'}
        });

        self.users = $resource(apiUrl + '/user/:id', {id: '@id'});


        return self;


    }]);