(function() {
    'use strict';

    angular
        .module('nearlyevent')
        .constant('config', {
            localStoragePrefix: 'nearlyevent_',
            serviceBaseUrl: 'http://police.model225.com/'
        });

})();
