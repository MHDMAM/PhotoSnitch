# PhotoSnitch

## Initial setup
```sh
# Clone the source code
$$ git clone git@github.com:MHDMAM/PhotoSnitch.git && cd ./PhotoSnitch

# Install NPM dependencies
$ npm install

# Install Bower dependencies
$ bower install

# Add Cordoava platform
$ cordova platform ios
```

# Install Cordoava plugins
###### required plugins:
* com.ionic.keyboard 1.0.4 "Keyboard"
* cordova-plugin-camera 1.1.0 "Camera"
* cordova-plugin-console 1.0.0 "Console"
* cordova-plugin-device 1.0.0 "Device"
* cordova-plugin-splashscreen 2.0.0 "Splashscreen"
* cordova-plugin-whitelist 1.0.0 "Whitelist"
 
# Note:
Before run project update this:

```js
# Under: www\js\controllers\MainCtrl.js
	$scope.loadImage = function() {
		// for browser test..
		// $scope.image.src = 'img/test.jpg';
		// $scope.image.hasImage = true;
		// calling Camera plugin.
		CameraService.getImage().then(function(img) {
			$scope.image.src = img;
		 	$scope.image.hasImage = true;
		 });
	};
```

