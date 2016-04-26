angular.module('ModuleAdherent').service('CreationAdherentService', ['$http', function($http)
{
    var self = this;
    var url = "http://10.34.10.140:8080/resource/adherent.creation";
    var res=false;
	
    self.creation = function(adherent)
    {
    	var params = {nom:adherent.nom, prenom:adherent.prenom, date_naissance:adherent.date_naissance, email: adherent.email, adresse : adherent.adresse};
    	var cotisation = {debut:adherent.debutCotisation, fin: adherent.finCotisation, montant: adherent.montantCotisation};
    	params.cotisation = cotisation;
  
    	return $http.post(url,params).then(function(response){
			return true;
    	}, function myError(response) {
			return false;
    	});
        
    }
  
    
}]);


