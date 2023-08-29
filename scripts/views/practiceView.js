




const questionCountSpanE = document.querySelector('#question_count');
const startMatchButtonE = document.querySelector('#start_match');

startMatchButtonE.addEventListener('click', () => {
	window.location.href = 'play.html';
});




GameOptions.loadAllFromLocalStorage()


// update bundle buttons
let bundleButtonsE = document.querySelectorAll('.course__bundle button');
for (let button of bundleButtonsE) {
	button.setAttribute("onclick", "toggleBundle(this, '" + button.id + "')")
	// if checked then check
	if (GameOptions.selectedBundles.includes(button.id)) {
		button.classList.add("checked");
	}
	// if anything was checked then enable start button
	if (GameOptions.selectedBundles.length > 0) {
		startMatchButtonE.removeAttribute('disabled');
		questionCountSpanE.classList.add("highlight");
		questionCountSpanE.textContent = "Selectionné : " + GameOptions.selectedBundles.length;
		startMatchButtonE.innerHTML = "<span>" + "Commencer " + GameOptions.selectedBundles.length + " exercices" + "</span>"
	}
}


// update option buttons
const switchRepetitionButtonE = document.querySelector("#switch_repetition_option")
switchRepetitionButtonE.setAttribute("onclick", "switchOption(this, 'repetitionOptions', 'selectedRepetitionOption')")
switchRepetitionButtonE.innerHTML = "<span>" + GameOptions.repetitionOptions.find(item => item.name == GameOptions.selectedRepetitionOption).fr + "</span>"
const switchQuestionButtonE = document.querySelector("#switch_question_option")
switchQuestionButtonE.setAttribute("onclick", "switchOption(this, 'questionOptions', 'selectedQuestionOption')")
switchQuestionButtonE.innerHTML = "<span>" + GameOptions.questionOptions.find(item => item.name == GameOptions.selectedQuestionOption).fr + "</span>"














function switchOption(element, options, option) {
	// switch to the next index
	let i = GameOptions[options].findIndex(item => item.name == GameOptions[option])
	i = (i+1)%GameOptions[options].length

	// update js variables
    element.querySelector('span').textContent = GameOptions[options][i].fr
	GameOptions[option] = GameOptions[options][i].name
	GameOptions.saveAllToLocalStorage()
}



function toggleBundle(element, bundle) {
	
	if (!element.classList.contains("checked") && GameBundle.getBundleByName(bundle)) {
		element.classList.add("checked");
		GameOptions.selectedBundles.push(bundle)
	} else {
		element.classList.remove("checked");
		GameOptions.selectedBundles = GameOptions.selectedBundles.filter(b => b != bundle);
	}

	if (GameOptions.selectedBundles.length > 0) {
		startMatchButtonE.removeAttribute('disabled');
		questionCountSpanE.classList.add("highlight");
		questionCountSpanE.textContent = "Selectionné : " + GameOptions.selectedBundles.length;
		startMatchButtonE.innerHTML = "<span>" + "Commencer " + GameOptions.selectedBundles.length + " exercices" + "</span>"
	} else {
		startMatchButtonE.setAttribute('disabled', true);
		questionCountSpanE.classList.remove("highlight");
		questionCountSpanE.textContent = "Pas d'exercices selectionnées";
		startMatchButtonE.innerHTML = "<span>Commencer</span>"
	}

	GameOptions.saveAllToLocalStorage()
	questionCountSpanE.classList.remove("pop");
	void questionCountSpanE.offsetWidth;
	questionCountSpanE.classList.add("pop");
}


