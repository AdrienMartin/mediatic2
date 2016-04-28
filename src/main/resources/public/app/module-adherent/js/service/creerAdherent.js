angular.module('ModuleAdherent').service('CreationAdherentService', ['$http', function($http)
{
    var self = this;
    var url = "http://localhost:8080/api/adherents";
    var res=false;
	
    self.creation = function(adherent)
    {
		var urlParams = {params:{}};
		urlParams.params.identifiant = "identifiantAdherent";
		urlParams.params.nom = adherent.nom;
		urlParams.params.prenom = adherent.prenom;
		urlParams.params.dateNaissance = adherent.date_naissance;
		urlParams.params.email = adherent.email;
		urlParams.params.adresse = adherent.adresse.ligne1 + " " + adherent.adresse.ligne2;
		urlParams.params.codePostal = adherent.adresse.codepostal;
		urlParams.params.ville = adherent.adresse.ville;
		urlParams.params.datePaiementCotisation = adherent.debutCotisation;
		urlParams.params.finCotisation = adherent.finCotisation;
		urlParams.params.montantCotisation = adherent.montantCotisation;
		if (adherent.finCotisation >= new Date())  
			urlParams.params.aJourCotisation = true;
		else 
			urlParams.params.aJourCotisation = false;
		
    	return $http.post(url,urlParams.params).then(function(response){
			return true;
    	}, function myError(response) {
			return false;
    	});
        
    }
  
    
}]);


