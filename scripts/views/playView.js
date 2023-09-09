
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
const bannerGameoverE = document.querySelector('.banner.over');

const bannerWrongCorrectionSpanE = document.querySelector('.banner.wrong span');
const bannerRightCorrectionSpanE = document.querySelector('.banner.right span');
const bannerWrongSymbolE = document.querySelector('.banner.wrong .banner__symbol');
const bannerRightSymbolE = document.querySelector('.banner.right .banner__symbol');

const progressBarFillE = document.querySelector('.progress .progress-bar__fill');

const bannerCheckE = document.querySelector('.banner.user-input .color1.flat-button');

const gameoverAdvancementsE = document.querySelector('.gameover__advancements');

const progressE = document.querySelector('.progress');
const exerciceE = document.querySelector('.exercice');
const gameoverE = document.querySelector('.gameover');







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
    bannerCheckE.setAttribute('disabled', true)

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
    console.log(GameSession.advancementsToBeDisplayed)
    generateAdvancementElements()
    GameoverAnimator.run = true

    progressE.classList.add("hidden")
    exerciceE.classList.add("hidden")
    bannerE.classList.add("hidden")
    bannerWrongE.classList.add("hidden")
    bannerRightE.classList.add("hidden")
    gameoverE.classList.remove("hidden")
    bannerGameoverE.classList.remove("hidden")
}

















// onclick functions

function noAnswer() {
    exerciceAnswerE.value = "";
    GameSession.checkAnswer(exerciceAnswerE.value);
}

function checkAnswer() {
    GameSession.checkAnswer(exerciceAnswerE.value);
}

function continueGame() {
    GameSession.continueGame();
}

function continueGameover() {
    GameoverAnimator.continue();
}















DataInterface.fetchAll().then(() => {

    GameProgression.loadAllFromLocalStorage();
    GameOptions.loadAllFromLocalStorage();
    GameSession.generateQuestions();
    GameSession.continueGame();

    showGameOver()


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

    if (GameoverAnimator.run) { GameoverAnimator.update() }
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





let wasEnterDown = true;
document.addEventListener('keyup', (event) => {
    if (event.key == "Enter") {
        wasEnterDown = true;
    }
    // enable/disable the check button (useful when accidental double click)
    if (exerciceAnswerE.value.length > 0) {
        bannerCheckE.removeAttribute('disabled')
    } else {
        bannerCheckE.setAttribute('disabled', true)
    }
});
document.addEventListener('keydown', (event) => {
    // switch to next game state on enter key press
    if (event.key == "Enter") {
        if (wasEnterDown) {
            switch (GameSession.state) {
                case "question":
                    if (exerciceAnswerE.value.length > 0) { checkAnswer() }
                    break;
                case "right":
                    continueGame()
                    break;
                case "wrong":
                    continueGame()
                    break;
                case "gameover":
                    continueGameover()
                    break;
                default:
                    break;
            }
        }
        wasEnterDown = false;
    }
});
































function generateAdvancementElements() {
    GameoverAnimator.advancements = []
    
    // TODO : advancements hardcoded, to be changed

    let child0 = document.createElement('div');
    child0.classList.add("advancement")
    child0.innerHTML = `
    <div class="quest-fire icon flicker"><span>1</span></div>
    <div class="advancement__days">
        <div class="day"><span>L</span><div></div></div>
        <div class="day checked"><span>M</span><div></div></div>
        <div class="day"><span>M</span><div></div></div>
        <div class="day"><span>J</span><div></div></div>
        <div class="day"><span>V</span><div></div></div>
        <div class="day"><span>S</span><div></div></div>
        <div class="day"><span>D</span><div></div></div>
        <div class="day"><span>L</span><div></div></div>
        <div class="day"><span>M</span><div></div></div>
        <div class="day"><span>M</span><div></div></div>
        <div class="day"><span>J</span><div></div></div>
        <div class="day"><span>V</span><div></div></div>
        <div class="day"><span>S</span><div></div></div>
        <div class="day"><span>D</span><div></div></div>
    </div>
    `
    GameoverAnimator.advancements.push({
        type: "streak",
        animState: "waiting",
        animTimer: 0,
        e: child0
    });

    let child1 = document.createElement('div');
    child1.classList.add("advancement")
    child1.innerHTML = `
    <div class="quest-exercise icon"></div>
    <div class="advancement__side">
        <span>Joue à ton premier exercice</span>
        <div class="advancement__progress">
            <div class="progress-bar"><div class="progress-bar__fill"><div class="progress-bar__fill__highlight"></div></div></div>
            <div class="chest icon"></div>
        </div>
    </div>
    `
    GameoverAnimator.advancements.push({
        type: "quest",
        animState: "waiting",
        animTimer: 0,
        progress: 1,
        reward: 20,
        e: child1
    });


    let child2 = document.createElement('div');
    child2.classList.add("advancement")
    child2.innerHTML = `
    <div class="quest-bolt icon"></div>
    <div class="advancement__side">
        <span>Gagne 400 XP</span>
        <div class="advancement__progress">
            <div class="progress-bar"><div class="progress-bar__fill" style="width: 50%"><div class="progress-bar__fill__highlight"></div></div></div>
            <div class="chest icon"></div>
        </div>
    </div>
    `
    GameoverAnimator.advancements.push({
        type: "quest",
        animState: "waiting",
        animTimer: 0,
        progress: 0.75,
        reward: 40,
        e: child2
    });

    let child3 = document.createElement('div');
    child3.classList.add("advancement")
    child3.innerHTML = `
    <div class="quest-gem icon"></div>
    <div class="advancement__side">
        <span>+80 gemmes</span>
    </div>
    `
    GameoverAnimator.advancements.push({
        type: "gems",
        animState: "waiting",
        animTimer: 0,
        progress: 1,
        e: child3
    });
}















class GameoverAnimator {


    static run = false;
    static advancements = [];

    static startAnimateTimer = 0.5;
    static startAnimateDuration = 0.5;
    static startAnimateIndex = 0;

    static state = "animate_advancements"
    static fast = false;

    static update() {

        // start animating each advancement one by one
        this.startAnimateTimer += deltaTime;
        if (this.startAnimateTimer > this.startAnimateDuration) {
            this.startAnimateTimer = 0;
            if (this.startAnimateIndex < this.advancements.length) {
                this.advancements[this.startAnimateIndex].animState = "arise";
                this.startAnimateIndex += 1;
            }
        }

        // handle each advancement animation individually
        for (const i in this.advancements) {
            let advancement = this.advancements[i];
            advancement.animTimer += deltaTime;

            if (advancement.animState == "arise") {
                if (!advancement.e.classList.contains("arise")) {
                    advancement.e.classList.add("arise")
                    gameoverAdvancementsE.appendChild(advancement.e)
                }
                if (this.startAnimateTimer > 0.4) {
                    this.startAnimateTimer = 0;
                    advancement.animState = "showoff";
                }
            }

            if (advancement.animState == "showoff") {

                switch (advancement.type) {
                    case "streak":
                        
                        break;
                    case "quest":
                        
                        break;
                    case "gems":
                        
                        break;
                }
            }
        }
    }

    
    // startAnimation() {
    //     for (const i in this.advancements) {
    //         setTimeout(function(){
    //             advancement.classList.add("arise")
    //         }, i*500);
    //     }
    //     for (const i in this.advancements) {
    //         setTimeout(function(){
    //             advancement.classList.add("showoff")
    //         }, i*500 + 500);
    //     }
    // }

    static continue() {
        // go faster
        this.startAnimateDuration = 0.2;
        this.fast = true;
    }
}




