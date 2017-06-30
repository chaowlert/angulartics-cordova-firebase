(function (window, angular, undefined) {
  'use strict';

  angular.module('angulartics.cordova.firebase', ['angulartics'])
    .provider('angularticsCordovaFirebase', function () {
      var angularticsCordovaFirebase = [
        '$q', '$log', 'ready', 'debug', 'trackingId', 'period',
        function ($q, $log, ready, debug, trackingId, period) {
          var deferred = $q.defer();
          var deviceReady = false;

          document.addEventListener('deviceReady', function () {
            deviceReady = true;
            deferred.resolve();
          }, false);

          setTimeout(function () {
            if (!deviceReady) {
              deferred.resolve();
            }
          }, 3000);

          function success() {
            if (debug) {
              $log.info(arguments);
            }
          }

          function failure(err) {
            if (debug) {
              $log.error(err);
            }
          }

          this.init = function () {
            return deferred.promise.then(function () {
              var analytics = window.FirebasePlugin;
              if (analytics) {
                ready(analytics, success, failure);
              } else if (debug) {
                $log.error('Firebase for Cordova is not available');
              }
            });
          };
        }];

      return {
        $get: ['$injector', function ($injector) {
          return $injector.instantiate(angularticsCordovaFirebase, {
            ready: this._ready || angular.noop,
            debug: this.debug,
            trackingId: this.trackingId,
            period: this.period
          });
        }],
        ready: function (fn) {
          this._ready = fn;
        }
      };
    })
    .config(['$analyticsProvider', 'angularticsCordovaFirebaseProvider',
      function ($analyticsProvider, angularticsCordovaFirebaseProvider) {
        angularticsCordovaFirebaseProvider.ready(function (analytics, success, failure) {
          $analyticsProvider.registerSetUsername(function (userId) {
            analytics.setUserId(userId);
          });
          $analyticsProvider.registerSetUserProperties(function (properties) {
            for (var key in properties) {
              analytics.setUserProperty(key, properties[key]);
            }
          });
          $analyticsProvider.registerPageTrack(function (path) {
            analytics.setScreenName(path);
          });
          $analyticsProvider.registerEventTrack(function (action, properties) {
            analytics.logEvent(action, properties);
          });
        });
      }])

    .run(['angularticsCordovaFirebase',
      function (angularticsCordovaFirebase) {
        angularticsCordovaFirebase.init();
      }]);

})(window, window.angular);
