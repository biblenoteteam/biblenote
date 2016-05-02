angular.module('BibleNote.Routes', [
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
