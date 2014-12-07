'use strict';

angular.module('mapQuestApp')
    .controller('LoginCtrl', ['$scope', '$location', 'User', function ($scope, $location, User) {

        $scope.view = {};

        $scope.view.form = {};

        /**
         * Login user
         *
         * @returns {boolean}
         */
        $scope.login = function() {

            $scope.view.error = '';

            if ($scope.form.$invalid) {
                $scope.form.$setDirty();
                return false;
            }

            $scope.view.loading = true;

            User.login($scope.view.form.username, $scope.view.form.password)
                .then(function() {

                    $scope.view.loading = false;
                    $location.path('/');

                }, function() {
                    $scope.view.loading = false;
                });


        };

    }]);
