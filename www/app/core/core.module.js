(function() {
    'use strict';

    angular.module('nearlyevent.core', [
        'ionic',
        'ngMessages',
        'mm.acl',
        'LocalStorageModule',
        'base64Module',


        'nearlyevent.controllers',
        'nearlyevent.authentification'
    ]);

})();
