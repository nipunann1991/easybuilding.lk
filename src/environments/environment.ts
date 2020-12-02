// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

let serverUrl = "http://localhost:81/easybuilding-api/";

export const environment = {
  production: false,
  baseUrl: serverUrl+'index.php/',
  uploadPath: serverUrl+"assets/uploads/",
  token: JSON.parse(localStorage.getItem('token')),
  profileUrl: '/my-account/user/me/about',
  fb_provider : "2651390971778041",
  google_provider: "308484019125-bouf476qe8mbm9593net0fad8ddgts5q.apps.googleusercontent.com",

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
