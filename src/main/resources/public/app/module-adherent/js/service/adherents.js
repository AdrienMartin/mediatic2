angular.module('ModuleAdherent').service('RechercheAdherentService', ['$http', function($http)
{
    var self = this;
    
    self.getListe = function(params)
    {
    	var url = "http://localhost:8080/api/adherents/recherche";
    	return $http.get(url,{params:params}).then(function(response)
        {
            var adherents = [];
            for(var index in response.data)
            {
                var itemFromServeur = response.data[index];
                var itemForIHM = {
                        id : itemFromServeur.adherent.id,
                        identifiant : itemFromServeur.adherent.identifiant,
                        nom : itemFromServeur.adherent.nom,
                        prenom : itemFromServeur.adherent.prenom,
                        date_naissance : itemFromServeur.adherent.dateNaissance,
                        emprunt : itemFromServeur.nbEmprunts,
                        aJourCotisation : itemFromServeur.adherent.aJourCotisation
                };
                adherents.push(itemForIHM);
            }
            return adherents;	
        });
    }
    
    self.getPages = function(params)
    {
    	var url = "http://localhost:8080/api/adherents/page";
    	return $http.get(url, {params:params}).then(function(response)
        {
    		var pages = [];
    		for (var i = 0; i<response.data; i++){
    			pages.push(i);
    		}
    		return pages;
        });
    }
}]);


