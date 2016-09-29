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
                    templateUrl: 'app/authentification/login/login.html',
                    controller: 'LoginController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                'acl': ['$q', 'AclService', function($q, AclService) {
                    if (AclService.can('login')) {
                        // Has proper permissions
                        return true;
                    } else {
                        // Does not have permission
                        return $q.reject('UnauthorizedForConnected');
                    }
                }]
            }
        });
    }

})();
