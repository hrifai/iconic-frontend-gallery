const {gapi} =  require('googleapis');
//
// const worker = {
//   "client_id": "17946547517-2qj89ja47rth1b58fh6mvj5rvjls2f13.apps.googleusercontent.com",
//   "secret": "wPonaGjjg7SLpaS7X4QFD_a3",
//   "redirect": ""
// };
//
// const oauth2Client = new google.auth.OAuth2(
//   worker.client_id,
//   worker.secret,
//   worker.redirect
// );
//
// const scopes = ["https://www.googleapis.com/auth/spreadsheets"];
//
// const code = oauth2Client.generateAuthUrl({
//   "access_type": "offline",
//   "scope": scopes
// });
//
// console.log(code);

var params = {
  clientid: '17946547517-6n6g819umsr03qc0t25pt7ehsrqjji5k.apps.googleusercontent.com',
  secret: 'mEqmODsKK6LYbGmVwXZ_kqMK',
  api: 'AIzaSyBz_hOf23HuFSOXQfRAOLVu2T-B_Js2aeg'
};

// Client ID and API key from the Developer Console
var CLIENT_ID = params.clientid;
var API_KEY = params.api;

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/spreadsheets.append";


/**
 *  On load, called to load the auth2 library and API client library.
 */
(function handleClientLoad() {
  gapi.load('client:auth2', initClient);
})();

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    handleAuthClick(e)
  }, function(error) {
    appendPre(JSON.stringify(error, null, 2));
  });
}


/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

