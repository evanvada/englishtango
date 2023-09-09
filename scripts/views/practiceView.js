




const questionCountSpansE = document.querySelectorAll('.question_count');
const startMatchButtonsE = document.querySelectorAll('.start_match');


startMatchButtonsE.forEach(btn => {btn.addEventListener('click', () => {
	window.location.href = 'play.html';
})});




GameOptions.loadAllFromLocalStorage()


// update bundle buttons
let bundleButtonsE = document.querySelectorAll('.course__bundle button');
for (let button of bundleButtonsE) {
	button.setAttribute("onclick", "toggleBundle(this, '" + button.id + "')")
	startMatchButtonsE.forEach(btn => { btn.disabled = true });
}


// change floating bubble position
let previousBubble = null;
function setBubble(query, text) {
	element = document.querySelector(query)
	if (previousBubble?.parentNode != null) {
		previousBubble.parentNode.removeChild(previousBubble);
	}
	if (element != null) {
		let bubble = document.createElement('div')
		bubble.classList.add('floating-bubble');
		bubble.textContent = text;
		let pointer = document.createElement('img')
		pointer.classList.add('floating-bubble-pointer');
		pointer.src = 'media/arrow.svg';
		bubble.appendChild(pointer);
		element.appendChild(bubble);
		previousBubble = bubble;
	}
}


setBubble('.course__bundle:nth-of-type(1)', "Sélectionnez un exercice")


// // update option buttons
// const switchRepetitionButtonE = document.querySelector("#switch_repetition_option")
// switchRepetitionButtonE.setAttribute("onclick", "switchOption(this, 'repetitionOptions', 'selectedRepetitionOption')")
// switchRepetitionButtonE.innerHTML = "<span>" + GameOptions.repetitionOptions.find(item => item.name == GameOptions.selectedRepetitionOption).fr + "</span>"
// const switchQuestionButtonE = document.querySelector("#switch_question_option")
// switchQuestionButtonE.setAttribute("onclick", "switchOption(this, 'questionOptions', 'selectedQuestionOption')")
// switchQuestionButtonE.innerHTML = "<span>" + GameOptions.questionOptions.find(item => item.name == GameOptions.selectedQuestionOption).fr + "</span>"














function switchOption(element, options, option) {
	// switch to the next index
	let i = GameOptions[options].findIndex(item => item.name == GameOptions[option])
	i = (i+1)%GameOptions[options].length

	// update js variables
    element.querySelector('span').textContent = GameOptions[options][i].fr
	GameOptions[option] = GameOptions[options][i].name
	GameOptions.saveAllToLocalStorage()
}


let toggleBundlePressed = false
function toggleBundle(element, bundle) {

	if (!toggleBundlePressed) {
		GameOptions.selectedBundles = []
		toggleBundlePressed = true
		setBubble()
	}
	
	if (!element.classList.contains("checked") && GameBundle.getBundleByName(bundle)) {
		element.classList.add("checked");
		GameOptions.selectedBundles.push(bundle)
	} else {
		element.classList.remove("checked");
		GameOptions.selectedBundles = GameOptions.selectedBundles.filter(b => b != bundle);
	}

	if (GameOptions.selectedBundles.length > 0) {
		startMatchButtonsE.forEach(btn => { btn.removeAttribute('disabled') });
		questionCountSpansE.forEach(btn => { btn.textContent = "Selectionné : " + GameOptions.selectedBundles.length });
		startMatchButtonsE.forEach(btn => {btn.innerHTML = "<span>" + "Commencer " + GameOptions.selectedBundles.length + " exercices" + "</span>"})
	} else {
		startMatchButtonsE.forEach(btn => { btn.setAttribute('disabled', true) });
		questionCountSpansE.forEach(btn => { btn.textContent = "Pas d'exercices selectionnées" });
		startMatchButtonsE.forEach(btn => {btn.innerHTML = "<span>Commencer</span>"})
	}

	GameOptions.saveAllToLocalStorage()
	questionCountSpansE.forEach(btn => { btn.classList.remove("heartbeat") });
	void questionCountSpansE.forEach(btn  => { btn.offsetWidth });
	questionCountSpansE.forEach(btn => { btn.classList.add("heartbeat") });
}















