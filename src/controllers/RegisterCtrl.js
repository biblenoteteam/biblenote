angular
    .module('BibleNote.Controllers.RegisterCtrl', [
        'ui.router',
    ])
    .controller('RegisterCtrl', [
        '$scope',
        '$state',
        '$rootScope',
        function($scope, $state, $rootScope) {

console.log($rootScope.currentState);
        }]);

