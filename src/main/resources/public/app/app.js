
// Création du module ModuleApp avec les dépendances :
//  - ng-route : pour gérer des URL différentes
//  - ModuleMedia : pour gérer le catalogue de l'application
//  - ModuleAdherent : pour gérer les livres de l'application
//  - ModuleGlobal : pour avoir les filtres
angular.module('ModuleApp', ['ngRoute', 'ModuleAdherent', 'ModuleMedia']);

// Configuration du module ModuleApp
// => Injection du Provider du service $route afin de le configurer.
angular.module('ModuleApp').config(function($routeProvider,$httpProvider){

	    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
	   /* $routeProvider.when('/deconnexion',
	    		{
	    			templateUrl : './module-global/templates/login.html',	
	    			controller : 'ConnexionController',
	    			controllerAs : 'connCtrl'
	    		});*/
		$routeProvider.otherwise({
			redirectTo : '/rechercheMedia'
		})
});

