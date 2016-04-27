
angular.module('ModuleAdherent').controller('RechercheAdherentController', ['$http', '$rootScope', 'RechercheAdherentService', '$scope', 'MemoryFilter', '$location', '$routeParams',
                                                                            function($http, $rootScope, RechercheAdherentService, $scope, MemoryFilter, $location, $routeParams){
	var myCtrl = this;
	
	// Je défini l'attribut PAGE pas si il n'ai pas déjà défini
	$rootScope.page = $rootScope.page || {};
	// Je défini l'attribut TITRE de PAGE
	$rootScope.page.titre = "Recherche Adhérent";
	
	myCtrl.listeAdherents = undefined;
	
	myCtrl.pageCourante = 0;
	myCtrl.nbPages = 1;
	
	myCtrl.filter = MemoryFilter.get('filtersRechercheAdherent');
	
	var id = $routeParams.idAdherent;
	
	RechercheAdherentService.getListe({page:0}).then(function(response) {
		myCtrl.listeAdherents = response;		
	}, function(){
		// En cas d'erreur
		myCtrl.listeAdherents = -1;
	});
	
	RechercheAdherentService.getPages().then(function(response) {
		myCtrl.listePages = response;
		myCtrl.nbPages = myCtrl.listePages.length;
	}, function(){
		// En cas d'erreur
		myCtrl.pages = -1;
	});
	
	myCtrl.hasErrorAdherent = function(){
		return myCtrl.listeAdherents===-1;
	}
	
	myCtrl.tri = function(param)
	{
		myCtrl.filter.tri = param;
		myCtrl.rechercher();
	}
	
	myCtrl.rechercher = function()
	{
		var params = {};
		if (myCtrl.filter.id != undefined) {
			params.id = myCtrl.filter.id;
		}
			
		if (myCtrl.filter.texte != undefined) {
			params.texte = myCtrl.filter.texte;
		}
			
		RechercheAdherentService.getPages(params).then(function(response) {
			myCtrl.listePages = response;
		}, function(){
			// En cas d'erreur
			myCtrl.pages = -1;
		});
		
		if (myCtrl.filter.tri != undefined) {
			params.tri = myCtrl.filter.tri;
		}
		
		if (myCtrl.filter.page != undefined) {
			params.page = myCtrl.filter.page;
		} else {
			params.page = 0;
		}
		
		RechercheAdherentService.getListe(params).then(function(response) {
			myCtrl.listeAdherents = response;
		}, function(){
			// En cas d'erreur
			myCtrl.listeAdherents = -1;
		});
	}
	
	
	myCtrl.showAdherent = function(id) {
		$location.path('/adherent/'+id);
	}
	
	myCtrl.changePage = function(n) {
		if (n<0) {
			n=0;
		}
		if (n>=myCtrl.nbPages) {
			n=myCtrl.nbPages-1;
		}
		myCtrl.pageCourante = n;
		myCtrl.filter.page = n;
		myCtrl.rechercher();
	}
	
}]);