angular.module('BibleNote.Routes', [
  'ui.router',
  'ngMaterial',

  'BibleNote.Controllers.MainCtrl',

  
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
     

    $urlRouterProvider.otherwise('/main');

  }
]);
