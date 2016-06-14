'use strict';

angular.module('myApp.signup', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/signup', {
			templateUrl: 'signup/signup.html',
			controller: 'SignupCtrl'
		});
	}])

	.controller('SignupCtrl', ['$rootScope', '$scope', '$http', '$log', 'UserService', '$window', '$state', function ($rootScope, $scope, $http, $log, UserService, $window, $state) {
		$log.debug('Registering SignupCtrl');

		$scope.signup = function (user) {
			$scope.loading = true;
			$http({
				method: "POST",
				url: 'https://eg5f5pcd8i.execute-api.us-east-1.amazonaws.com/prod/cudas-signup',
				data: {"user": user}
			}).then(function success(response) {
				login(user);
				$state.go('home');
				$scope.loading = false;
			}, function error(response) {
				$log.error(JSON.stringify(response));
				$scope.loading = false;
				$window.alert("There was an error logging in.");
			});
		};

		var login = function (user) {			
			$http({
				method: "POST",
				url: 'https://eg5f5pcd8i.execute-api.us-east-1.amazonaws.com/prod/getAuthToken',
				data: {"username": user.username, "password": user.password}
			}).then(function (response) {
				if (response.data) {
					user.auth_token = response.data.auth_token;
					UserService.setCurrentUser(user);
					$rootScope.$broadcast('authorized');
				} else {
					UserService.setCurrentUser(null);
					$rootScope.$broadcast('unauthorized');
				}
			});
			
		};

	}]);