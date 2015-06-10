angular.module('PhotoSnitch.controllers')

.controller('MainCtrl', function($scope, CameraService, resizeService, FiltersService) {
	$scope.image = {
		src: 'img/default.png',
		hasImage: false,
		isCropping: false,
		srcCropped: null,
		resizing: false,
		opacity: 80,
		size: {
			width: 500,
			height: 500,
			size: 100, // resolution
			sizeScale: 'ko',
		},
	};
	// load image..
	$scope.loadImage = function() {
		// for browser test..
		$scope.image.src = 'img/test.jpg';
		$scope.image.hasImage = true;
		// calling Camera plugin.
		// CameraService.getImage().then(function(img) {
		// 	$scope.image.src = img;
		// 	$scope.image.hasImage = true;
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
			$scope.image.src = image;

		});
	};
	// filters
	function updateCanvas(id, data) {
		var cnvs = document.getElementById(id);
		cnvs.width = data.width;
		cnvs.height = data.height;
		var ctx = cnvs.getContext('2d');
		ctx.putImageData(data, 0, 0);
	}

	$scope.showFilters = function() {
		$scope.image.showFilters = true;
	};

	$scope.hideFilters = function() {
		$scope.image.showFilters = false;
	};

	$scope.grayscale = function() {
		updateCanvas('grayscale', FiltersService.grayscale($scope.image.src));
	};
	$scope.blur = function() {
		updateCanvas('blur', FiltersService.blur($scope.image.src));
	};
	$scope.sepia = function() {
		updateCanvas('sepia', FiltersService.sepia($scope.image.src));
	};
	$scope.opacity = function() {
		updateCanvas('opacity', FiltersService.opacity($scope.image.src, $scope.image.opacity / 100));
	};

});