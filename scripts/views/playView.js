
// canvas configuration & update
const canvas = document.querySelector(".canvas-overlay");
const ctx = canvas.getContext("2d");

let lastTime = 0;
let deltaTime = 0;
function loop() {
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	ctx.imageSmoothingEnabled = false;

    const currentTime = new Date();
    deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
    
	update();
	requestAnimationFrame(loop)
}

function startLoop() {
    lastTime = new Date();
    loop();
}




general_volume = 1;

sounds = {};
sounds.ding = [
    new Audio('media/dingB6.mp3'),
    new Audio('media/dingB5.mp3'),
    new Audio('media/dingB4.mp3'),
    new Audio('media/dingB3.mp3'),
    new Audio('media/dingB2.mp3'),
    new Audio('media/dingB1.mp3'),
];
sounds.click = [
    new Audio('media/clickB3.mp3'),
    new Audio('media/clickB2.mp3'),
    new Audio('media/clickB1.mp3'),
];
sounds.dont = new Audio('media/dont.mp3');
sounds.cheers = new Audio('media/cheers1.mp3');
sounds.simple_win = new Audio('media/win1.mp3');
sounds.simple_lost = new Audio('media/lost1.mp3');




const mainE = document.querySelector('main');

const exerciceDisplayE = document.querySelector('.exercice__display');
const exerciceTitleE = document.querySelector('.exercice h3');

const exerciceAnswerE = document.querySelector('.exercice__answer');
const exerciceAnswerWrongE = document.querySelector('.exercice__answer--wrong');
const exerciceAnswerRightE = document.querySelector('.exercice__answer--right');

const responseE = document.querySelector('.response');
const responseWrongE = document.querySelector('.response--wrong');
const responseRightE = document.querySelector('.response--right');

const responseWrongCorrectionSpanE = document.querySelector('.response--wrong .response__correction span');
const responseRightCorrectionSpanE = document.querySelector('.response--right .response__correction span');
const responseWrongSymbolE = document.querySelector('.response--wrong .response__symbol');
const responseRightSymbolE = document.querySelector('.response--right .response__symbol');

const progressBarFillE = document.querySelector('.progress__bar__fill');














function showRightFeedback() {
    playSound(sounds.ding, general_volume)

    exerciceAnswerRightE.innerHTML = GameSession.questions[0].answers[0].input
    responseRightCorrectionSpanE.innerHTML = GameSession.questions[0].answers[0].solution
    
    exerciceAnswerE.classList.add("hidden")
    exerciceAnswerWrongE.classList.add("hidden")
    exerciceAnswerRightE.classList.remove("hidden")

    responseE.classList.add("hidden")
    responseWrongE.classList.add("hidden")
    responseRightE.classList.remove("hidden")

    const rect = exerciceAnswerRightE.getBoundingClientRect();
    const pos_x = rect.left + rect.width / 2;
    const pos_y = rect.top + rect.height / 2;
    for (let i = 0; i < randomInt(100, 150); i++) {
        glitters.push(new Glitter(pos_x, pos_y));
    }

	responseRightSymbolE.classList.remove("pop");
	void responseRightSymbolE.offsetWidth;
	responseRightSymbolE.classList.add("pop");

    const progress = (GameSession.archivedQuestions.length+1) / (GameSession.questions.length + GameSession.archivedQuestions.length)
    progressBarFillE.style.width = (progress*100)+"%"
}





function showWrongFeedback() {
    playSound(sounds.dont, general_volume, 0.5+Math.random()*0.5)
    shake = 10;

    exerciceAnswerWrongE.innerHTML = GameSession.questions[0].answers[0].input
    responseWrongCorrectionSpanE.innerHTML = GameSession.questions[0].answers[0].solution

    exerciceAnswerE.classList.add("hidden")
    exerciceAnswerWrongE.classList.remove("hidden")
    exerciceAnswerRightE.classList.add("hidden")

    responseE.classList.add("hidden")
    responseWrongE.classList.remove("hidden")
    responseRightE.classList.add("hidden")

	responseWrongSymbolE.classList.remove("pop");
	void responseWrongSymbolE.offsetWidth;
	responseWrongSymbolE.classList.add("pop");
}





function showUserInput() {

    exerciceTitleE.innerHTML = GameSession.questions[0].title
    exerciceDisplayE.innerHTML = GameSession.questions[0].prompt

    exerciceAnswerE.classList.remove("hidden")
    exerciceAnswerWrongE.classList.add("hidden")
    exerciceAnswerRightE.classList.add("hidden")

    responseE.classList.remove("hidden")
    responseWrongE.classList.add("hidden")
    responseRightE.classList.add("hidden")

    exerciceAnswerE.value = ""
    exerciceAnswerE.focus()
}

function showGameOver() {
    
}

















// onclick functions

function noAnswer() {
    exerciceAnswerE.value = "";
    GameSession.checkAnswer();
}

function checkAnswer() {
    GameSession.checkAnswer();
}

function continueGame() {
    GameSession.continueGame();
}















DataInterface.fetchAll().then(() => {

    GameOptions.loadAllFromLocalStorage();
    GameSession.generateQuestions();
    GameSession.continueGame();

    startLoop();

    mainE.classList.remove("hidden");
})









shake = 0;

function update() {
    
	// screen shake feedback
	if (shake>0) { shake -= 1 }
	let deg = randomFloat(-shake/10*4, shake/10*4)
	exerciceAnswerWrongE.style.transform = 'rotate('+deg+'deg)';

	updateParticles(glitters)
	drawParticles(glitters)
}







