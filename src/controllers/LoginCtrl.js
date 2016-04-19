angular
    .module('BibleNote.Controllers.LoginCtrl', [
        'ui.router',
    ])
    .controller('LoginCtrl', [
        '$scope',
        '$state',
        '$rootScope',
        function($scope, $state, $rootScope) {
console.log($rootScope.currentState);

        }]);

