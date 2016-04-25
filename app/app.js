'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
	'ngRoute',
	'angulartics',
	'angulartics.google.analytics',
	'myApp.home',
	'myApp.roster',
	'myApp.schedule'
]).

	config(['$routeProvider', function ($routeProvider) {
		$routeProvider.otherwise({redirectTo: '/home'});
	}]);
