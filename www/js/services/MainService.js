angular.module('PhotoSnitch.services')
	.factory('MainService', function MainService($cordovaCamera) {

		return {
			/**
			 * Convert an image
			 * to a base64 url
			 * @param  {String}   url
			 * @param  {Function} callback
			 * @param  {String}   [outputFormat=image/png | image/jpeg | image/webp (chrome)]
			 */
			convertImgToBase64URL: function(url, outputFormat, callback) {
				var img = new Image();
				img.crossOrigin = 'Anonymous';
				img.onload = function() {
					var canvas = document.createElement('CANVAS'),
						ctx = canvas.getContext('2d'),
						dataURL;
					canvas.height = this.height;
					canvas.width = this.width;
					ctx.drawImage(this, 0, 0);
					dataURL = canvas.toDataURL(outputFormat || 'image/jpeg');
					callback(dataURL);
					canvas = null;
				};
				img.src = url;
			}
		}
	});