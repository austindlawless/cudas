'use strict';

angular.module('myApp.home', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/home', {
			templateUrl: 'home/home.html',
			controller: 'HomeCtrl'
		});
	}])

	.controller('HomeCtrl', ['$scope', '$http', '$log', '$uibModal', '$rootScope', 'UserService', function ($scope, $http, $log, $uibModal, $rootScope, UserService) {

		function updateMessages() {
			$log.debug('updating messages');
			$http.get("https://eg5f5pcd8i.execute-api.us-east-1.amazonaws.com/prod/cudas_getMessages").then(function (response) {
				$scope.messages = response.data.Items;
			});
		}

		$scope.currentUser = UserService.getCurrentUser();

		updateMessages();

		$rootScope.$on('messagePosted', function() {
			updateMessages();
		});

		$scope.open = function () {
			$log.debug("Entered modal open function");

			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'messageModalContent',
				controller: 'ModalInstanceCtrl',
				size: "md"
			});

			modalInstance.result.then(function () {
				$log.info('Message post sent at : ' + new Date());
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		};
	}])

	.controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', '$log', '$http', '$rootScope', function ($scope, $uibModalInstance, $log, $http, $rootScope) {

		$scope.post = function (message) {
			$log.debug("Posting message=" + JSON.stringify(message));
			
			$http({
				method: "POST",
				url: 'https://eg5f5pcd8i.execute-api.us-east-1.amazonaws.com/prod/cudas_postMessage',
				data: {"message": message},
				headers: {}
			}).then(function (response) {
				$log.debug("response=" + JSON.stringify(response));
				$rootScope.$broadcast('messagePosted');
			});

			$uibModalInstance.close();
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	}]);