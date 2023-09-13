
import * as Utils from "/scripts/utils.js";
import * as DataInterface from "/scripts/data/dataInterface.js";

import * as GameProgression from "/scripts/game/gameProgression.js";
import * as GameOptions from "/scripts/game/gameOptions.js";
import * as GameSession from "/scripts/game/gameSession.js";
import * as Particles from "/scripts/game/particles.js";

import * as GameoverAnimation from "/scripts/views/gameoverAnimation.js";



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




export let generalVolume = 1;

export let sounds = {};
sounds.ding = [
    new Audio('media/dingB6.mp3'),
    new Audio('media/dingB5.mp3'),
    new Audio('media/dingB4.mp3'),
    new Audio('media/dingB3.mp3'),
    new Audio('media/dingB2.mp3'),
    new Audio('media/dingB1.mp3'),
];
sounds.dont = new Audio('media/dont.mp3');
sounds.load = new Audio('media/load.mp3');
sounds.cheers = new Audio('media/cheers1.mp3');
sounds.simple_win = new Audio('media/win1.mp3');
sounds.simple_lost = new Audio('media/lost1.mp3');

sounds.chestNotif = new Audio('media/chest_notif.mp3');
sounds.questPop = new Audio('media/quest_pop.mp3');
sounds.chestPop = new Audio('media/chest_pop.mp3');
sounds.gemPop = new Audio('media/gem_pop.mp3');
sounds.ignite = new Audio('media/ignite.mp3');





export const exerciceDisplayE = document.querySelector('.exercice__display');
export const exerciceTitleE = document.querySelector('.exercice h3');

export const exerciceAnswerE = document.querySelector('.exercice__answer');
export const exerciceAnswerWrongE = document.querySelector('.exercice__answer.wrong');
export const exerciceAnswerRightE = document.querySelector('.exercice__answer.right');

export const bannerE = document.querySelector('.banner');
export const bannerWrongE = document.querySelector('.banner.wrong');
export const bannerRightE = document.querySelector('.banner.right');
export const bannerGameoverE = document.querySelector('.banner.over');

export const bannerWrongCorrectionSpanE = document.querySelector('.banner.wrong span');
export const bannerRightCorrectionSpanE = document.querySelector('.banner.right span');
export const bannerWrongSymbolE = document.querySelector('.banner.wrong .banner__symbol');
export const bannerRightSymbolE = document.querySelector('.banner.right .banner__symbol');

export const progressBarFillE = document.querySelector('.progress .progress-bar__fill');
export const gameoverBarE = document.querySelector('.gameover .progress-bar__fill');

export const checkAnswerButtonE = document.querySelector('.banner.user-input .color1.flat-button');
export const continueGameoverButtonE = document.querySelector('.banner.over .border.gray.flat-button');

export const gameoverAdvancementsE = document.querySelector('.gameover__advancements');

export const progressE = document.querySelector('.progress');
export const exerciceE = document.querySelector('.exercice');
export const gameoverE = document.querySelector('.gameover');

export const mainE = document.querySelector('main');





function showRightFeedback() {
    Utils.playSound(sounds.ding, generalVolume)

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
    for (let i = 0; i < Utils.randomInt(100, 150); i++) {
        Particles.glitters.push(new Particles.Glitter(pos_x, pos_y));
    }

	bannerRightSymbolE.classList.remove("pop");
	void bannerRightSymbolE.offsetWidth;
	bannerRightSymbolE.classList.add("pop");

    const progress = (GameSession.archivedQuestions.length+1) / (GameSession.questions.length + GameSession.archivedQuestions.length)
    progressBarFillE.style.width = (progress*100)+"%"
}

function showWrongFeedback() {
    Utils.playSound(sounds.dont, generalVolume, 0.5+Math.random()*0.5)
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
    checkAnswerButtonE.setAttribute('disabled', true)

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

function showGameover() {
    progressE.classList.add("hidden")
    exerciceE.classList.add("hidden")
    bannerE.classList.add("hidden")
    bannerWrongE.classList.add("hidden")
    bannerRightE.classList.add("hidden")
    gameoverE.classList.remove("hidden")
    bannerGameoverE.classList.remove("hidden")

    GameoverAnimation.start()
}

















// onclick functions

export function noAnswer() {
    exerciceAnswerE.value = "";
    GameSession.checkAnswer(exerciceAnswerE.value, showRightFeedback, showWrongFeedback);
}

export function checkAnswer() {
    GameSession.checkAnswer(exerciceAnswerE.value, showRightFeedback, showWrongFeedback);
}

export function continueGame() {
    GameSession.continueGame(showUserInput, showGameover);
}

export function continueGameover() {
    if (GameoverAnimation.fast || GameoverAnimation.state == "end") {
        quitGame()
    } else {
        GameoverAnimation.goFaster();
    }
}














DataInterface.fetchAll().then(() => {

    GameProgression.loadAllFromLocalStorage();
    GameOptions.loadAllFromLocalStorage();
    GameSession.generateQuestions();
    GameSession.continueGame(showUserInput, showGameover);

    GameProgression.updateAll();

    startLoop();

    mainE.classList.remove("hidden");
})









let shake = 0;

function update() {
    
	// screen shake feedback
	if (shake>0) { shake -= 1 }
	let deg = Utils.randomFloat(-shake/10*4, shake/10*4)
	exerciceAnswerWrongE.style.transform = 'rotate('+deg+'deg)';

	Particles.updateParticles(Particles.glitters, deltaTime)
	Particles.drawParticles(Particles.glitters, ctx)
	Particles.updateParticles(Particles.gems, deltaTime)
	Particles.drawParticles(Particles.gems, ctx)

    if (GameoverAnimation.run) { GameoverAnimation.update(deltaTime) }
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
        checkAnswerButtonE.removeAttribute('disabled')
    } else {
        checkAnswerButtonE.setAttribute('disabled', true)
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





const imageURLsPreload = [
    "../../media/chest_open.png",
    "../../media/englishtango.png",
    "../../media/practice.png",
    "../../media/study.png",
    "../../media/vocabulary.png",
    "../../media/quests.png",
    "../../media/settings.png",
    "../../media/english.png",
    "../../media/fire.png",
    "../../media/bolt.png",
    "../../media/gem.png",
    "../../media/chest.png",
    "../../media/quest_exercise.png",
    "../../media/quest_locked.png",
    "../../media/quest_bolt.png",
    "../../media/quest_fire.png",
    "../../media/quest_gem.png",
    "../../media/inf.png",
    "../../media/ps.png",
    "../../media/pp.png",
    "../../media/cross.svg",
    "../../media/right.svg",
    "../../media/wrong.svg",
    "../../media/win.png",
]

for (let i in imageURLsPreload) {
    const image = new Image();
    image.src = imageURLsPreload[i];
}





