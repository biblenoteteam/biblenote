angular
    .module('BibleNote.Controllers.MainCtrl', [
        'ui.router',
        'BibleNote.Services.AuthorizationSrvc',
    ])
    .controller('MainCtrl', [
        '$scope',
        '$state',
        'AuthorizationSrvc',
        '$rootScope',
        function($scope, $state, AuthorizationSrvc, $rootScope) {



            $scope.init = function() {
                AuthorizationSrvc.isLogged();
            };
            $scope.init();

            $scope.goMain = function(){
                $state.reload();
            };


        }
    ]);
