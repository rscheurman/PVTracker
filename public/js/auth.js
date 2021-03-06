// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uiConfig = {
	callbacks: {
		signInSuccessWithAuthResult: function(authResult, redirectUrl) {
			// User successfully signed in.
			// Return type determines whether we continue the redirect automatically
			// or whether we leave that to developer to handle.
			return true;
		},
		uiShown: function() {
			// The widget is rendered.
			// Hide the loader.
			document.getElementById('loader').style.display = 'none';
		}
	},
	// Will use popup for IDP Providers sign-in flow instead of the default, redirect.
	signInFlow: 'popup',
	signInSuccessUrl: 'index.html',
	signInOptions: [
		//   firebase.auth.FacebookAuthProvider.PROVIDER_ID,
		//   firebase.auth.TwitterAuthProvider.PROVIDER_ID,
		//   firebase.auth.GithubAuthProvider.PROVIDER_ID,
		{
			provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
			requireDisplayName: true
		}
		//   firebase.auth.PhoneAuthProvider.PROVIDER_ID
	],
	// Terms of service url.
	tosUrl: 'index.html',
	// Privacy policy url.
	privacyPolicyUrl: 'index.html'
};

// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);
