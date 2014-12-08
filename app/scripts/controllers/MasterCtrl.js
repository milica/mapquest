'use strict';

angular.module('mapQuestApp')
    .controller('MasterCtrl', ['$rootScope', '$route', 'User', function ($rootScope, $route, User) {

        if (navigator.userAgent.match(/Android/i)) {
            window.scrollTo(0, 1);
        }

        $rootScope.$on('reload500', function() {
            console.log('force logout and reload');
            User.removeSessionUser();
            $route.reload();
        });

    }]);
