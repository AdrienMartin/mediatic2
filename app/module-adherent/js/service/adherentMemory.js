angular.module('ModuleAdherent').service('MemoryFilter', [function()
{
	var status = {};
	this.get = function(key)
	{
		console.log(key, status[key]);
		status[key] = status[key] || {};
		return status[key];
	}
}]);