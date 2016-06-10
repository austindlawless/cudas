'use strict';

angular.module('myApp.home', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/home', {
			templateUrl: 'home/home.html',
			controller: 'HomeCtrl'
		});
	}])

	.controller('HomeCtrl', ['$scope', '$http', '$log', '$uibModal', function ($scope, $http, $log, $uibModal) {
		$log.debug('registered HomeCtrl');

		function updateMessages() {
			$log.debug('updating messages');
			$http.get("https://eg5f5pcd8i.execute-api.us-east-1.amazonaws.com/prod/cudas_getMessages").then(function (response) {
				$scope.messages = response.data.Items;
			});
		}

		updateMessages();

		$scope.open = function () {
			$log.debug("Entered modal open function");

			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'messageModalContent',
				controller: 'ModalInstanceCtrl',
				size: "md"
			});

			modalInstance.result.then(function (selectedItem) {
				$scope.selected = selectedItem;
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		};
	}])

	.controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', '$log', '$http', function ($scope, $uibModalInstance, $log, $http) {

		$scope.post = function (message) {
			$log.debug("Posting message=" + JSON.stringify(message));
			
			$http({
				method: "POST",
				url: 'https://eg5f5pcd8i.execute-api.us-east-1.amazonaws.com/prod/cudas_postMessage',
				data: {"message": message},
				headers: {}
			}).then(function (response) {
				$log.debug("response=" + JSON.stringify(response));
			});

			$uibModalInstance.close();
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	}]);