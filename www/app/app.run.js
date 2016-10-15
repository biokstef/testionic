(function() {
    'use strict';

    angular
        .module('nearlyevent')
        .run(runBlock);

    runBlock.$inject = ['$state', '$rootScope', '$ionicPlatform', 'AclService'];

    /** @ngInject */
    function runBlock($state, $rootScope, $ionicPlatform, AclService) {

        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });

        var aclData = {
            ROLE_GUEST: ['login'],
            ROLE_AUTH: ['logout', 'view_playlists', 'ajout'],
        }

        AclService.setAbilities(aclData);

        var isAuthenticated = localStorage.getItem('ls.nearlyevent_token');

        if (!isAuthenticated) {
            AclService.attachRole('ROLE_GUEST');
            $state.go('app.login');
        } else {
            AclService.attachRole('ROLE_AUTH');
            $state.go('app.playlists');
        }


        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, rejection) {
            if (rejection === 'Unauthorized') {
                $state.go('app.login');
            }
        });

        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, rejection) {
            if (rejection === 'UnauthorizedForConnected') {
                $state.go('app.playlists');
            }
        });

    }

})();
