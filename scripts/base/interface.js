var themes = [
	{
		name: "pastel_dream",
		fr: "Rêve Pastel",
		vars: {
			"--bg": "#F9F5ED",
			"--bg2": "#F3ECDF",
			"--text": "#514F4B",
			"--border": "2px solid #BEB6AE",
			"--border-radius": "6px",
			"--button-bg": "#D7C8B6 linear-gradient(45deg, #D7C8B6, #E6D8C6)",
			"--button-text": "#514F4B",
			"--button-hover-bg": "#E6D8C6 linear-gradient(45deg, #E6D8C6, #F3E9DD)",
			"--button-active-bg": "#ffffff",
			"--button-disabled-box-shadow": "inset 0 0 16px #BEB6AE",
			"--button-selected-box-shadow": "inset 0 0 32px #BEB6AE, inset 0 0 32px #BEB6AE",
		}
	},
	{
		name: "vibrant_night",
		fr: "Nuit Vibrante",
		vars: {
			"--bg": "#212133",
			"--bg2": "#32324A",
			"--text": "#ffffff",
			"--border": "2px solid #53537B",
			"--border-radius": "3px",
			"--button-bg": "#32955E linear-gradient(45deg, #33B66E, #158776)",
			"--button-text": "#ffffff",
			"--button-hover-bg": "#52E472 linear-gradient(45deg, #52E472, #24A976)",
			"--button-active-bg": "#ffffff",
			"--button-disabled-box-shadow": "inset 0 0 16px #191725",
			"--button-selected-box-shadow": "inset 0 0 32px #104B60, inset 0 0 32px #104B60",
		}
	},
	{
		name: "bold_spectrum",
		fr: "Spectre Audacieux",
		vars: {
			"--bg": "#1C1C1C",
			"--bg2": "#262626",
			"--text": "#FFFFFF",
			"--border": "2px solid #FF4081",
			"--border-radius": "5px",
			"--button-bg": "#FF4081 linear-gradient(45deg, #FF4081, #FFC300)",
			"--button-text": "#FFFFFF",
			"--button-hover-bg": "#FF5363 linear-gradient(45deg, #FF5363, #FFD744)",
			"--button-active-bg": "#FFFFFF",
			"--button-disabled-box-shadow": "inset 0 0 16px #0F0F0F",
			"--button-selected-box-shadow": "inset 0 0 32px #CE1553, inset 0 0 32px #CE1553",
		}
	},
	{
		name: "harmonious_neutral",
		fr: "Neutre  Harmonieux",
		vars: {
			"--bg": "#495265",
			"--bg2": "#636F89",
			"--text": "#ffffff",
			"--border": "2px solid #A8B7D1",
			"--border-radius": "2px",
			"--button-bg": "#768DB1 linear-gradient(45deg, #768DB1, #A8B7D1)",
			"--button-text": "#ECEFF4",
			"--button-hover-bg": "#6E8DBD linear-gradient(45deg, #6E8DBD, #C2D2F0)",
			"--button-active-bg": "#ECEFF4",
			"--button-disabled-box-shadow": "inset 0 0 16px #2C3847",
			"--button-selected-box-shadow": "inset 0 0 32px #5B759E, inset 0 0 32px #5B759E",
		}
	},
]

function loadTheme() {
	let rootE = document.querySelector(':root');
	let i = themes.findIndex(item => item.name == selected_theme);
	for (let variable in themes[i].vars) {
		rootE.style.setProperty(variable, themes[i].vars[variable]);
	}
}


var responses_options = [
	{name: "one_chance", fr: "Une seule chance"},
	{name: "repeat_question", fr: "Répéter la question"},
]

var tenses_options = [
	{name: "all", fr: "Tous"},
	{name: "infinitive", fr: "Infinitif"},
	{name: "past_simple", fr: "Passé simple"},
	{name: "past_participle", fr: "Participe passé"},
]

function loadAllLocalStorage() {
	general_volume = Number(localStorage.getItem("general_volume")) || 1
	selected_theme = localStorage.getItem("selected_theme") || "pastel_dream"
	selected_responses_option = localStorage.getItem("selected_responses_option") || "one_chance"
	selected_tenses_option = localStorage.getItem("selected_tenses_option") || "infinitive"
	banks_selected = JSON.parse(localStorage.getItem("banks_selected")) || []
}

function playASound(sounds, volume=1, pitch=1) {
	let cloned_sound = null
	if (Array.isArray(sounds)) {cloned_sound = randomItem(sounds).cloneNode()} else {cloned_sound = sounds.cloneNode()}
	if (pitch!=1) {
		cloned_sound.mozPreservesPitch = false;
		cloned_sound.preservesPitch = false;
		cloned_sound.playbackRate = pitch;
	}
	cloned_sound.volume = volume;
	cloned_sound.play();
}




