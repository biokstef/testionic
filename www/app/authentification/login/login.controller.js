(function() {
    'use strict';

    angular
        .module('nearlyevent.authentification')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$state', 'AuthentificationService', 'AclService', 'base64Service'];

    /* @ngInject */
    function LoginController($state, AuthentificationService, AclService, base64Service) {
        var vm = this;

        vm.user = { username: "", password: "" };
        vm.loginError = '';
        vm.doLogin = doLogin;

        activate();

        function activate() {}

        function doLogin() {
            console.log('ok');
            //AuthentificationService.getSessionToken().then(function(data) {
                //var token = data;
				
                var authToken = 'Basic ' + base64Service.encode(vm.user.username + ':' + vm.user.password);

                AuthentificationService.login(vm.user).then(function(data) {

                    vm.loginError = false;
                    
					console.log(data);
					
                    AuthentificationService.setUserData(data.user, data.token, authToken);
                    AclService.detachRole('ROLE_GUEST');
                    AclService.attachRole('ROLE_AUTH');

                    $state.go('app.playlists');

                }, function(error) {
                    vm.loginError = error;
                });
            //}, function(error) {
                //console.log(error);
            //});
        }

    }
})();
