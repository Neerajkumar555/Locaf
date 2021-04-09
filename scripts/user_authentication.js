 // Initialize the FirebaseUI Widget using Firebase.
 var ui = new firebaseui.auth.AuthUI(firebase.auth());
 var uiConfig = {
     callbacks: {
         signInSuccessWithAuthResult: function (authResult, redirectUrl) {
             var user = authResult.user;

             // checks if the user is a new user/is not in the database
             if (authResult.additionalUserInfo.isNewUser) {

                // adds to database if they are new
                 db.collection("users").doc(user.uid).set({
                         name: user.displayName, 
                         email: user.email 
                     }).then(function () {

                         // redirects the user to the main page
                         window.location.assign("main.html"); 
                     })
                     .catch(function (error) {
                         console.log("Error adding new user: " + error);
                     });
             } else {
                 return true;
             }
             return false;
         },
         uiShown: function () {
             // The widget is rendered.
             // Hide the loader.
             document.getElementById('loader').style.display = 'none';
         }
     },

     // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
     signInFlow: 'popup',
     signInSuccessUrl: 'main.html',
     signInOptions: [
        // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
         // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
         // firebase.auth.GithubAuthProvider.PROVIDER_ID,
         firebase.auth.EmailAuthProvider.PROVIDER_ID,
         // firebase.auth.PhoneAuthProvider.PROVIDER_ID
     ],

     // Terms of service url.
     tosUrl: '<your-tos-url>',

     // Privacy policy url.
     privacyPolicyUrl: '<your-privacy-policy-url>'
 };
 // The start method will wait until the DOM is loaded.
 ui.start('#firebaseui-auth-container', uiConfig);

 var provider = new firebase.auth.FacebookAuthProvider();


 // facebook auth that we couldn't get working
 firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // The signed-in user info.
    var user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var accessToken = credential.accessToken;

    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    // ...
  });
