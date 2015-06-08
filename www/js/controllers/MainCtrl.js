angular.module('PhotoSnitch.controllers')

.controller('MainCtrl', function($scope, CameraService) {
	$scope.image = {
		src: 'img/default.png',
		hasImage: false
	};

	$scope.loadImage = function() {
		CameraService.getImage().then(function(img) {
			$scope.image.src = img;
		$scope.image.hasImage = true;
		});
	}

});