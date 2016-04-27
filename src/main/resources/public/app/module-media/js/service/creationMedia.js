angular.module('ModuleMedia').service('CreationMediaService', ['$http',function($http)
{
	var self = this;
	var url = "http://10.34.10.140:8080/resource/media.creation";
	
	self.setPromise = function(media)
	{
		var urlParams = {params:{}};
		urlParams.params.titre = media.titre;
		urlParams.params.auteur = media.auteur;
		urlParams.params.type = media.type;
		console.log('todo creation media');
		return $http.post(url,urlParams).then(function(response)
		{
			return true;
		}, function myError(response){
			console.log(response.statusText);
			return false;
	    });
	}
}]);