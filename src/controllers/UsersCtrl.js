angular
    .module('BibleNote.Controllers.UsersCtrl', [
        'ui.router',
    ])
    .controller('UsersCtrl', [
        '$scope',
        '$state',
        '$rootScope',
        'AuthorizationSrvc',
        function($scope, $state, $rootScope, AuthorizationSrvc) {
    	$scope.users=[];

        	$scope.getUsers = function(){
            		AuthorizationSrvc.getUsers().then(function(data){
            		$scope.users=data.data;

            		}, function(data){


            		})
            	};

            	$scope.getUsers();



        }]);
