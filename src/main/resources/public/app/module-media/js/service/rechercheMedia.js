angular.module('ModuleMedia').service('RechercheMediaService', ['$http',function($http)
{
	var self = this;
	

	self.getPromise = function(params)
	{
		var url = "http://localhost:8080/api/medias";
		var urlParams = {params:{}};

		if(params.titre != undefined)
		{
			urlParams.params.titre = params.titre;
		}
		if(params.auteur != undefined)
		{
			urlParams.params.auteur = params.auteur;
		}
		if(params.type != undefined)
		{
			urlParams.params.type = params.type;
		}
		if(params.tri != undefined)
		{
			urlParams.params.tri = params.tri;
		}
		if(params.page != undefined)
		{
			urlParams.params.page = params.page;
		}
		return $http.get(url,urlParams).then(function(response)
		{
			var medias = [];
			for(var index in response.data)
			{
				var itemFromServeur = response.data[index];

				var itemForIHM =
				{
						id : itemFromServeur.id,
						titre : itemFromServeur.titre,
						auteur : itemFromServeur.auteur,
						type : itemFromServeur.type,
						emprunteur : itemFromServeur.emprunteur,
						emprunteurs : itemFromServeur.emprunteurs,
						retour : (itemFromServeur.retour != undefined)?new Date(itemFromServeur.retour):""
				};
				medias.push(itemForIHM);
			}
			return medias;
		});
	}
	
	self.getNbPages = function(params)
    {
    	var url = "http://10.34.10.140:8080/resource/media.recherche.taille";
    	var urlParams = {params:{}};

		if(params.titre != undefined)
		{
			urlParams.params.titre = params.titre;
		}
		if(params.auteur != undefined)
		{
			urlParams.params.auteur = params.auteur;
		}
		if(params.type != undefined)
		{
			urlParams.params.type = params.type;
		}
		if(params.tri != undefined)
		{
			urlParams.params.tri = params.tri;
		}
		if(params.page != undefined)
		{
			urlParams.params.page = params.page;
		}
    	return $http.get(url, urlParams).then(function(response)
        {
    		var pages = [];
    		for (var i = 0; i<response.data.pages; i++){
    			pages.push(i);
    		}
    		return pages;
        });   
    }
}]);