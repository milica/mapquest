'use strict';

angular.module('mapQuestApp')
    .controller('MasterCtrl', ['$scope', '$window', function ($scope, $window) {

        if (navigator.userAgent.match(/Android/i)) {
            $window.scrollTo(0,1);
        }

    }]);
