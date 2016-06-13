'use strict';

angular.module('myApp.signup', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/signup', {
			templateUrl: 'signup/signup.html',
			controller: 'SignupCtrl'
		});
	}])

	.controller('SignupCtrl', ['$scope', '$http', '$log', '$rootScope', function ($scope, $http, $log, $uibModal, $rootScope) {
		$log.debug('Registering SignupCtrl');

		$scope.signup = function (user) {
			$log.debug("Signing up user=" + JSON.stringify(user));
			
			$http({
				method: "POST",
				url: 'https://eg5f5pcd8i.execute-api.us-east-1.amazonaws.com/prod/cudas-signup',
				data: {"user": user}
			}).then(function (response) {
				$log.debug("response=" + JSON.stringify(response));
			});
		};

	}]);