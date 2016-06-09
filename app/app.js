'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
	'ngRoute',
	'angular-storage',
	'myApp.home',
	'myApp.roster',
	'myApp.schedule'
])
	
	.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
		$routeProvider.otherwise({redirectTo: '/home'});
		
		$httpProvider.interceptors.push('APIInterceptor');
	}])

	.service('APIInterceptor', function ($rootScope, UserService) {
        var service = this;

        service.request = function (config) {
			var currentUser = UserService.getCurrentUser(),
				access_token = currentUser ? currentUser.access_token : null;

			if (access_token) {
				config.headers.authorization = access_token;
			}
			return config;
        };

        service.responseError = function (response) {
			if (response.status === 401) {
				$rootScope.$broadcast('unauthorized');
			}
			return response;
        };
    })

	.service('UserService', function (store) {
		console.log('entered UserService');
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
	})
	
	.controller('MainCtrl', ['$rootScope', '$scope', '$http', 'UserService', function ($rootScope, $scope, $http, UserService) {
		console.log("registered the loginCtrl");
		
		var main = this;
		
		console.log("currentUser=" + JSON.stringify(UserService.getCurrentUser()));

		function logout() {
				main.currentUser = UserService.setCurrentUser(null);
		}

		$rootScope.$on('authorized', function () {
				console.log("broadcast - authorized");
				main.currentUser = UserService.getCurrentUser();
				console.log('currentUser =' + main.currentUser);
		});

		$rootScope.$on('unauthorized', function () {
				console.log("broadcast - unauthorized");
				main.currentUser = UserService.setCurrentUser(null);
		});

		main.logout = logout;
		main.currentUser = UserService.getCurrentUser();

		$scope.main = main;
			
		$scope.login = function (user) {
			console.log("username=" + user.username);
			console.log("password=" + user.password);
			
			$http({
				method: "POST",
				url: 'https://eg5f5pcd8i.execute-api.us-east-1.amazonaws.com/prod/getAuthToken',
				data: {"username": user.username, "password": user.password},
				headers: {}
			}).then(function (response) {
				console.log("response.data=" + JSON.stringify(response.data));
				if (response.data) {
					user = {};
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
