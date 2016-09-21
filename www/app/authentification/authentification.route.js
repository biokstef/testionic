(function() {
    'use strict';

    angular
        .module('nearlyevent.authentification')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app.login', {
            url: '/login',
            views: {
                'menuContent': {
                    templateUrl: 'app/authentification/login/login.html'
                }
            }
        });
    }

})();
