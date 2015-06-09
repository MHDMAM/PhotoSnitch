angular.module('PhotoSnitch.services')
	.factory('FiltersService', function FiltersService() {
		var PhotoSnitchFilters = {};

		/**
		 * Convert an image
		 * to a base64 url
		 * @param  {String}   url
		 * @param  {Function} callback
		 * @param  {String}   [outputFormat=image/png | image/jpeg | image/webp (chrome)]
		 */
		PhotoSnitchFilters.convertImgToBase64URL = function(url, callback) {
			var img = new Image();
			img.crossOrigin = 'Anonymous';
			img.onload = function() {
				var canvas = document.createElement('CANVAS'),
					ctx = canvas.getContext('2d'),
					dataURL;
				canvas.height = this.height;
				canvas.width = this.width;
				dataURL = ctx.getImageData(0, 0, canvas.width, canvas.height);
				callback(dataURL);
				canvas = null;
			};
			img.src = url;
		};

		PhotoSnitchFilters.filterImage = function(filter, image, cb) {
			this.convertImgToBase64URL(image, function(pixels) {
				var args = [pixels, cb];
				filter.apply(null, args);
			});

		};

		PhotoSnitchFilters.grayscale = function(pixels, cb) {
			var d = pixels.data;
			for (var i = 0; i < d.length; i += 4) {
				var r = d[i];
				var g = d[i + 1];
				var b = d[i + 2];
				var v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
				d[i] = d[i + 1] = d[i + 2] = v;
			}
			cb(pixels);
		};


		return {
			grayscale: function(image, cb) {
				// return PhotoSnitchFilters.filterImage(this.grayscale, image, cb);
				PhotoSnitchFilters.convertImgToBase64URL(image, function(data) {
					PhotoSnitchFilters.grayscale(data, cb);
				})
			}
		};

	});