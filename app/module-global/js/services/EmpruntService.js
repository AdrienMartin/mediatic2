angular.module('ModuleApp').service('EmpruntService', ['$http',function($http)
{
	var self = this;
	var url = "http://10.34.10.140:8080/resource/emprunt.ajout";
	
	self.setPromise = function(emprunt)
	{
		var urlParams = {params:{}};
		urlParams.params.idMedia = emprunt.idMedia;
		urlParams.params.idAdherent = emprunt.idAdherent;
		urlParams.params.dateDebut = emprunt.dateDebut;
		console.log('todo ajout emprunt');
		return $http.post(url,urlParams).then(function(response)
		{
			return true;
		}, function myError(response){
			console.log(response.statusText);
			return false;
	    });
	}
}]);