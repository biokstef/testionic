(function() {
    'use strict';

    angular
        .module('nearlyevent')
        .config(config);

    config.$inject = ['$httpProvider'];

    /** @ngInject */
    function config($httpProvider) {

        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};

    }

})();
