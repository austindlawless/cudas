'use strict';

angular.module('myApp.roster', ['ngRoute'])

	.controller('loginCtrl', ['$scope', '$http', function ($scope, $http) {
		console.log("registered the loginCtrl");
		$scope.login = function () {
			console.log("username=" + $scope.username);
			console.log("password=" + $scope.password);
		};
	}]);