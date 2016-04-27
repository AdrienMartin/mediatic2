angular.module('ModuleMedia').controller('CreationMediaController', ['$rootScope', 'CreationMediaService', function($rootScope, CreationMediaService)
{
	var myCtrl = this;
	
	// Je défini l'attribut PAGE pas si il n'ai pas déjà défini
	$rootScope.page = $rootScope.page || {};
	// Je défini l'attribut TITRE de PAGE
	$rootScope.page.titre = "Création d'un média";
	
	myCtrl.media = undefined;
	
	myCtrl.saveMedia = function()
	{
		var result = undefined;
		CreationMediaService.setPromise(myCtrl.media).then(function(response)
		{
			result = response;
		}, function(){
			// En cas d'erreur
			result = -1;
		});
	}
}]);