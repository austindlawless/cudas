'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
	'ngRoute',
	'myApp.home',
	'myApp.roster',
	'myApp.schedule'
]).

	config(['$routeProvider', function ($routeProvider) {
		$routeProvider.otherwise({redirectTo: '/home'});
	}]);
