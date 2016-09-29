(function() {
    'use strict';

    angular
        .module('nearlyevent')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'MainController',
            controllerAs: 'vm'
        })

        .state('app.search', {
            url: '/search',
            views: {
                'menuContent': {
                    templateUrl: 'templates/search.html'
                }
            }
        })

        .state('app.browse', {
                url: '/browse',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/browse.html'
                    }
                }
            })
            .state('app.playlists', {
                url: '/playlists',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/playlists.html',
                        controller: 'PlaylistsCtrl'
                    }
                },
                resolve: {
                    'acl': ['$q', 'AclService', function($q, AclService) {
                        if (AclService.can('view_playlists')) {
                            // Has proper permissions
                            return true;
                        } else {
                            // Does not have permission
                            return $q.reject('Unauthorized');
                        }
                    }]
                }
            })

        .state('app.single', {
            url: '/playlists/:playlistId',
            views: {
                'menuContent': {
                    templateUrl: 'templates/playlist.html',
                    controller: 'PlaylistCtrl'
                }
            }
        });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/playlists');
    }

})();
