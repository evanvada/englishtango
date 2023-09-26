import * as GameProgression from "../game/gameProgression.js";
import * as GameOptions from "../game/gameOptions.js";
import GameBundle from "../game/gameBundles.js";

GameProgression.updateAll()

GameOptions.loadAllFromLocalStorage()



const questionCountSpansE = document.querySelectorAll('.question_count');
const startMatchButtonsE = document.querySelectorAll('.start_match');

startMatchButtonsE.forEach(btn => { btn.disabled = true });
startMatchButtonsE.forEach(btn => { btn.addEventListener('click', () => { window.location.href = 'play.html'; }) });



let bundleButtonsE = document.querySelectorAll('.bundles__bundle button');
for (let button of bundleButtonsE) {
	button.setAttribute("onclick", "Practice.toggleBundle(this, '" + button.id + "')")
}

let toggleBundlePressed = false
export function toggleBundle(element, bundle) {

	if (!toggleBundlePressed) {
		GameOptions.setSelectedBundles([])
		toggleBundlePressed = true
		setBubble()
	}
	
	if (!element.classList.contains("checked") && GameBundle.getBundleByName(bundle)) {
		element.classList.add("checked");
		GameOptions.selectedBundles.push(bundle)
	} else {
		element.classList.remove("checked");
		GameOptions.setSelectedBundles(GameOptions.selectedBundles.filter(b => b != bundle))
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













// change floating bubble position
let previousBubble = null;
function setBubble(query, text) {
	let element = document.querySelector(query)
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

setBubble('.bundles__bundle:nth-of-type(1)', "Sélectionnez un exercice")














