angular.module('ModuleMedia').controller('RechercheMediaController', ['$rootScope', 'MediaService', 'RechercheMediaService', '$location', function($rootScope, MediaService, RechercheMediaService, $location)
{
	var myCtrl = this;
	
	// Je défini l'attribut PAGE pas si il n'ai pas déjà défini
	$rootScope.page = $rootScope.page || {};
	// Je défini l'attribut TITRE de PAGE
	$rootScope.page.titre = "Recherche de médias";
	
	myCtrl.filters = MediaService.get('rechercheFilters');
	

	myCtrl.pageCourante = 0;
	myCtrl.nbPages = 1;
	
	myCtrl.medias = undefined;
	
	myCtrl.getListeTriee = function(tri)
	{
		myCtrl.filters.tri = tri;
		
		RechercheMediaService.getPromise(myCtrl.filters).then(function(response){
			myCtrl.medias = response;
		}, function(){
			myCtrl.medias = -1;
		});
		
		RechercheMediaService.getNbPages(myCtrl.filters).then(function(response) {
			myCtrl.listePages = response;
			myCtrl.nbPages = myCtrl.listePages.length;
		}, function(){
			// En cas d'erreur
			myCtrl.pages = -1;
		});
	}
	
	myCtrl.filters.page = 0;
	myCtrl.getListeTriee();
	
	myCtrl.hasErrorMedias = function()
	{
		return !(myCtrl.medias===undefined || (_.isArray(myCtrl.medias) && myCtrl.medias.length>0));
	}
	
	myCtrl.showMedia = function(id)
	{
		$location.path('/ficheMedia/'+id);
	}
	
	myCtrl.changePage = function(n) {
		if (n<0) {
			n=0;
		}
		if (n>=myCtrl.nbPages) {
			n=myCtrl.nbPages-1;
		}
		myCtrl.pageCourante = n;
		myCtrl.filters.page = n;
		myCtrl.getListeTriee();
	}
}]);