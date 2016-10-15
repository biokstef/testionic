(function() {
    'use strict';

    angular
        .module('nearlyevent')
        .factory('AjoutService', AjoutService);

    AjoutService.$inject = ['$state', '$http', '$q', '$rootScope', 'AclService', 'localStorageService', 'config'];

    /** @ngInject */
    function AjoutService($state, $http, $q, $rootScope, AclService, localStorageService, config) {

        var ajoutEndpoint = 'restapi/node.json';
        var sessionTokenEndpoint = 'services/session/token';

        var service = {
            ajoutEndpoint: ajoutEndpoint,
            sessionTokenEndpoint: sessionTokenEndpoint,
            ajout: ajout
        };
        return service;

        function ajout(data) {
			//var authToken = storage.get(config.localStoragePrefix + 'auth');
			var authToken = localStorage.getItem('ls.nearlyevent_auth');
			var token = localStorage.getItem('ls.nearlyevent_token');
			
            var defer = $q.defer();

            $http({
                    method: 'POST',
                    url: config.serviceBaseUrl + ajoutEndpoint,
                    //dataType: 'json',
                    headers: {
                        'X-CSRF-Token': token,
						'Content-Type': 'application/json',
						'Authorization': authToken
                    },
                    data: {
                        title: data.titre,
						type : 'demo',
						language : 'und',
						body : {"und":[{"value": data.texte}]}
                    },
                })
                .then(function(response) {
                    defer.resolve(response.data);
                })
                .catch(function(response) {
                    defer.reject(response.data);
					console.log(response.data);
                });

            return defer.promise;
        };

		
		
		
        
    }

})();
