firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		name = user.displayName;
		checkDisplayname();
		console.log(name + ' logged in');
		$('#login').hide();
		$('#mobile_nav_login').hide();
		$('#logout').show();
		$('#mobile_nav_logout').show();
	} else {
		notLoggedIn();
		$('#logout').hide();
		$('#mobile_nav_logout').hide();
		$('#login').show();
		$('#mobile_nav_login').show();
		console.log('No user logged in');
	}

	// Not logged in function
	function notLoggedIn() {
		window.location.replace('index.html');
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
		});
	});

	//  Mobile logout functinoality
	const mobileLogoutBtn = document.getElementById('mobile_nav_logout');
	mobileLogoutBtn.addEventListener('click', (e) => {
		firebase.auth().signOut().then(function() {
			window.location.href = 'index.html';
		});
	});

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
});
