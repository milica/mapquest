'use strict';

angular.module('mapQuestApp')
    .controller('ProfileCtrl', ['$scope', '$routeParams', 'User', function ($scope, $routeParams, User) {

        $scope.view = {};

        $scope.view.loading = true;

        $scope.view.participant = null;

        User.getUser($routeParams.id)
            .then(function(result) {

                $scope.view.participant = result.data;
                $scope.view.loading = false;

            });

    }]);
