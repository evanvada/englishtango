click_sounds = [
	new Audio('media/clickB3.mp3'),
	new Audio('media/clickB2.mp3'),
	new Audio('media/clickB1.mp3'),
]

loadAllLocalStorage()
loadTheme()
displayBanks(word_banks)

var general_volume_rangeE = document.getElementById("general_volume_range");
general_volume_rangeE.value = general_volume*100
setOption(document.getElementById("responses_option_button"), "responses_options", "selected_responses_option")
setOption(document.getElementById("tenses_option_button"), "tenses_options", "selected_tenses_option")
setOption(document.getElementById("switch_theme_button"), "themes", "selected_theme")









