## angulartics-cordova-firebase

[Cordova Firebase](https://github.com/arnesson/cordova-plugin-firebase) plugin for [Angulartics](https://github.com/angulartics/angulartics).

## Install

First make sure you've read installation and setup instructions for [Angulartics](https://github.com/angulartics/angulartics#install).

Then you can install this package either with `npm` or with `bower`.

### npm

```shell
npm install angulartics-cordova-firebase
```

Then add `angulartics.cordova.firebase` as a dependency for your app:

```javascript
angular.module('myApp', [
  require('angulartics'),
  require('angulartics-cordova-firebase')
]);
```

### bower

```shell
bower install angulartics-cordova-firebase
```

Add the `<script>` to your `index.html`:

```html
<script src="/bower_components/angulartics-cordova-firebase/dist/angulartics-cordova-firebase.min.js"></script>
```

Then add `angulartics.cordova.firebase` as a dependency for your app:

```javascript
angular.module('myApp', [
  'angulartics',
  'angulartics.cordova.firebase'
]);
```

## Documentation

Documentation is available on the [Angulartics site](http://angulartics.github.io/).

## Development

```shell
npm run build
```

## License

[MIT](LICENSE)
