angular
    .module('BibleNote.Controllers.LoginCtrl', [
        'ui.router',
    ])
    .controller('LoginCtrl', [
        '$scope',
        '$state',
        '$rootScope',
        function($scope, $state, $rootScope) {
            $scope.loginVariables = {
                'email': '',
                'password': ''
            };

            $scope.validator = function() {
                if ($scope.loginVariables.password.length > 3 && $scope.loginVariables.password.length < 30 && $scope.loginVariables.email.length < 50 && $scope.loginVariables.email.length > 5 && $scope.loginVariables.email.indexOf('@') > 0) {
                    return false;
                } else {
                    return true;
                }
            };





        }
    ]);
