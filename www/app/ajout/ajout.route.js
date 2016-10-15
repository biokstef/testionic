(function() {
    'use strict';

    angular
        .module('nearlyevent.ajout')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app.ajout', {
            url: '/ajout',
            views: {
                'menuContent': {
                    templateUrl: 'app/ajout/ajout.html',
                    controller: 'AjoutController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                'acl': ['$q', 'AclService', function($q, AclService) {
                    if (AclService.can('ajout')) {
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
