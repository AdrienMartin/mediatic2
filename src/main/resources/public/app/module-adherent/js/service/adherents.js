angular.module('ModuleAdherent').service('RechercheAdherentService', ['$http', function($http)
{
    var self = this;
    
    self.getListe = function(params)
    {
    	var url = "http://localhost:8080/api/adherents";
    	return $http.get(url,{params:params}).then(function(response)
        {
            var adherents = [];
            for(var index in response.data)
            {
                var itemFromServeur = response.data[index];
                var itemForIHM = {
                        id : itemFromServeur.id,
                        nom : itemFromServeur.nom,
                        prenom : itemFromServeur.prenom,
                        date_naissance : itemFromServeur.dateNaissance,
                       // emprunt : itemFromServeur.nombre_media,
                        medias : itemFromServeur.emprunt,
                        aJourCotisation : itemFromServeur.aJourCotisation
                        
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


