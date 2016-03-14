'use strict';

angular.module('myApp.roster', ['ngRoute'])

	.controller('loginCtrl', ['$scope', '$http', function ($scope, $http) {
		console.log("registered the loginCtrl");
		$scope.login = function () {
			console.log("username=" + $scope.username);
			console.log("password=" + $scope.password);
			var auth_token = $http.post('https://eg5f5pcd8i.execute-api.us-east-1.amazonaws.com/prod/getAuthToken', {"username": $scope.username, "password": $scope.password});
			conosle.log("auth_token=" + auth_token);
		};
	}]);