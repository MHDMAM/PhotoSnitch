angular.module('PhotoSnitch.services')
	.factory('FiltersService', function FiltersService() {
		return {
			grayscale: function(image) {
				return PhotoSnitchFilters.caller(PhotoSnitchFilters.grayscale, image);
			},
			blur: function(image) {
				return PhotoSnitchFilters.caller(PhotoSnitchFilters.blur, image);
			},
			sepia: function(image) {
				return PhotoSnitchFilters.caller(PhotoSnitchFilters.sepia, image);
			},
			opacity: function(image, opacity) {
				return PhotoSnitchFilters.caller(PhotoSnitchFilters.opacity, image, opacity);
			},
		};
	});