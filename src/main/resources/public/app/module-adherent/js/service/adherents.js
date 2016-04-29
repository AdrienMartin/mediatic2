angular.module('ModuleAdherent').service('RechercheAdherentService', ['$http', function($http)
{
    var self = this;
    
    self.getListe = function(params)
    {
    	console.log('yolo');
    	var url = "http://localhost:8080/api/adherents/recherche";
    	return $http.get(url,{params:params}).then(function(response)
        {
            var adherents = [];
            for(var index in response.data)
            {
                var itemFromServeur = response.data[index];
            	console.log(itemFromServeur);
                var itemForIHM = {
                        id : itemFromServeur.adherent.identifiant,
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
    	var url = "http://localhost:8080/api/adherents";
    	return $http.get(url, {params:params}).then(function(response)
        {
    		var pages = [];
    		for (var i = 0; i<response.data.pages; i++){
    			pages.push(i);
    		}
    		return pages;
        });
        
    }
  
    
}]);


