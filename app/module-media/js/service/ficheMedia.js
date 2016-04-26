angular.module('ModuleMedia').service('FicheMediaService', ['$http',function($http)
{
	var self = this;
	var url = "http://10.34.10.140:8080/resource/media.accession";
	var urlMedia = "http://10.34.10.140:8080/resource/media.modification";
	
	// Appelle le serveur pour recuperer un media
	self.getPromise = function(id)
	{
		var urlParams = {params:{}};
		urlParams.params.id = id;
		return $http.get(url,urlParams).then(function(response)
		{
			var media =
			{
					id : response.data.id,
					titre : response.data.titre,
					auteur : response.data.auteur,
					type : response.data.type,
					emprunteur : response.data.emprunteur,
					emprunteurs : response.data.emprunteurs,
					retour : (response.data.retour != undefined)?new Date(response.data.retour):""
			};
			return media;
		});
	}
	
	self.setPromiseMedia = function(media)
	{
		var urlParams = {params:{}};
		urlParams.params.id = media.id;
		urlParams.params.titre = media.titre;
		urlParams.params.auteur = media.auteur;
		urlParams.params.type = media.type;
		console.log('todo modif media');
		return $http.post(urlMedia,urlParams).then(function(response)
		{
			return true;
		}, function myError(response){
			console.log(response.statusText);
			return false;
	    });
	}
}]);