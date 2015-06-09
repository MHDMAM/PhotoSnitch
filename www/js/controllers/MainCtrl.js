angular.module('PhotoSnitch.controllers')

.controller('MainCtrl', function($scope, CameraService, resizeService, MainService) {
	$scope.image = {
		src: 'img/default.png',
		hasImage: false,
		isCropping: false,
		srcCropped: null
	};

	$scope.loadImage = function() {
		$scope.image.src = 'img/test.jpg';
		$scope.image.hasImage = true;
		// CameraService.getImage().then(function(img) {
		// 	$scope.image.src = img;
		// $scope.image.hasImage = true;
		// });
	};

	$scope.resize = function() {
		resizeService.resizeImage($scope.image.src, {
			size: 100, // resolution
			height: 500,
			width: 500,
			sizeScale: 'ko',
		}, function(err, image) {
			if (err) {
				console.error(err);
				return;
			}

			//Add the resized image into the 
			$scope.image.src = image;

		});
	};
	$scope.crop = function() {
		$scope.image.isCropping = true;
	}

	$scope.cancelCrop =function () {
		$scope.image.isCropping = false;
	}

	$scope.doneCrop = function() {
		$scope.image.src = $scope.image.srcCropped;
		$scope.image.srcCropped = null;
		$scope.image.isCropping = false;
	}


});