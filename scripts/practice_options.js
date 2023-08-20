



var repetition_options = [
	{name: "repeat_question", fr: "Répéter les question ratées"},
	{name: "one_chance", fr: "Une seule chance"},
]

var question_options = [
	{name: "read_en_write_fr", fr: "Traduire en français"},
	{name: "read_fr_write_en", fr: "Traduire en anglais"},
	{name: "read_fr_choose_en", fr: "Choisir la réponse en anglais"},
	{name: "read_en_choose_fr", fr: "Choisir la réponse en français"},
]

selected_repetition_option ="repeat_question"
selected_question_option = "read_en_write_fr"





function switchOption(element, options, option) {
	// switch to the next index
	let i = window[options].findIndex(item => item.name == window[option])
	i = (i+1)%window[options].length

	// update js variables
    element.querySelector('span').textContent = window[options][i].fr
	window[option] = window[options][i].name
	// localStorage.setItem(option, window[option]);
}






