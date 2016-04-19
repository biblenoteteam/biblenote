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

        this.isLogged = function(){
            if (!$window.localStorage.user) {
                $state.go('login');
            }
        };



        var user = null;

        if ($localStorage.user) {
            user = $localStorage.user;
        };



        this.getParams = function() {
            return $http.get('https://bpa-app.corelogic.pl/ibe-rest-api/checkin/parameters');
        };

        this.getPDFBookingList = function() {
            var url =$rootScope.endpointURL + '/booking/flights/pdf?active=100';
            $window.open(url);
        };

        this.getExcelBookingList = function() {
            var url = $rootScope.endpointURL + '/booking/flights/excel?active=100';
            $window.open(url);
        };

        this.loginAgent = function(params) {
            var req = {
                method: 'POST',
                url: $rootScope.endpointURL + "/authorization/agent",
                data: params,
            };

            var promise = $http(req);

            promise.then(function(data) {
                user = data.data;
                user.who = 'agency';
                user.agentCode = params.agentCode;
                $localStorage.user = user;
            }, function(data) {

            });

            return promise;
        };

        this.loginCorporate = function(params) {
            var req = {
                method: 'POST',
                url: $rootScope.endpointURL + "/authorization/agent",
                data: params,
            };

            var promise = $http(req);

            promise.then(function(data) {
                user = data.data;
                user.who = 'corporate';
                $localStorage.user = user;
                $localStorage.user.isCorporate = true;
            }, function(data) {

            });

            return promise;
        };

        this.modifyBooking = function(params) {
            var req = {
                method: 'POST',
                url: $rootScope.endpointURL + "/booking/flight/modification",
                data: params,
            };

            var promise = $http(req);

            return promise;
        };

        this.saveBooking = function(params) {
            var req = {
                method: 'POST',
                url: $rootScope.endpointURL + "/authorization/agent",
                data: params,
            };

            var promise = $http(req);

            promise.then(function(data) {
                user = data.data;
                user.who = 'corporate';
                $localStorage.user = user;
                $localStorage.user.isCorporate = true;
            }, function(data) {

            });

            return promise;
        };

        this.checkInLoginWithSSR = function(params) {
            var url = $rootScope.endpointURL + '/booking/flight/' + params.pnr + '/' + params.name;
            return $http.get(url);
        };

        this.checkInLogin = function(params) {
            params.date = moment(params.date).format('YYYY-MM-DD');
            var url = $rootScope.endpointURL + '/booking/flight/?name=' + params.name + '&lastname=' + params.surname + '&date=' + params.date + '&dest=' + params.dest;
            return $http.get(url);
        };

        this.getAgentData = function() {
            return user;
        };

        this.loginCheckIn = function(obj) {
            $localStorage.loggedToCheckIn = obj;
        };

        this.getDataToCheckIn = function() {
            return $localStorage.loggedToCheckIn;
        };

        this.proceedCheckIn = function(guests, summary, users) {
            var checkinSegments = [];
            for (var i = 0; i < summary.data.itinerary[0].flightSegmentDetails.length; i++) {
                var obj = {
                    'segment': {
                        'boardPoint': summary.data.itinerary[0].flightSegmentDetails[i].boardPoint,
                        'offPoint': summary.data.itinerary[0].flightSegmentDetails[i].offPoint,
                    },
                    "flightIdentifier": {
                        "flightNumber": {
                            "fltNumber": summary.data.itinerary[0].flightSegmentDetails[i].fltNumber,
                            "airlineCode": summary.data.itinerary[0].flightSegmentDetails[i].carrierCode,
                            "fltSuffix": summary.data.itinerary[0].flightSegmentDetails[i].fltSuffix,
                            "carrierCode": summary.data.itinerary[0].flightSegmentDetails[i].carrierCode
                        },
                        "flightDate": summary.data.itinerary[0].flightSegmentDetails[i].scheduledDepartureDateTime,
                    }
                };
                checkinSegments.push(obj);
            }

            var nameAndPnrNumber = [];
            var checkinGuestDetails = [];
            for (var i = 0; i < users.length; i++) {
                var obj = {
                    'firstName': users[i].givenName,
                    'lastName': users[i].surName,
                    'age': '20', //poszukac dobrze czy gdzies jest
                    'pnrNumber': summary.data.externalBookingNumber.split(' ')[1],
                    'numberInParty': i + 1,
                    'paxKey': users[i].guestId,
                };
                nameAndPnrNumber.push(obj);

                var user = {
                    'nameAndPnrNumber': obj,
                    'checkinSegments': checkinSegments
                };
                checkinGuestDetails.push(user);
            }



            var params = {
                "nameAndPnrNumber": nameAndPnrNumber,
                "checkinGuestDetails": checkinGuestDetails,
            };


            var req = {
                method: 'POST',
                url: $rootScope.endpointURL + "/checkin",
                data: params,
            };

            return $http(req);
        };

        this.boardingPass = function(guest, summary) {
            var checkinSegments = [];
            for (var i = 0; i < summary.data.itinerary[0].flightSegmentDetails.length; i++) {
                var obj = {
                    "nameType": {
                        "firstName": guest.givenName,
                        "lastName": guest.surName,
                        "pnrNumber": summary.data.externalBookingNumber.split(' ')[1],
                        "numberInParty": "0",
                        'paxKey': summary.data.guestDetails[0].guestId,
                    },
                    'segmentInfo': {
                        'boardPoint': summary.data.itinerary[0].flightSegmentDetails[i].boardPoint,
                        'offPoint': summary.data.itinerary[0].flightSegmentDetails[i].offPoint,
                    },
                    "flightIdentifier": {
                        "flightNumber": {
                            "fltNumber": summary.data.itinerary[0].flightSegmentDetails[i].fltNumber,
                            "airlineCode": summary.data.itinerary[0].flightSegmentDetails[i].carrierCode,
                            "fltSuffix": summary.data.itinerary[0].flightSegmentDetails[i].fltSuffix,
                            "carrierCode": summary.data.itinerary[0].flightSegmentDetails[i].carrierCode
                        },
                        "flightDate": summary.data.itinerary[0].flightSegmentDetails[i].scheduledDepartureDateTime,
                    }
                };
                checkinSegments.push(obj);
            }



            var req = {
                method: 'POST',
                url: $rootScope.endpointURL + "/checkin/boarding-pass",
                data: checkinSegments[0],
            };

            return $http(req);
        };

        this.createAccount = function(params) {
            var req = {
                method: 'POST',
                url: $rootScope.endpointURL + "/account",
                data: params,
            };
            var promise = $http(req);
            return promise;
        };

        this.logout = function() {
            var req = {
                method: 'POST',
                url: $rootScope.endpointURL + "/authorization/logout"
            };
            $localStorage.user = null;
            var promise = $http(req);
            return promise;
        }

        this.logInUser = function (params) {
            var req = {
                method: 'POST',
                url: $rootScope.endpointURL+"/authorization/login",
                data: params,
            };
            var promise = $http(req);

            promise.then(function(data) {
                user = data.data;
                user.who = 'user';
                $localStorage.user = user;
                $localStorage.user.isCorporate = false;
            }, function(data) {

            });
            return promise;
        };

        this.logout = function() {
            var req = {
                method: 'POST',
                url: $rootScope.endpointURL+"/authorization/logout"
            };
            $localStorage.user = null;
            var promise = $http(req);
            return promise;
        }

}]);
