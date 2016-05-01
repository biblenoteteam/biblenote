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
       .state('myNotes', {
        url: '/myNotes',
        templateUrl: 'views/mynotes.html',
        parent: 'main',
        controller: 'MyNotesCtrl',
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
    else{
      $rootScope.logged = false;
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
            //rest api
            $localStorage.user = user;
            $rootScope.logged = true;
            $state.go('myNotes');
        };
        this.logOut = function(){
            $localStorage.user = null;
            $rootScope.logged = false;
            $state.go('login');
        }




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
                AuthorizationSrvc.login($scope.loginVariables);

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
    .module('BibleNote.Controllers.RegisterCtrl', [
        'ui.router',
    ])
    .controller('RegisterCtrl', [
        '$scope',
        '$state',
        '$rootScope',
        function($scope, $state, $rootScope) {
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
        }]);

})();