// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyC_E6MD40DFjVf7ReMqwCgNuTLxW__QU2M',
    authDomain: 'steelstore-ddb2d.firebaseapp.com',
    databaseURL: 'https://steelstore-ddb2d.firebaseio.com',
    projectId: 'steelstore-ddb2d',
    storageBucket: 'steelstore-ddb2d.appspot.com',
    messagingSenderId: '902890289001',
    appId: '1:902890289001:web:eedc9e81cfcc2ab58d6ff8',
    measurementId: 'G-TMCEVVM845',
  },
  version: '1.0.0',
  algolia: {
    appId:  '6E0CUH08OE',
    apiKey: 'c74a12666ee070285aed9ea0c35f137d'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
