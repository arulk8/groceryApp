// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase:{
    apiKey: 'AIzaSyAYDL4YLUw2Hnegx33MqzvUmagrljonTsg',
    authDomain: 'grocery-9a260.firebaseapp.com',
    databaseURL: 'https://grocery-9a260.firebaseio.com',
    projectId: 'grocery-9a260',
    storageBucket: 'grocery-9a260.appspot.com',
    messagingSenderId: '223621662703'
  }

};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
