
angular.module('ModuleAdherent').controller('FicheAdherentController', ['$http', '$rootScope','$routeParams', '$scope','FicheAdherentService', '$scope', 'MemoryFilter', '$location', '$routeParams','RechercheMediaService','EmpruntService',
                                                                            function($http, $rootScope,$routeParams,$scope, FicheAdherentService, $scope, MemoryFilter, $location, $routeParams,RechercheMediaService,EmpruntService){
	var myCtrl = this;
	
	// Je défini l'attribut PAGE pas si il n'ai pas déjà déini
	$rootScope.page = $rootScope.page || {};
	// Je défini l'attribut TITRE de PAGE
	$rootScope.page.titre = "Fiche Adhérent";
	myCtrl.dateEmprunt="";
	myCtrl.dateRetour="";
	myCtrl.adherent = undefined;
	myCtrl.titre;
	myCtrl.filtreMedia = "";
	myCtrl.idMedia=undefined;
	$scope.selectedMedia=null;
	
	var id = $routeParams.idAdherent;
	myCtrl.medias=undefined;
	myCtrl.mediasTmp=[];
	myCtrl.medias=RechercheMediaService.getPromise('titre').then(function(response){
		myCtrl.medias = response;
		myCtrl.mediasTmp=response;
	},function(){
		// En cas d'erreur
		myCtrl.medias = -1;
	});
	
	/*myCtrl.searchMedias=function(titre){
		RechercheMediaService.getPromise(titre).then(function(response){
			
			myCtrl.medias = response;
		}
		
	},function(){
		// En cas d'erreur
		myCtrl.medias = -1;
	});*/
	myCtrl.searchMedias = function()
	{
			console.log("filtre"+myCtrl.filtreMedia.toLowerCase());
		myCtrl.mediasTmp = [];
		for(index in myCtrl.medias)
		{
			var elmt = myCtrl.medias[index].titre.toLowerCase() ;
			if(elmt.indexOf(myCtrl.filtreMedia.toLowerCase()) != -1)
			{
				myCtrl.mediasTmp.push( myCtrl.medias[index]);
			}
		}
	}
	
	FicheAdherentService.getAdherent(id).then(function(response) {
		myCtrl.adherent = response;
		myCtrl.calculAge(myCtrl.adherent.date_naissance);
		myCtrl.calculFinAbonnement(myCtrl.adherent.debutCotisation);
	}, function(){
		// En cas d'erreur
		myCtrl.adherent = -1;
	});
	
	myCtrl.hasErrorAdherent = function(){
		return myCtrl.adherent===-1;
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
	
	myCtrl.showMedia = function(id) {
		$location.path('/ficheMedia/'+id);
	}
	
		
	
	myCtrl.initDate=function(){
			var type;
			myCtrl.dateEmprunt=new Date();
			myCtrl.dateRetour=new Date();
		
			for(i in myCtrl.mediasTmp){
				
				if(myCtrl.mediasTmp[i].id==myCtrl.idMedia) type=myCtrl.mediasTmp[i].type;
			}
		
			if(type == 'CD' || type == 'DVD')
			{
				
				myCtrl.dateRetour.setDate(myCtrl.dateEmprunt.getDate() + 15);
			}
			else if(type == 'Livre')
			{
				myCtrl.dateRetour.setDate(myCtrl.dateEmprunt.getDate() + 30);
			}
	
		console.log("dd"+myCtrl.media);
	}

	myCtrl.ajoutEmprunt=function(){
		
		/*var titreMedia = $('#medias');
        var val = $(titreMedia).find('option[value="' + myCtrl.titre + '"]');
        var endval = val.attr('id');*/
		
		
		if(myCtrl.idMedia != undefined && myCtrl.dateEmprunt != undefined)
		{
			var result = undefined;
			var emprunt = {};
			emprunt.idMedia = myCtrl.idMedia;
			emprunt.idAdherent = id;
			emprunt.dateDebut = myCtrl.dateEmprunt;
			EmpruntService.setPromise(emprunt).then(function(response)
			{
				result = response;
				
			}, function(){
				// En cas d'erreur
				result = -1;
			});
		}
		
	}
	
	
}]);