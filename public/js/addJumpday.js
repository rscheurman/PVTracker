firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		name = user.displayName;
		checkDisplayname();
		console.log(name + ' logged in');
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
	function checkDisplayname(name) {
		if (name == 'undefined') {
			name = '';
		}
	}

	// Add form data to firestore
	const addJumpBtn = document.getElementById('addJumpBtn');
	const runStepsId = document.getElementById('runSteps');
	const poleFeetId = document.getElementById('poleFeet');
	const poleInchId = document.getElementById('poleInch');
	const poleWeightId = document.getElementById('poleWeight');
	const mentalQuesId = document.getElementById('mentalQues');
	const goodOrBadId = document.getElementById('goodOrBad');
	const whyGoodOrBadId = document.getElementById('whyGoodOrBad');
	const clearanceYesOrNoId = document.getElementById('clearanceYesOrNo');
	const barHeightId = document.getElementById('barHeight');

	addJumpBtn.addEventListener('click', (e) => {
		e.preventDefault();
		var runSteps = runStepsId.value;
		var poleFeet = poleFeetId.value;
		var poleInch = poleInchId.value;
		var poleWeight = poleWeightId.value;
		var mentalQues = mentalQuesId.value;
		var goodOrBad = goodOrBadId.value;
		var whyGoodOrBad = whyGoodOrBadId.value;
		var clearanceYesOrNo = clearanceYesOrNoId.value;
		var barHeight = barHeightId.value;
		changeNoYes();
		changeGoodOrBad();

		// Change the switch to good or bad vs true or false
		function changeGoodOrBad() {
			if (goodOrBad == true) {
				goodOrBad = 'good';
			} else {
				goodOrBad = 'bad';
			}
		}
		function changeNoYes() {
			if (barHeight == true) {
				barHeight = 'yes';
			} else {
				barHeight = 'no';
			}
		}
		// Get date for jumpday tracking and db refrences
		// Start
		today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1; //January is 0!

		var yyyy = today.getFullYear();
		if (dd < 10) {
			dd = '0' + dd;
		}
		if (mm < 10) {
			mm = '0' + mm;
		}
		var today = mm + '.' + dd + '.' + yyyy;
		// End

		// Push data to firestore
		db = firebase.firestore();

		var jumpData = {
			runSteps: runSteps,
			clearaceYesOrNo: clearanceYesOrNo,
			barHeight: barHeight,
			poleFeet: poleFeet,
			poleInch: poleInch,
			poleWeight: poleWeight,
			mentalQues: mentalQues,
			goodOrBad: goodOrBad,
			whyGoodOrBad: whyGoodOrBad
		};

		db
			.collection('users')
			.doc(user.uid)
			.collection('jumpdays')
			.doc(today)
			.collection('jumps')
			.add(jumpData)
			.then(function() {
				M.toast({ html: 'Jump Added Successfully' });
			})
			.catch(function(error) {
				M.toast({ html: 'Oops Try Again.....', error });
			});

		$('#addJumpForm').trigger('reset');
	});
	// Initialize all Materializecss JS
	M.AutoInit();
});
