angular.module('ModuleMedia').service('CreationMediaService', ['$http',function($http)
{
	var self = this;
	var url = "http://localhost:8080/api/medias";
	
	self.setPromise = function(media)
	{
		var urlParams = {params:{}};
		urlParams.params.titre = media.titre;
		urlParams.params.auteur = media.auteur;
		urlParams.params.typeMedia = media.type;
		console.log('todo creation media');
		return $http.post(url,urlParams.params).then(function(response)
		{
			return true;
		}, function myError(response){
			console.log(response.statusText);
			return false;
	    });
	}
}]);