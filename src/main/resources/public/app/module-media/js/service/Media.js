angular.module('ModuleMedia').service('MediaService', [function()
{
	var status = {};
	this.get = function(key)
	{
		status[key] = status[key] || {};
		return status[key];
	}
}]);