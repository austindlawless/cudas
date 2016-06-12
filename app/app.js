'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
	'ngRoute',
	'angular-storage',
	'ui.router',
	'ui.bootstrap',
	'myApp.home',
	'myApp.roster',
	'myApp.schedule'
])
	
	.config(['$stateProvider','$routeProvider', '$httpProvider', function ($stateProvider, $routeProvider, $httpProvider) {
		$stateProvider
		.state('schedule', {
			url: '/schedule',
			templateUrl: 'schedule/schedule.html',
			controller: 'ScheduleCtrl'
		});

		$routeProvider.otherwise({redirectTo: '/home'});
		
		$httpProvider.interceptors.push('APIInterceptor');
	}])

	.service('APIInterceptor', ['$rootScope', 'UserService', function ($rootScope, UserService) {
		var service = this;

		service.request = function (config) {
			var currentUser = UserService.getCurrentUser();
			var access_token = currentUser ? currentUser.auth_token : null;
			if (access_token) {
				config.headers.Authorization = access_token;
			}
			return config;
		};

		service.responseError = function (response) {
			if (response.status === 401) {
				$rootScope.$broadcast('unauthorized');
			}
			return response;
		};
	}])

	.service('UserService', ['store', function (store) {
		var service = this,
		currentUser = null;

		service.setCurrentUser = function (user) {
			currentUser = user;
			store.set('user', user);
			return currentUser;
		};

		service.getCurrentUser = function () {
			if (!currentUser) {
				currentUser = store.get('user');
			}
			return currentUser;
		};
	}])
	
	.controller('MainCtrl', ['$rootScope', '$scope', '$http', '$log', 'UserService', function ($rootScope, $scope, $http, $log, UserService) {		
		var main = this;
		
		$log.debug("currentUser=" + JSON.stringify(UserService.getCurrentUser()));

		function logout() {
			$log.debug('Logging out ' + JSON.stringify(main.currentUser));
			main.currentUser = null;
			UserService.setCurrentUser(null);
		}

		main.logout = logout;
		main.currentUser = UserService.getCurrentUser();

		$scope.main = main;
			
		$scope.login = function (user) {
			$log.debug("user=" + JSON.stringify(user));
			
			$http({
				method: "POST",
				url: 'https://eg5f5pcd8i.execute-api.us-east-1.amazonaws.com/prod/getAuthToken',
				data: {"username": user.username, "password": user.password},
				headers: {}
			}).then(function (response) {
				$log.debug("response.data=" + JSON.stringify(response.data));
				if (response.data) {
					user.auth_token = response.data.auth_token;
					UserService.setCurrentUser(user);
					main.currentUser = user;
				} else {
					UserService.setCurrentUser(null);
				}
			});
			
		};
	}]);
