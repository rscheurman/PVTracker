firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		name = user.name;
		checkDisplayname();
		console.log(name + ' is logged in');
		$('#login').hide();
		$('#logout').show();
	} else {
		$('#logout').hide();
		$('#login').show();
		console.log('No user logged in');
	}

	// Login functionality
	const loginBtn = document.getElementById('login');
	loginBtn.addEventListener('click', (e) => {
		window.location.replace('auth.html');
	});

	//  Logout functinoality
	const logoutBtn = document.getElementById('logout');
	logoutBtn.addEventListener('click', (e) => {
		firebase.auth().signOut();
	});

	// Display user's displayname on nav
	const navUserRef = document.getElementById('nav_user_ref');
	navUserRef.innerHTML = name;

	// Check user's displayname
	function checkDisplayname() {
		if (name == 'undefined') {
			name = '';
		}
	}
});
