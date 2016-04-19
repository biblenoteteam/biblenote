angular
    .module('BibleNote.Controllers.MainCtrl', [
        'ui.router',
    ])
    .controller('MainCtrl', [
        '$scope',
        '$state',
        function($scope, $state) {
        	$scope.selectedForm = 'login';

        }]);

