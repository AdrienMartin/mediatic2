var module=angular.module('ModuleApp');

module.controller('TopController', ['ConnexionService', function(ConnexionService) {
	
	var topCtrl = this;
	topCtrl.isConnected=function(){
		return ConnexionService.isConnected();
	}
	
	
}]);
	

