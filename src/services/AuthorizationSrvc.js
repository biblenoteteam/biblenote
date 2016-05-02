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
