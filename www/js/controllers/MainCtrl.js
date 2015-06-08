angular.module('PhotoSnitch.controllers')

.controller('MainCtrl', function($scope, CameraService) {
	$scope.image = {
		src: 'img/default.png',
		hasImage: false
	};

	$scope.loadImage = function() {
		$scope.image.src = 'https://itspak.files.wordpress.com/2011/10/green-natural-scenes-31.jpg';
		$scope.image.hasImage = true;
		// CameraService.getImage().then(function(img) {
		// 	$scope.image.src = img;
		// $scope.image.hasImage = true;
		// });
	}

});