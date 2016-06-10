'use strict';

angular.module('myApp.home', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/home', {
			templateUrl: 'home/home.html',
			controller: 'HomeCtrl'
		});
	}])

	.controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {
		$http.get("https://eg5f5pcd8i.execute-api.us-east-1.amazonaws.com/prod/cudas_getMessages").then(function (response) {
			$scope.messages = response.data.Items;
		});
	}]);