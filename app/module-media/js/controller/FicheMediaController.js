angular.module('ModuleMedia').controller('FicheMediaController', ['$rootScope', '$routeParams', 'FicheMediaService', '$location', 'RechercheAdherentService', 'EmpruntService', function($rootScope, $routeParams, FicheMediaService, $location, RechercheAdherentService, EmpruntService)
{
	var myCtrl = this;
	
	// Je défini l'attribut PAGE pas si il n'ai pas déjà défini
	$rootScope.page = $rootScope.page || {};
	// Je défini l'attribut TITRE de PAGE
	$rootScope.page.titre = "Fiche média";

	myCtrl.media = undefined;
	myCtrl.mediaTmp = {};
	
	var listeAdherents = [];
	myCtrl.listeAdherentsTmp = [];
	myCtrl.adherentId = undefined;
	myCtrl.filtreAdherent = "";
	
	// Récuparation du l'identifiant qui est le paramètre 'idMedia' de la route
	var id = $routeParams.idMedia;
	
	// Récuparation du media en fonction de son id
	FicheMediaService.getPromise(id).then(function(response)
	{
		myCtrl.media = response;
		myCtrl.mediaTmp.titre = myCtrl.media.titre;
		myCtrl.mediaTmp.auteur = myCtrl.media.auteur;
		myCtrl.mediaTmp.type = myCtrl.media.type;
		if(myCtrl.media.retour != "" && myCtrl.media.retour > new Date())
		{
			myCtrl.mediaTmp.empruntDebut = myCtrl.media.retour;
		}
		else
		{
			myCtrl.mediaTmp.empruntDebut = new Date();
		}
		myCtrl.changeDateRetour();
	}, function(){
		// En cas d'erreur
		myCtrl.media = -1;
	});
	
	// Erreur si pas de media
	myCtrl.hasErrorMedias = function()
	{
		return !(myCtrl.media===undefined);
	}
	
	// -------------------------------------------------------------------------
	
	RechercheAdherentService.getListe().then(function(response)
	{
		for(index in response)
		{
			if(response[index].cotisation_correcte == true)
			{
				listeAdherents.push(response[index]);
			}
		}
		myCtrl.listeAdherentsTmp = listeAdherents;
		
	}, function(){
		// En cas d'erreur
		listeAdherents = -1;
	});
	
	myCtrl.hasErrorAdherents = function(){
		return listeAdherents===-1;
	}
	
	myCtrl.changeListeAdherent = function()
	{
		myCtrl.listeAdherentsTmp = [];
		for(index in listeAdherents)
		{
			var nomPrenom = listeAdherents[index].nom.toLowerCase() + ' ' + listeAdherents[index].prenom.toLowerCase();
			if(nomPrenom.indexOf(myCtrl.filtreAdherent.toLowerCase()) != -1)
			{
				myCtrl.listeAdherentsTmp.push(listeAdherents[index]);
			}
		}
	}
	
	// -------------------------------------------------------------------------
	
	myCtrl.saveMedia = function()
	{
		var result = undefined;
		
		myCtrl.media.titre = myCtrl.mediaTmp.titre;
		myCtrl.media.auteur = myCtrl.mediaTmp.auteur;
		myCtrl.media.type = myCtrl.mediaTmp.type;
		
		myCtrl.changeDateRetour();
		
		FicheMediaService.setPromiseMedia(myCtrl.media).then(function(response)
		{
			result = response;
		}, function(){
			// En cas d'erreur
			result = -1;
		});
	}
	
	// -------------------------------------------------------------------------
	
	myCtrl.changeDateRetour = function()
	{
		if(myCtrl.mediaTmp.empruntDebut != undefined)
		{
			if(myCtrl.media.type == 'CD' || myCtrl.media.type == 'DVD')
			{
				myCtrl.mediaTmp.empruntRetour = angular.copy(myCtrl.mediaTmp.empruntDebut);
				myCtrl.mediaTmp.empruntRetour.setDate(myCtrl.mediaTmp.empruntRetour.getDate() + 15);
			}
			else if(myCtrl.media.type == 'Livre')
			{
				myCtrl.mediaTmp.empruntRetour = angular.copy(myCtrl.mediaTmp.empruntDebut);
				myCtrl.mediaTmp.empruntRetour.setDate(myCtrl.mediaTmp.empruntRetour.getDate() + 30);
			}
		}
	}
	
	myCtrl.saveEmprunt = function()
	{
		if(myCtrl.adherentId != undefined && myCtrl.mediaTmp.empruntDebut != undefined)
		{
			var result = undefined;
			var emprunt = {};
			emprunt.idMedia = myCtrl.media.id;
			emprunt.idAdherent = myCtrl.adherentId;
			emprunt.dateDebut = myCtrl.mediaTmp.empruntDebut;
			EmpruntService.setPromise(emprunt).then(function(response)
			{
				result = response;
			}, function(){
				// En cas d'erreur
				result = -1;
			});
		}
	}
	
	myCtrl.showAdherent = function(id)
	{
		$location.path('/adherent/'+id);
	}
}]);