firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		name = user.displayName;
		userAuthenticatedFunctions();
	} else {
		userNotAuthenticatedFunction();
	}

	// Login functionality
	const loginBtn = document.getElementById('login');
	loginBtn.addEventListener('click', (e) => {
		window.location.replace('auth.html');
	});

	// Mobile login functionality
	const mobileLoginBtn = document.getElementById('mobile_nav_login');
	loginBtn.addEventListener('click', (e) => {
		window.location.replace('auth.html');
	});

	//  Logout functinoality
	const logoutBtn = document.getElementById('logout');
	logoutBtn.addEventListener('click', (e) => {
		firebase.auth().signOut().then(function() {
			window.location.href = 'index.html';
			userNotAuthenticatedFunction();
		});
	});

	//  Mobile logout functinoality
	const mobileLogoutBtn = document.getElementById('mobile_nav_logout');
	mobileLogoutBtn.addEventListener('click', (e) => {
		firebase.auth().signOut().then(function() {
			window.location.href = 'index.html';
			userNotAuthenticatedFunction();
		});
	});

	// Login for no user card
	$('#card_login').click(function() {
		window.location.href = 'auth.html';
	});

	// Display users name in nav bar
	function displayUsernameNav(name) {
		$('#nav_user_ref').html(name);
	}

	// Check user's displayname
	function checkDisplayname(name) {
		if (name == 'undefined') {
			name = '';
		}
	}

	// Mobile Nav Initializer
	$(document).ready(function() {
		$('.sidenav').sidenav();
		// Display user's displayname on mobile nav
		$('#mobile_nav_user_ref').html(name);
	});

	// Listen for Jumpday add
	const addJumpday = document.getElementById('add_jumpday');

	// Listen for Workout add
	const addWorkout = document.getElementById('add_workout');

	// User Authenticated Function
	function userAuthenticatedFunctions() {
		$('#noUserContent').hide();
		$('#addJumpdayCard').show();
		checkDisplayname();
		displayUsernameNav(name);
		console.log(name + ' logged in');
		$('#login').hide();
		$('#mobile_nav_login').hide();
		$('#logout').show();
		$('#mobile_nav_logout').show();
	}

	// User Not Authenticated Function
	function userNotAuthenticatedFunction() {
		$('#noUserContent').show();
		$('#addJumpdayCard').hide();
		$('#logout').hide();
		$('#mobile_nav_logout').hide();
		$('#login').show();
		$('#mobile_nav_login').show();
		console.log('No user logged in');
	}
});
