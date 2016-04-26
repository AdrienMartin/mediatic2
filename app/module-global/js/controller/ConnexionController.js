var module=angular.module('ModuleApp');

module.controller('ConnexionController', ['$http','$scope','$location','ConnexionService', function($http,$scope,$location,ConnexionService) {
	
	var conCtrl = this;
	
	conCtrl.connexion=function(){
		 var login=$scope.login;
		 var mdp=$scope.mdp;
		
		 ConnexionService.connexion(login,mdp).then(function(response){
			 if(!response){
				 $scope.res="Vos identifiants sont incorrect, veuillez ressaisir vos identifiants";
			 } else {
				 $scope.res = undefined;
			 }
		});
	}
	
	conCtrl.deconnexion=function(){
		console.log('deco');
		ConnexionService.deconnexion();
	
	}
}]);
	

