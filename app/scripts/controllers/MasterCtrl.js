'use strict';

angular.module('mapQuestApp')
    .controller('MasterCtrl', [function () {

        if (navigator.userAgent.match(/Android/i)) {
            window.scrollTo(0, 1);
        }

    }]);
