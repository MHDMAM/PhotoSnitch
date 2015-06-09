angular.module('PhotoSnitch.controllers')

.controller('MainCtrl', function($scope, CameraService, resizeService, FiltersService) {
	$scope.image = {
		src: 'img/default.png',
		hasImage: false,
		isCropping: false,
		srcCropped: null,
		resizing: false,
		size: {
			width: 500,
			height: 500,
			size: 100, // 	resolution
			sizeScale: 'ko',
		},
	};
	// load image..
	$scope.loadImage = function() {
		$scope.image.src = 'img/test.jpg';
		$scope.image.hasImage = true;
		// CameraService.getImage().then(function(img) {
		// 	$scope.image.src = img;
		// $scope.image.hasImage = true;
		// });
	};

	// Cropping.
	$scope.crop = function() {
		$scope.image.isCropping = true;
	};

	$scope.cancelCrop = function() {
		$scope.image.isCropping = false;
	};

	$scope.doneCrop = function() {
		$scope.image.src = $scope.image.srcCropped;
		$scope.image.srcCropped = null;
		$scope.image.isCropping = false;
	};

	// resize.
	$scope.cancelResize = function() {
		$scope.image.resizing = false;
	};
	$scope.resize = function() {
		$scope.image.resizing = true;
	};

	$scope.resizeImage = function() {
		resizeService.resizeImage($scope.image.src, $scope.image.size, function(err, image) {
			if (err) {
				console.error(err);
				return;
			}
			//Add the resized image into the 
			$scope.image.src = image;

		});
	};
	// filters
	$scope.showFilters = function() {
		$scope.image.showFilters = true;
	};

	$scope.hideFilters = function() {
		$scope.image.showFilters = false;
	}

	function updateCanvas(id, data) {
		var cnvs = document.getElementById(id);
		cnvs.width = data.width;
		cnvs.height = data.height;
		var ctx = cnvs.getContext('2d');
		ctx.putImageData(data, 0, 0);
	};

	$scope.grayscale = function() {
		var data = FiltersService.grayscale($scope.image.src);
		updateCanvas('grayscale', data);
	}
	$scope.blur = function() {
		var data = FiltersService.blur($scope.image.src);
		updateCanvas('blur', data);
	}
	$scope.sepia = function() {
		var data = FiltersService.sepia($scope.image.src);
		updateCanvas('sepia', data);
	}
	$scope.opacity = function() {
		var data = FiltersService.opacity($scope.image.src);
		updateCanvas('opacity', data);
	}

});