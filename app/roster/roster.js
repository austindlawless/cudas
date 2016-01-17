'use strict';

angular.module('myApp.roster', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/roster', {
    templateUrl: 'roster/roster.html',
    controller: 'RosterCtrl'
  });
}])

.controller('RosterCtrl', ['$scope', '$http', function($scope, $http) {
	$http.get("https://eg5f5pcd8i.execute-api.us-east-1.amazonaws.com/prod/cudas_getRoster").then(function(response) {
  	$scope.players = response.data.Items;
	});
}]);