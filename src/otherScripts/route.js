angular.module('BibleNote.Routes', [
  'ui.router',
  'ngMaterial',

  'BibleNote.Controllers.MainCtrl',
  'BibleNote.Controllers.LoginCtrl',
  'BibleNote.Controllers.RegisterCtrl',
  
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
     

    $urlRouterProvider.otherwise('/main');



  }
]).run(function ($state,$rootScope) {
  $rootScope.$on('$stateChangeStart', 
function(event, toState, toParams, fromState, fromParams){ 
    $rootScope.currentState = toState.name;
})

    
});
