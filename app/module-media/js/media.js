// Création du module ModuleMedia
angular.module('ModuleMedia', ['ngRoute']);

// Configuration du module ModuleMedia
// => Injection du Provider du service $route afin de configurer la route des medias.
angular.module('ModuleMedia').config(function($routeProvider)
{
	$routeProvider.when('/rechercheMedia',
	{
		templateUrl : './module-media/templates/rechercheMedia.html',
		controller : 'RechercheMediaController',
		controllerAs : 'medCtrl'
	});

	$routeProvider.when('/ficheMedia/:idMedia',
	{
		templateUrl : './module-media/templates/ficheMedia.html',
		controller : 'FicheMediaController',
		controllerAs : 'medCtrl'
	});

	$routeProvider.when('/creationMedia/',
	{
		templateUrl : './module-media/templates/creationMedia.html',
		controller : 'CreationMediaController',
		controllerAs : 'medCtrl'
	});
});