// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // get this from "Project Overview > Add Firebase to your web voila!"
  firebase:{
    apiKey: "AIzaSyAUEyR65rsqlsxvaM9w7eTo80QDYd1DGiM",
    authDomain: "ng-fitness-tracker-710f7.firebaseapp.com",
    databaseURL: "https://ng-fitness-tracker-710f7.firebaseio.com",
    projectId: "ng-fitness-tracker-710f7",
    storageBucket: "ng-fitness-tracker-710f7.appspot.com",
    messagingSenderId: "890753641598"
  }
};
