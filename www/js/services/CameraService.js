angular.module('PhotoSnitch.services')
  .factory('CameraService', function CameraService($cordovaCamera) {
    var options = {};


    var getOptions = function() {
      options = {
        quality: 100, // full-resolution
        destinationType: Camera.DestinationType.DATA_URL, // Return image as base64-encoded string
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        // sourceType: Camera.PictureSourceType.PHOTOLIBRARY, //Camera.PictureSourceType.CAMERA,

        // Only works when PictureSourceType is PHOTOLIBRARY or SAVEDPHOTOALBUM
        mediaType: Camera.MediaType.PICTURE,

        allowEdit: true,
        correctOrientation: true,
        encodingType: Camera.EncodingType.JPEG,
        // targetWidth: 300,
        // targetHeight: 300,
        popoverOptions: Camera.PopoverArrowDirection,
        saveToPhotoAlbum: true
      };

      options = {
        quality: 100, // full-resolution
        destinationType: Camera.DestinationType.FILE_URI, // Return image as base64-encoded string
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        correctOrientation: true,
        popoverOptions: new CameraPopoverOptions(50, 50, 320, 480, Camera.PopoverArrowDirection.ARROW_ANY),
      };

      return options;
    };

    return {
      getImage: function() {
        return $cordovaCamera.getPicture(getOptions()).then(function(imageData) {
          return imageData;
        }, function(err) {
          console.log(err);
        }, false);

      }
    };

  });