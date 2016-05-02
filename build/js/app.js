(function () { 'use strict';
angular.module('BibleNote', [
  'BibleNote.Routes',


]);
;angular.module('BibleNote.Routes', [
  'ui.router',
  'ngMaterial',

  'BibleNote.Controllers.MainCtrl',
  'BibleNote.Controllers.LoginCtrl',
  'BibleNote.Controllers.RegisterCtrl',
  'BibleNote.Controllers.MyNotesCtrl',
  'BibleNote.Controllers.AddNotesCtrl',
  'BibleNote.Controllers.UsersCtrl',
  'BibleNote.Controllers.MyProfilCtrl',

])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$mdDateLocaleProvider',
  '$httpProvider',
  function ($stateProvider, $urlRouterProvider, $mdDateLocaleProvider, $httpProvider) {
    $stateProvider
      .state('main', {
        url: '/main',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        parent: 'main',
        controller: 'LoginCtrl',
      })
       .state('register', {
        url: '/register',
        templateUrl: 'views/register.html',
        parent: 'main',
        controller: 'RegisterCtrl',
      })
       .state('mynotes', {
        url: '/mynotes',
        templateUrl: 'views/mynotes.html',
        parent: 'main',
        controller: 'MyNotesCtrl',
      })
        .state('addnotes', {
        url: '/addnotes',
        templateUrl: 'views/addnotes.html',
        parent: 'main',
        controller: 'AddNotesCtrl',
      })
        .state('users', {
        url: '/users',
        templateUrl: 'views/users.html',
        parent: 'main',
        controller: 'UsersCtrl',
      })
        .state('myprofil', {
        url: '/myprofil',
        templateUrl: 'views/myprofil.html',
        parent: 'main',
        controller: 'MyProfilCtrl',
      })
     

    $urlRouterProvider.otherwise('/main');



  }
]).run(function ($state,$rootScope,$localStorage) {
  $rootScope.$on('$stateChangeStart', 
function(event, toState, toParams, fromState, fromParams){ 
    $rootScope.currentState = toState.name;

    if ($localStorage.user){
      $rootScope.logged = true;
    }
    else if(toState.name != 'login' && toState.name != 'register'){
      $rootScope.logged = false;
      event.preventDefault();
      $state.go('login');
    }
})

    
});
;angular.module('BibleNote.Services.AuthorizationSrvc', [
    'ngStorage'
])

.service('AuthorizationSrvc', [
    '$http',
    '$localStorage',
    '$state',
    '$rootScope',
    '$window',
    function($http, $localStorage, $state, $rootScope, $window) {

        var user = null;

        if ($localStorage.user) {
            user = $localStorage.user;
        };

        this.isLogged = function(){
            if (!$localStorage.user) {
                $state.go('login');
            }
        };
        this.login = function(user){
            var url='http://notatka.52prawdy.pl/restAPI/login/';
            var obj={
                'email': user.email,
                'password': user.password,
            };
            var req={
                'method': 'POST',
                'url': url,
                'data': obj,
                'headers':{
                    'Content-Type':'text/plain',
                }
            };
            return $http(req);
        };
        this.successLogin = function(user){
            $localStorage.user = user;
            $rootScope.logged = true;
            $state.go('mynotes');

        };
        this.logOut = function(){
            $localStorage.user = null;
            $rootScope.logged = false;
            $state.go('login');
        };
        this.getUsers = function(){
            var user= $localStorage.user;
            var url= 'http://notatka.52prawdy.pl/restAPI/users/';
            var obj={
                'token': user.token,
                'user_id': user.id,
            };
            var req= {
                'method': 'POST',
                'data': obj,
                'url': url,
                'headers':{
                    'Content-Type': 'text/plain',
                }
            };            
            return $http(req);
        };
        this.register = function(user){
            var url='http://notatka.52prawdy.pl/restAPI/register/';
            var obj={
                'name': user.surname,
                'lastname': user.name,
                'email': user.email,
                'password': user.password1,
            };
            var req={
                'method': 'POST',
                'url': url,
                'data': obj,
                'headers':{
                    'Content-Type':'text/plain',
                },
            };
            return $http(req);

        }




}]);
;angular
    .module('BibleNote.Controllers.AddNotesCtrl', [
        'ui.router',
    ])
    .controller('AddNotesCtrl', [
        '$scope',
        '$state',
        '$rootScope',
        function($scope, $state, $rootScope) {
    






        }]);
;angular
    .module('BibleNote.Controllers.LoginCtrl', [
        'ui.router',
    ])
    .controller('LoginCtrl', [
        '$scope',
        '$state',
        '$rootScope',
        'AuthorizationSrvc',
        function($scope, $state, $rootScope, AuthorizationSrvc) {
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
            $scope.login = function() {
                AuthorizationSrvc.login($scope.loginVariables).then(function(data){
                        AuthorizationSrvc.successLogin(data.data);

                    }, function(data){


                    })
            };




        }
    ]);
;angular
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
            $scope.logOut = function(){
                AuthorizationSrvc.logOut();
            };

        }
    ]);
;angular
    .module('BibleNote.Controllers.MyNotesCtrl', [
        'ui.router',
    ])
    .controller('MyNotesCtrl', [
        '$scope',
        '$state',
        '$rootScope',
        function($scope, $state, $rootScope) {
    






        }]);
;angular
    .module('BibleNote.Controllers.MyProfilCtrl', [
        'ui.router',
    ])
    .controller('MyProfilCtrl', [
        '$scope',
        '$state',
        '$rootScope',
        function($scope, $state, $rootScope) {
    






        }]);
;angular
    .module('BibleNote.Controllers.RegisterCtrl', [
        'ui.router',
    ])
    .controller('RegisterCtrl', [
        '$scope',
        '$state',
        '$rootScope',
        'AuthorizationSrvc',
        function($scope, $state, $rootScope, AuthorizationSrvc) {
        	$scope.registerVariables = {
        		'surname' : '',
        		'name' : '',
        		'email' : '',
        		'password1' : '',
        		'password2' : '',
				};
				var validateEmail = function(email) {
    				var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   						return re.test(email);
				};
				$scope.validator = function() {
                if ($scope.registerVariables.surname.length > 1 && $scope.registerVariables.surname.length < 30 && $scope.registerVariables.name.length > 2 && $scope.registerVariables.name.length < 30 && $scope.registerVariables.password1.length > 5 && $scope.registerVariables.password1.length < 40 && $scope.registerVariables.password1 == $scope.registerVariables.password2 && validateEmail($scope.registerVariables.email)) {
                    return false;
                	} else {
                    return true;
                }
            };

            	$scope.register = function(){
            		AuthorizationSrvc.register($scope.registerVariables).then(function(data){
            			AuthorizationSrvc.successLogin(data.data[0]);

            		}, function(data){


            		})
            	};
        }]);

;angular
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
})();