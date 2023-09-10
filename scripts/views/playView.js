
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
const gameoverBarE = document.querySelector('.gameover .progress-bar__fill');

const bannerCheckE = document.querySelector('.banner.user-input .color1.flat-button');

const gameoverAdvancementsE = document.querySelector('.gameover__advancements');

const progressE = document.querySelector('.progress');
const exerciceE = document.querySelector('.exercice');
const gameoverE = document.querySelector('.gameover');

const mainE = document.querySelector('main');





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
    console.log(GameSession.gameoverInfo)
    generateAdvancementElements()
    GameoverAnimator.start()

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

    GameProgression.streak = 1;
    GameProgression.experience = 230;
    GameSession.gameoverInfo = {
        continuedStreak: true,
        oldExperience: 0,
        gameExpBonus: 0,
        streakExpBonus: 0,
        updatedQuests: 0,
    }
    showGameOver()


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
	updateParticles(gems)
	drawParticles(gems)

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
    child0.classList.add("streak")
    child0.innerHTML = `
    <div class="quest-fire icon"><span>1</span></div>
    <div class="advancement__days">
        <div class="day"><span>L</span><div></div></div>
        <div class="day"><span>M</span><div></div></div>
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

        <div class="day" id="to-be-checked"><span>L</span><div></div></div>
        <div class="day"><span>M</span><div></div></div>
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
        e: child0
    });

    let child1 = document.createElement('div');
    child1.classList.add("advancement")
    child1.classList.add("quest")
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
        progress: 1,
        e: child1
    });
    
    // childX = document.createElement('div');
    // childX.classList.add("advancement")
    // childX.classList.add("quest")
    // childX.innerHTML = `<div class="quest-exercise icon"></div><div class="advancement__side"><span>Joue à ton premier exercice</span><div class="advancement__progress"><div class="progress-bar"><div class="progress-bar__fill"><div class="progress-bar__fill__highlight"></div></div></div><div class="chest icon"></div></div></div>`
    // GameoverAnimator.advancements.push({type: "quest", progress: 1, e: childX});
    // childX = document.createElement('div');
    // childX.classList.add("advancement")
    // childX.classList.add("quest")
    // childX.innerHTML = `<div class="quest-exercise icon"></div><div class="advancement__side"><span>Joue à ton premier exercice</span><div class="advancement__progress"><div class="progress-bar"><div class="progress-bar__fill"><div class="progress-bar__fill__highlight"></div></div></div><div class="chest icon"></div></div></div>`
    // GameoverAnimator.advancements.push({type: "quest", progress: 1, e: childX});
    // childX = document.createElement('div');
    // childX.classList.add("advancement")
    // childX.classList.add("quest")
    // childX.innerHTML = `<div class="quest-exercise icon"></div><div class="advancement__side"><span>Joue à ton premier exercice</span><div class="advancement__progress"><div class="progress-bar"><div class="progress-bar__fill"><div class="progress-bar__fill__highlight"></div></div></div><div class="chest icon"></div></div></div>`
    // GameoverAnimator.advancements.push({type: "quest", progress: 1, e: childX});
    // childX = document.createElement('div');
    // childX.classList.add("advancement")
    // childX.classList.add("quest")
    // childX.innerHTML = `<div class="quest-exercise icon"></div><div class="advancement__side"><span>Joue à ton premier exercice</span><div class="advancement__progress"><div class="progress-bar"><div class="progress-bar__fill"><div class="progress-bar__fill__highlight"></div></div></div><div class="chest icon"></div></div></div>`
    // GameoverAnimator.advancements.push({type: "quest", progress: 1, e: childX});


    let child2 = document.createElement('div');
    child2.classList.add("advancement")
    child2.classList.add("quest")
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
        progress: 0.75,
        e: child2
    });

    let child3 = document.createElement('div');
    child3.classList.add("advancement")
    child3.classList.add("gems")
    child3.innerHTML = `
    <div class="quest-gem icon"></div>
    <div class="advancement__side">
        <span></span>
    </div>
    `
    GameoverAnimator.advancements.push({
        type: "gems",
        reward: 30,
        progress: 1,
        e: child3
    });
}















class GameoverAnimator {

    static run = false;
    static advancements = [];
    static gameoverInfo = [];

    static startAnimateTimer = 0;
    static startAnimateDuration = 0;
    static startAnimateIndex = 0;

    static state = "" // animate_header, update_experience, animate_advancements
    static fast = false;

    static updateExperienceTimer = 0;
    static updateExperienceDuration = 0;

    static lastProgress = 0;

    static start() {
        this.run = true;
        this.state = "animate_header"
        this.animateHeader()
        // this.fast = true
    }


    static async animateHeader() {
        let lvl = gameoverE.querySelector('.gameover__progress__level')
        lvl.textContent = "LVL " + Math.floor(GameSession.gameoverInfo.oldExperience / 100)
        gameoverE.classList.add("centered")
        gameoverE.querySelector(".icon").classList.add("pop")
        gameoverE.querySelector(".icon").classList.remove("invisible")
        gameoverE.querySelector("h3").classList.add("arise")
        gameoverE.querySelector("h3").classList.remove("invisible")
        await wait(500);
        gameoverE.querySelector(".gameover__progress").classList.add("arise")
        gameoverE.querySelector(".gameover__progress").classList.remove("invisible")
        await wait(500);
        this.updateExperienceDuration = (GameProgression.experience - GameSession.gameoverInfo.oldExperience) * 0.01
        this.state = "update_experience"
    }

    static update() {

        if (this.state == "update_experience") {
            this.updateExperienceTimer += deltaTime;

            let ease = easeInOutSine(this.updateExperienceTimer/this.updateExperienceDuration)
            let xpProgress = (GameSession.gameoverInfo.oldExperience + GameProgression.experience*ease)
            let progress = xpProgress % 100
            gameoverBarE.style.width = (progress*1.1)+"%"
            if (progress < this.lastProgress) {
                let lvl = gameoverE.querySelector('.gameover__progress__level')
                lvl.classList.remove("big-heartbeat")
                lvl.offsetWidth
                lvl.classList.add("big-heartbeat")
                console.log("lvl up")
                lvl.textContent = "LVL " + Math.floor(xpProgress / 100)
            }
            this.lastProgress = progress

            if (this.updateExperienceTimer > this.updateExperienceDuration) {
                gameoverE.classList.remove("centered")
                this.state = "animate_advancements"
            }
        }

        if (this.state == "animate_advancements") {
            // start animating each advancement one by one
            this.startAnimateTimer += deltaTime;
            if (this.startAnimateTimer > this.startAnimateDuration) {
                this.startAnimateTimer = 0;
                if (this.startAnimateIndex < this.advancements.length) {
                    let advancement = this.advancements[this.startAnimateIndex]
    
                    gameoverAdvancementsE.appendChild(advancement.e)
                    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                    
                    switch (advancement.type) {
                        case "streak":
                            this.startAnimateDuration = this.fast ? 0.2 : 3.5;
                            this.animateStreakAdvancement(advancement)
                            break;
                        case "quest":
                            this.startAnimateDuration = this.fast ? 0.2 : 2;
                            this.animateQuestAdvancement(advancement)
                            break;
                        case "gems":
                            this.startAnimateDuration = this.fast ? 0.2 : 3.5;
                            this.animateGemAdvancement(advancement)
                            break;
                    }
                    this.startAnimateIndex += 1;
                }
            }
        }
    }

    static continue() {
        this.fast = true;
    }







    static async animateStreakAdvancement(advancement) {
        advancement.e.classList.add("arise")
        const day = advancement.e.querySelector('.day#to-be-checked');
        const icon = advancement.e.querySelector('.icon');
        const number = advancement.e.querySelector('.icon span');
        day.parentElement.scrollLeft = day.offsetLeft - day.parentElement.offsetLeft - day.parentElement.offsetWidth;
        number.textContent = GameProgression.streak - 1;
        await wait(400);
        day.parentElement.scrollTo({ left: day.offsetLeft - day.parentElement.offsetLeft - day.parentElement.offsetWidth/2 + day.offsetWidth/2, behavior: 'smooth' });
        await wait(500);
        day.classList.add("checked")
        day.classList.add("pop")
        await wait(800);
        number.classList.add("pop")
        number.textContent = GameProgression.streak;
        await wait(500);
        advancement.e.classList.add("checked")
        icon.classList.add("ignite-fire")
        await wait(200);
        icon.classList.remove("ignite-fire")
        icon.classList.add("flicker-fire")
    }

    static async animateQuestAdvancement(advancement) {
        advancement.e.classList.add("arise")
        await wait(400);
        const bar = advancement.e.querySelector('.progress-bar__fill');
        bar.style.width = (advancement.progress*100*1.1)+"%"
        if (advancement.progress >= 1) {
            await wait(600);
            advancement.e.querySelector('.chest').style.backgroundImage = "url('media/chest_open.png')"
            advancement.e.querySelector('.chest').classList.add("big-heartbeat")
        }
    }

    static async animateGemAdvancement(advancement) {
        advancement.e.classList.add("arise")
        await wait(400);

        let gspan = advancement.e.querySelector('span');
        let gicon = advancement.e.querySelector('.icon');

        let rectDest = gicon.getBoundingClientRect();
        let dist_x = rectDest.left + rectDest.width / 2 + window.scrollX;
        let dist_y = rectDest.top + rectDest.height / 2 + window.scrollY;

        for (let i in GameoverAnimator.advancements) {
            if (GameoverAnimator.advancements[i].type == "quest" && GameoverAnimator.advancements[i].progress >= 1) {
                
                let rect = GameoverAnimator.advancements[i].e.querySelector('.chest').getBoundingClientRect();
                let pos_x = rect.left + rect.width / 2 + window.scrollX;
                let pos_y = rect.top + rect.height / 2 + window.scrollY;

                let totalGemParticles = randomInt(10, 15)
                let gemParticles = 0

                for (let i = 0; i < totalGemParticles; i++) {
                    new Promise(async () => {

                        // wait before spawning a new gem particle
                        await wait(randomInt(0, 200))

                        // spawn and wait for the gem particle to die
                        let lifetime = 2 + randomFloat(0, 0.5)
                        gems.push(new Gem(pos_x, pos_y, dist_x, dist_y, lifetime))
                        await wait(lifetime*1000)

                        gicon.classList.remove("heartbeat")
                        gspan.classList.remove("heartbeat")
                        gicon.offsetWidth
                        gicon.classList.add("heartbeat")
                        gspan.classList.add("heartbeat")

                        gemParticles += 1;
                        gspan.textContent = "+" + Math.floor(gemParticles/totalGemParticles*advancement.reward) + " Gemmes"

                    })
                }
            }
        }
    }
}







const imageUrls = [
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

for (let i in imageUrls) {
    const image = new Image();
    image.src = imageUrls[i];
}





