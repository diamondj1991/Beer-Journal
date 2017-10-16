// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCoaHHolkDa-QvI4NlNlFxv92YR2mb3iHs",
    authDomain: "beer-journal-qa.firebaseapp.com",
    databaseURL: "https://beer-journal-qa.firebaseio.com",
    projectId: "beer-journal-qa",
    storageBucket: "beer-journal-qa.appspot.com",
    messagingSenderId: "906691488048"
  }
};
