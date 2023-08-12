

// getting elements
var big_displayE = document.getElementById("game__big_display");
var small_displayE = document.getElementById("game__small_display");
var answer_inputE = document.getElementById("game__answer_input");
var correction_outputE = document.getElementById("game__correction_output");
var checkAnswer_buttonE = document.getElementById("game__checkAnswer_button");
var nextQuestion_buttonE = document.getElementById("game__nextQuestion_button");
var general_volume_rangeE = document.getElementById("general_volume_range");


// loading medias
ding_sounds = [
	new Audio('media/dingB6.mp3'),
	new Audio('media/dingB5.mp3'),
	new Audio('media/dingB4.mp3'),
	new Audio('media/dingB3.mp3'),
	new Audio('media/dingB2.mp3'),
	new Audio('media/dingB1.mp3'),
]
click_sounds = [
	new Audio('media/clickB3.mp3'),
	new Audio('media/clickB2.mp3'),
	new Audio('media/clickB1.mp3'),
]
explosion_sounds = [
	new Audio('media/p1.wav'),
	new Audio('media/p2.wav'),
	new Audio('media/p3.wav'),
	new Audio('media/p4.wav'),
]
var dont = new Audio('media/dont.mp3');
var cheers = new Audio('media/cheers1.mp3');
var simple_win = new Audio('media/win1.mp3');
var simple_lost = new Audio('media/lost1.mp3');


function update() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	matchUpdate();

	// screen shake feedback
	if (shake>0) { shake -= 1 }
	let deg = randomFloat(-shake/10*4, shake/10*4)
	correction_outputE.style.transform = 'rotate('+deg+'deg)';

	// particles feedback
	updateParticles(glitters)
	updateParticles(emojis)
	drawParticles(glitters)
	drawParticles(emojis)
}


loadAllLocalStorage()
general_volume_rangeE.value = general_volume*100
startMatch()
loadTheme()
requestAnimationFrame(loop)








