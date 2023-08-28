

function switchOption(element, options, option) {
	// switch to the next index
	let i = window[options].findIndex(item => item.name == window[option])
	i = (i+1)%window[options].length

	// update js variables
    element.querySelector('span').textContent = window[options][i].fr
	window[option] = window[options][i].name
	// localStorage.setItem(option, window[option]);
}



function toggleBundle(element, bundle) {
	if (!element.classList.contains("checked")) {
		element.classList.add("checked");
		selectedBundles.push(bundle)
	} else {
		element.classList.remove("checked");
		selectedBundles = selectedBundles.filter(b => b != bundle);
	}

	if (selectedBundles.length > 0) {
		startMatchButton.removeAttribute('disabled');
		questionCountSpan.classList.add("highlight");

		let total = 0
		for (let i = 0; i < selectedBundles.length; i++) {
			total += getBundleSize(selectedBundles[i])
		}

		questionCountSpan.textContent = "Questions : " + total;
	} else {
		startMatchButton.setAttribute('disabled', true);
		questionCountSpan.classList.remove("highlight");
		questionCountSpan.textContent = "Pas de questions selectionnées";
	}

	questionCountSpan.classList.remove("pop");
	void questionCountSpan.offsetWidth;
	questionCountSpan.classList.add("pop");
}


