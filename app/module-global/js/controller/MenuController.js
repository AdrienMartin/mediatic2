angular.module('ModuleApp').controller('MenuController', ['$location', function($location)
{
	var myCtrl = this;
	
	myCtrl.showAdherents = function()
	{
		$location.path('/adherent');
	}
	
	myCtrl.showMedias = function()
	{
		$location.path('/rechercheMedia');
	}
	
	myCtrl.showCreationMedias = function()
	{
		$location.path('/creationMedia');
	}
	
	
	myCtrl.showCreationAdherents = function()
	{
		$location.path('/creationAdherent');
	}
}]);