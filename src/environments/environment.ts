// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    authDomain: 'fotos-1d490.firebaseapp.com',
    databaseURL: 'https://fotos-1d490.firebaseio.com',
    projectId: 'fotos-1d490',
    storageBucket: 'fotos-1d490.appspot.com',
    messagingSenderId: '386478357582'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
