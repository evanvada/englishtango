
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
sounds.dont = new Audio('media/dont.mp3');
sounds.cheers = new Audio('media/cheers1.mp3');
sounds.simple_win = new Audio('media/win1.mp3');
sounds.simple_lost = new Audio('media/lost1.mp3');






const exerciceDisplayE = document.querySelector('.exercice__display');
const exerciceTitleE = document.querySelector('.exercice h3');

const exerciceAnswerE = document.querySelector('.exercice__answer');
const exerciceAnswerWrongE = document.querySelector('.exercice__answer.wrong');
const exerciceAnswerRightE = document.querySelector('.exercice__answer.right');

const bannerE = document.querySelector('.banner');
const bannerWrongE = document.querySelector('.banner.wrong');
const bannerRightE = document.querySelector('.banner.right');

const bannerWrongCorrectionSpanE = document.querySelector('.banner.wrong span');
const bannerRightCorrectionSpanE = document.querySelector('.banner.right span');
const bannerWrongSymbolE = document.querySelector('.banner.wrong .banner__symbol');
const bannerRightSymbolE = document.querySelector('.banner.right .banner__symbol');

const progressBarFillE = document.querySelector('.progress__bar__fill');














function showRightFeedback() {
    playSound(sounds.ding, general_volume)

    exerciceAnswerRightE.innerHTML = GameSession.questions[0].answers[0].input
    bannerRightCorrectionSpanE.innerHTML = GameSession.questions[0].answers[0].solution
    
    exerciceAnswerE.classList.add("hidden")
    exerciceAnswerWrongE.classList.add("hidden")
    exerciceAnswerRightE.classList.remove("hidden")

    bannerE.classList.add("hidden")
    bannerWrongE.classList.add("hidden")
    bannerRightE.classList.remove("hidden")

    const rect = exerciceAnswerRightE.getBoundingClientRect();
    const pos_x = rect.left + rect.width / 2;
    const pos_y = rect.top + rect.height / 2;
    for (let i = 0; i < randomInt(100, 150); i++) {
        glitters.push(new Glitter(pos_x, pos_y));
    }

	bannerRightSymbolE.classList.remove("pop");
	void bannerRightSymbolE.offsetWidth;
	bannerRightSymbolE.classList.add("pop");

    const progress = (GameSession.archivedQuestions.length+1) / (GameSession.questions.length + GameSession.archivedQuestions.length)
    progressBarFillE.style.width = (progress*100)+"%"
}





function showWrongFeedback() {
    playSound(sounds.dont, general_volume, 0.5+Math.random()*0.5)
    shake = 10;

    exerciceAnswerWrongE.innerHTML = GameSession.questions[0].answers[0].input
    bannerWrongCorrectionSpanE.innerHTML = GameSession.questions[0].answers[0].solution

    exerciceAnswerE.classList.add("hidden")
    exerciceAnswerWrongE.classList.remove("hidden")
    exerciceAnswerRightE.classList.add("hidden")

    bannerE.classList.add("hidden")
    bannerWrongE.classList.remove("hidden")
    bannerRightE.classList.add("hidden")

	bannerWrongSymbolE.classList.remove("pop");
	void bannerWrongSymbolE.offsetWidth;
	bannerWrongSymbolE.classList.add("pop");
}





function showUserInput() {

    exerciceTitleE.innerHTML = GameSession.questions[0].title
    exerciceDisplayE.innerHTML = GameSession.questions[0].prompt

    exerciceAnswerE.classList.remove("hidden")
    exerciceAnswerWrongE.classList.add("hidden")
    exerciceAnswerRightE.classList.add("hidden")

    bannerE.classList.remove("hidden")
    bannerWrongE.classList.add("hidden")
    bannerRightE.classList.add("hidden")

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

    document.querySelector('main').classList.remove("hidden");
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








let blackOverlayE = document.querySelector('.black-overlay');
let bannerOverlayE = document.querySelector('.banner.overlay');

function showSureQuit() {
    if (GameSession.rights > 0) {
        blackOverlayE.classList.remove("hidden")
        bannerOverlayE.classList.remove("hidden")
        void blackOverlayE.offsetWidth;
        void bannerOverlayE.offsetWidth;
        blackOverlayE.classList.add("show-transition")
        bannerOverlayE.classList.add("show-transition")
    } else {
        quitGame()
    }
}

function hideSureQuit() {
    blackOverlayE.classList.remove("show-transition")
    bannerOverlayE.classList.remove("show-transition")

    setTimeout(function(){blackOverlayE.classList.add("hidden")}, 200);
    setTimeout(function(){bannerOverlayE.classList.add("hidden")}, 200);
}

function quitGame() {
    window.removeEventListener("beforeunload", beforeUnloadListener);
    window.location.href = 'practice.html';
    window.history.go(-1);
}

function beforeUnloadListener(e) {
    if (GameSession.rights > 0) {
        e.preventDefault();
        e.returnValue = '';
    }
}

window.addEventListener("beforeunload", beforeUnloadListener);





// switch to next state on enter key press
let wasEnterDown = true;
document.addEventListener('keyup', (event) => {
    if (event.key == "Enter") {
        wasEnterDown = true;
    }
});
document.addEventListener('keydown', (event) => {
    if (event.key == "Enter") {
        if (wasEnterDown) {
            switch (GameSession.state) {
                case "question":
                    checkAnswer()
                    break;
                case "right":
                    continueGame()
                    break;
                case "wrong":
                    continueGame()
                    break;
                case "gameover":
                    quitGame()
                    break;
                default:
                    break;
            }
        }
        wasEnterDown = false;
    }
});



