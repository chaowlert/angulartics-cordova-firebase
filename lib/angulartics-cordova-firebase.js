(function (window, angular, undefined) {
  'use strict';

  angular.module('angulartics.cordova.firebase', ['angulartics'])
    .config(['$analyticsProvider', function ($analyticsProvider) {
      $analyticsProvider.registerSetUsername(function (userId) {
        window.FirebasePlugin.setUserId(userId);
      });
      $analyticsProvider.registerSetUserProperties(function (properties) {
        for (var key in properties) {
          window.FirebasePlugin.setUserProperty(key, properties[key]);
        }
      });
      $analyticsProvider.registerPageTrack(function (path) {
        window.FirebasePlugin.setScreenName(path);
      });
      $analyticsProvider.registerEventTrack(function (action, properties) {
        window.FirebasePlugin.logEvent(action, properties);
      });
    }]);

})(window, window.angular);