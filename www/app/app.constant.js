(function() {
    'use strict';

    angular
        .module('nearlyevent')
        .constant('config', {
            localStoragePrefix: 'nearlyevent_',
            serviceBaseUrl: 'http://cors.io/?u=http://localhost:8088/',
            formatJson: '?_format=json'
        });

})();
