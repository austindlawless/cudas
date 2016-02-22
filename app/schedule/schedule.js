'use strict';

angular.module('myApp.schedule', ['ngRoute'])

	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/schedule', {
			templateUrl: 'schedule/schedule.html',
			controller: 'ScheduleCtrl'
		});
	}])

	.controller('ScheduleCtrl', ['$scope', '$http', function ($scope, $http) {
		$http.get("https://eg5f5pcd8i.execute-api.us-east-1.amazonaws.com/prod/cudas_getSchedule").then(function (response) {
			$scope.games = response.data.Item.games;
			console.log($scope);
		});
	}]);