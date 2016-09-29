(function() {
    'use strict';

    angular
        .module('nearlyevent')
        .controller('MainController', MainController);

    MainController.$inject = [];

    /** @ngInject */
    function MainController() {
        var vm = this;

        vm.authenticated = '';

        activate();

        function activate() {
            vm.authenticated = localStorage.getItem('ls.nearlyevent_token');
        }

    }
})();
