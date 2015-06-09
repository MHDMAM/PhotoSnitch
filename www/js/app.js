// Ionic PhotoSnitch App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'PhotoSnitch' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('PhotoSnitch', ['ionic', 'PhotoSnitch.controllers', 'PhotoSnitch.services', 'images-resizer', 'angular-img-cropper'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('main', {
      url: '/main',
      templateUrl: 'templates/main.html',
      controller: 'MainCtrl'
    });

  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/tab/dash');
  $urlRouterProvider.otherwise('/main');

});