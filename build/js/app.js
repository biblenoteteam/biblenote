(function () { 'use strict';
angular.module('BibleNote', [
  'BibleNote.Routes',


]);
;angular.module('BibleNote.Routes', [
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
;angular
    .module('BibleNote.Controllers.MainCtrl', [
        'ui.router',
    ])
    .controller('MainCtrl', [
        '$scope',
        '$state',
        function($scope, $state) {


        }]);

})();