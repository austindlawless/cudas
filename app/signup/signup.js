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
	}]);