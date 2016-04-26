
angular.module('ModuleAdherent').controller('CreationAdherentController', ['$http', '$rootScope', 'FicheAdherentService', '$scope', 'MemoryFilter', '$location', '$routeParams','CreationAdherentService',
                                                                            function($http, $rootScope, FicheAdherentService, $scope, MemoryFilter, $location, $routeParams, CreationAdherentService){
	var myCtrl = this;

	// Je défini l'attribut PAGE pas si il n'ai pas déjà défini
	$rootScope.page = $rootScope.page || {};
	// Je défini l'attribut TITRE de PAGE
	$rootScope.page.titre = "Création Adhérent";
	
	myCtrl.adherent = undefined;
	
	myCtrl.submit = function(){
		CreationAdherentService.creation(myCtrl.adherent).then(function(response){
			 if(!response){
				console.log("creation pas ok")
			 } else {
				 console.log("creation ok")
				 $location.path('/adherent');
			 }
		});
		
	}
	
	
	myCtrl.calculAge = function(dateNaissance){
		if (dateNaissance != undefined) {
			myCtrl.adherent.age = Math.floor(Math.floor((new Date).getTime()-dateNaissance.getTime()) / (365.24*24*3600*1000));
			if (myCtrl.adherent.age <= 0) {
				myCtrl.adherent.age = 0;
			}
		}
	}
	
	myCtrl.calculFinAbonnement = function(dateDebutAbonnement){
		if (dateDebutAbonnement != undefined){
			myCtrl.adherent.finCotisation = angular.copy(dateDebutAbonnement);
			myCtrl.adherent.finCotisation.setYear(dateDebutAbonnement.getFullYear()+1);
		}
	}
	
}]);