angular.module('ModuleAdherent').service('FicheAdherentService', ['$http', '$q', 'FicheMediaService', function($http, $q, FicheMediaService)
{
    var self = this;
    var url = "http://10.34.10.140:8080/resource/adherent.accession";
    
    self.getAdherent = function(id)
    {
    	var params = {params:{}};
    	params.params.id = id;
    	return $http.get(url, params).then(function(response)
        {
            var adherent = [];
            var itemFromServeur = response.data;
            
            adherent = {
                id : itemFromServeur.id,
                nom : itemFromServeur.nom,
                prenom : itemFromServeur.prenom,
                date_naissance : new Date(itemFromServeur.date_naissance),
                cotisation_correcte : itemFromServeur.cotisation_correcte,
                email : itemFromServeur.email,       	
            	adresse : itemFromServeur.adresse,
            	emprunt : itemFromServeur.nombre_media,
            };
            
            if (adherent.cotisation_correcte){
            	adherent.medias = itemFromServeur.emprunt;
            	adherent.debutCotisation = new Date(itemFromServeur.cotisation.debut);
            	adherent.montantCotisation = itemFromServeur.cotisation.montant;
            } else {
            	adherent.medias = {};
            	adherent.debutCotisation = undefined;
            	adherent.montantCotisation = 0;
            }
                        
            return adherent;
        });
        
    }
    
//    self.getMediaAdherent = function(ids){
//    	var promises = []
//    	var medias = [];
//    	for (var index in ids){
//    		var id = ids [index]
//    		promises.push(FicheMediaService.getPromise(id).then(function(response) {
//    			medias.push(response);
//    		}, function(){
//    			// En cas d'erreur
//    			medias = -1;
//    		}));
//    	}
//    	return $q.all(promises).then(function(){
//        	console.log(medias)
//    		return medias; 
//    	});
//    	
//    }
  
    
}]);


