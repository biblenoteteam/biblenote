angular.module('BibleNote.Services.AuthorizationSrvc', [
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
