angular.module('PhotoSnitch.services')
	.factory('FiltersService', function FiltersService() {
		var PhotoSnitchFilters = {};
		PhotoSnitchFilters.tmpCanvas = document.createElement('canvas');
		PhotoSnitchFilters.tmpCtx = PhotoSnitchFilters.tmpCanvas.getContext('2d');

		PhotoSnitchFilters.createImageData = function(w, h) {
			return this.tmpCtx.createImageData(w, h);
		};
		PhotoSnitchFilters.getCanvas = function(w, h) {
			var c = document.createElement('canvas');
			c.width = w;
			c.height = h;
			return c;
		};

		PhotoSnitchFilters.getPixels = function(img) {
			var c = this.getCanvas(img.width, img.height);
			var ctx = c.getContext('2d');
			ctx.drawImage(img, 0, 0);
			return ctx.getImageData(0, 0, c.width, c.height);
		};

		PhotoSnitchFilters.grayscale = function(pixels) {
			var d = pixels.data;
			for (var i = 0; i < d.length; i += 4) {
				var r = d[i];
				var g = d[i + 1];
				var b = d[i + 2];
				var v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
				d[i] = d[i + 1] = d[i + 2] = v;
			}
			return pixels;
		};

		PhotoSnitchFilters.opacity = function(pixels) {
			var d = pixels.data;
			for (var i = 0; i < d.length; i += 4) {
				d[i + 3] = d[i + 3] * 0.20; // Alph
			}
			return pixels;
		};

		PhotoSnitchFilters.sepia = function(pixels) {
			var d = pixels.data;
			for (var i = 0; i < d.length; i += 4) {
				var r = d[i];
				var g = d[i + 1];
				var b = d[i + 2];
				d[i] = (r * 0.393) + (g * 0.769) + (b * 0.189); // red
				d[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168); // green
				d[i + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131); // blue
			}
			return pixels;
		};

		PhotoSnitchFilters.blur = function(pixels) {
			var blurMtx =
				[1 / 16, 1 / 8, 1 / 16,
					1 / 8, 1 / 5, 1 / 8,
					1 / 16, 1 / 9, 1 / 16
				];

			var side = Math.round(Math.sqrt(blurMtx.length));
			var halfSide = Math.floor(side / 2);

			var src = pixels.data;
			var sw = pixels.width;
			var sh = pixels.height;

			var w = sw;
			var h = sh;
			var output = PhotoSnitchFilters.createImageData(w, h);
			var dst = output.data;

			var alphaFac = 0;

			for (var y = 0; y < h; y++) {
				for (var x = 0; x < w; x++) {
					var sy = y;
					var sx = x;
					var dstOff = (y * w + x) * 4;
					var r = 0,
						g = 0,
						b = 0,
						a = 0;
					for (var cy = 0; cy < side; cy++) {
						for (var cx = 0; cx < side; cx++) {
							var scy = Math.min(sh - 1, Math.max(0, sy + cy - halfSide));
							var scx = Math.min(sw - 1, Math.max(0, sx + cx - halfSide));
							var srcOff = (scy * sw + scx) * 4;
							var wt = blurMtx[cy * side + cx];
							r += src[srcOff] * wt;
							g += src[srcOff + 1] * wt;
							b += src[srcOff + 2] * wt;
							a += src[srcOff + 3] * wt;
						}
					}
					dst[dstOff] = r;
					dst[dstOff + 1] = g;
					dst[dstOff + 2] = b;
					dst[dstOff + 3] = a + alphaFac * (255 - a);
				}
			}
			return output;
		};


		function getImage(img) {
			var _img = document.createElement('img');
			_img.src = img;
			return _img;
		}

		return {
			grayscale: function(image) {
				var img = PhotoSnitchFilters.getPixels(getImage(image));
				return PhotoSnitchFilters.grayscale(img);
			},
			blur: function(image) {
				var img = PhotoSnitchFilters.getPixels(getImage(image));
				return PhotoSnitchFilters.blur(img);
			},
			sepia: function(image) {
				var img = PhotoSnitchFilters.getPixels(getImage(image));
				return PhotoSnitchFilters.sepia(img);
			},
			opacity: function(image) {
				var img = PhotoSnitchFilters.getPixels(getImage(image));
				return PhotoSnitchFilters.opacity(img);
			},
		};

	});