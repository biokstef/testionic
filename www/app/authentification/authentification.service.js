(function() {
    'use strict';

    angular
        .module('nearlyevent')
        .factory('AuthentificationService', AuthentificationService);

    AuthentificationService.$inject = ['$state', '$http', '$q', '$rootScope', 'AclService', 'localStorageService', 'config'];

    /** @ngInject */
    function AuthentificationService($state, $http, $q, $rootScope, AclService, localStorageService, config) {

        var loginEndpoint = 'api/user/login';
        var sessionTokenEndpoint = 'rest/session/token';

        var service = {
            loginEndpoint: loginEndpoint,
            sessionTokenEndpoint: sessionTokenEndpoint,
            getSessionToken: getSessionToken,
            login: login,
            logout: logout,
            setUserData: setUserData,
            removeUserData: removeUserData
        };
        return service;

        function getSessionToken() {
            var defer = $q.defer();

            $http({
                    method: 'GET',
                    url: config.serviceBaseUrl + sessionTokenEndpoint,
                    dataType: 'text',
                })
                .then(function(response) {
                    defer.resolve(response.data);
                })
                .catch(function(response) {
                    defer.reject(response.data);
                });

            return defer.promise;
        };

        function login(username, password, token) {
            var defer = $q.defer();

            $http({
                    method: 'POST',
                    url: config.serviceBaseUrl + loginEndpoint + config.formatJson,
                    dataType: 'json',
                    headers: {
                        'X-CSRF-Token': token,
                    },
                    data: {
                        username: username,
                        password: password
                    },
                })
                .then(function(response) {
                    defer.resolve(response.data);
                })
                .catch(function(response) {
                    defer.reject(response.data);
                });

            return defer.promise;
        };

        function logout() {
            this.removeUserData();
            AclService.flushRoles();
            AclService.attachRole('ROLE_GUEST');
            $state.go('login');
            toastr.success('Déconnexion réussie');
        };

        function setUserData(user, token, auth) {
            localStorageService.set(config.localStoragePrefix + 'token', token);
            localStorageService.set(config.localStoragePrefix + 'user', user);
            localStorageService.set(config.localStoragePrefix + 'auth', auth);
        };

        function removeUserData() {
            localStorageService.remove(config.localStoragePrefix + 'token');
            localStorageService.remove(config.localStoragePrefix + 'user');
            localStorageService.remove(config.localStoragePrefix + 'auth');
        };

    }

})();
