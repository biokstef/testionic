(function() {
    'use strict';

    angular
        .module('nearlyevent.ajout')
        .controller('AjoutController', AjoutController);

    AjoutController.$inject = ['$state', 'AjoutService', 'AclService', 'base64Service'];

    /* @ngInject */
    function AjoutController($state, AjoutService, AclService, base64Service) {
        var vm = this;
        
        vm.ajoutData = { titre: "", texte: "" };
        vm.ajoutError = '';
        vm.doAjouter = doAjouter;

        activate();

        function activate() {}

        function doAjouter() {
			
            

                AjoutService.ajout(vm.ajoutData).then(function(data) {
                    vm.ajoutError = false;
					console.log("Données bien enregistrées");

                }, function(error) {
                    vm.ajoutError = error;
                });
           
			
			
        }

    }
})();


/*
.controller('AjoutCtrl', ['$rootScope', '$scope', '$ionicLoading', '$ionicModal', 'AjoutContent', '$timeout', function($rootScope, $scope, $ionicLoading, $ionicModal, AjoutContent, $timeout) {
  
  $scope.ajoutData = {};
  $scope.ajoutError = false;

  $scope.doAjouter = function() {
    $ionicLoading.show();
	   //console.log(data);
      AjoutContent.ajout($scope.ajoutData).then(function(data) {
		  console.log(data);
		  console.log("Succes!!!!")
      $scope.ajoutError = false;
		}, function(error) {
		  $ionicLoading.hide();
		  $scope.ajoutError = error.form_errors;
		});
	  $scope.ajoutError = false;
	  
     $timeout(function () {
        $ionicLoading.hide();
    }, 4000);     
  }
}])
*/