firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		name = user.displayName;
		uid = user.uid;
		email = user.email;
		checkDisplayname();
		writeUserData(name, uid, email);
		console.log(name + ' logged in');
		$('#login').hide();
		$('#logout').show();
	} else {
		$('#logout').hide();
		$('#login').show();
		console.log('No user logged in');
	}

	// Log user's data to firestore
	function writeUserData(name, uid, email) {
		const database = firebase.firestore();
		const settings = {
			timestampsInSnapshots: true
		};
		database.settings(settings);
		userData = database.collection('users').doc(uid).set({
			name: name,
			uid: uid,
			email: email
		});
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
	function checkDisplayname(name) {
		if (name == 'undefined') {
			name = '';
		}
	}

	// Listen for Jumpday add
	const addJumpday = document.getElementById('add_jumpday');

	// Listen for Workout add
	const addWorkout = document.getElementById('add_workout');
});
