
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
sounds.load = new Audio('media/load.mp3');
sounds.cheers = new Audio('media/cheers1.mp3');
sounds.simple_win = new Audio('media/win1.mp3');
sounds.simple_lost = new Audio('media/lost1.mp3');

sounds.chestNotif = new Audio('media/chest_notif.mp3');
sounds.questPop = new Audio('media/quest_pop.mp3');
sounds.chestPop = new Audio('media/chest_pop.mp3');
sounds.gemPop = new Audio('media/gem_pop.mp3');
sounds.ignite = new Audio('media/ignite.mp3');





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
    if (!GameoverAnimator.fast) {
        GameoverAnimator.goFaster();
    } else {
        quitGame()
    }
}















DataInterface.fetchAll().then(() => {

    GameProgression.loadAllFromLocalStorage();
    GameOptions.loadAllFromLocalStorage();
    GameSession.generateQuestions();
    GameSession.continueGame();

    // GameProgression.streak = 1;
    // GameProgression.experience = 230;
    // GameSession.gameoverInfo = {
    //     continuedStreak: true,
    //     oldExperience: 0,
    //     gameExpBonus: 0,
    //     streakExpBonus: 0,
    //     updatedQuests: 0,
    // }
    // showGameOver()
    GameProgression.generateQuestsIfNecessary();


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







































class GameoverAnimator {

    static run = false;
    static advancementsInfo = [];
    static gameoverInfo = [];

    static startAnimateTimer = 0;
    static startAnimateDuration = 0;
    static startAnimateIndex = 0;

    static state = "" // animate_header, cooldown_update_experience, update_experience, animate_advancements
    static fast = false;

    static updateExperienceTimer = 0;
    static updateExperienceDuration = 0;
    
    static updateExperienceCooldownTimer = 0;
    static updateExperienceCooldownDuration = 0;

    static lastProgress = 0;

    static start() {
        this.run = true
        this.state = "animate_header"
        this.generateAdvancementsInfo()
        this.animateHeader()
    }


    static async animateHeader() {
        playSound(sounds.simple_win, general_volume)
        this.updateExperienceCooldownDuration = 0.8;
        this.state = "cooldown_update_experience"

        let lvl = gameoverE.querySelector('.gameover__progress__level')
        lvl.textContent = "LVL " + Math.floor(GameSession.gameoverInfo.oldExperience / 100)
        let progress = GameSession.gameoverInfo.oldExperience % 100
        gameoverBarE.style.width = (progress*1.05)+"%"

        gameoverE.classList.add("centered")
        gameoverE.querySelector(".icon").classList.add("pop")
        gameoverE.querySelector(".icon").classList.remove("invisible")
        gameoverE.querySelector("h3").classList.add("arise")
        gameoverE.querySelector("h3").classList.remove("invisible")
        await wait(400);
        gameoverE.querySelector(".gameover__progress").classList.add("arise")
        gameoverE.querySelector(".gameover__progress").classList.remove("invisible")
    }

    static update() {
        if (this.state == "cooldown_update_experience") {
            this.updateExperienceCooldownTimer += deltaTime;
            if (this.updateExperienceCooldownTimer > this.updateExperienceCooldownDuration) {
                this.updateExperienceDuration = 0.8;
                this.state = "update_experience"
                playSound(sounds.load, general_volume*0.25)
            }
        }

        if (this.state == "update_experience") {
            this.updateExperienceTimer += deltaTime;

            let ease = easeInOutSine(this.updateExperienceTimer/this.updateExperienceDuration)
            let xpProgress = (GameSession.gameoverInfo.oldExperience + (GameProgression.experience - GameSession.gameoverInfo.oldExperience)*ease)
            let progress = xpProgress % 100
            gameoverBarE.style.width = (progress*1.05)+"%"
            if (progress < this.lastProgress) {
                let lvl = gameoverE.querySelector('.gameover__progress__level')
                lvl.classList.remove("big-heartbeat")
                lvl.offsetWidth
                lvl.classList.add("big-heartbeat")
                lvl.textContent = "LVL " + Math.floor(xpProgress / 100)
                playSound(sounds.ding, general_volume*1)
                playSound(sounds.chestNotif, general_volume*0.1)
            }
            this.lastProgress = progress

            if (this.updateExperienceTimer > this.updateExperienceDuration) {
                gameoverE.classList.remove("centered")
                this.state = "animate_advancements"
                this.startAnimateDuration = 1;
            }
        }

        if (this.state == "animate_advancements") {
            // start animating each advancement one by one
            this.startAnimateTimer += deltaTime;
            if (this.startAnimateTimer > this.startAnimateDuration) {
                this.startAnimateTimer = 0;
                if (this.startAnimateIndex < this.advancementsInfo.length) {
                    let advancementInfo = this.advancementsInfo[this.startAnimateIndex]
    
                    gameoverAdvancementsE.appendChild(advancementInfo.e)
                    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                    
                    switch (advancementInfo.type) {
                        case "streak":
                            this.startAnimateDuration = 3.5;
                            this.animateStreakAdvancement(advancementInfo)
                            break;
                        case "quest":
                            this.startAnimateDuration = 2;
                            this.animateQuestAdvancement(advancementInfo)
                            break;
                        case "gems":
                            this.startAnimateDuration = 3.5;
                            this.animateGemAdvancement(advancementInfo)
                            break;
                    }
                    this.startAnimateIndex += 1;
                }
            }
        }

        if (this.fast) {
            this.startAnimateDuration = 0.1;
            this.updateExperienceCooldownDuration = 0;
            this.updateExperienceDuration = 0.1;
        }
    }

    static goFaster() {
        this.fast = true;
    }












    static async animateStreakAdvancement(advancementInfo) {
        advancementInfo.e.classList.add("arise")
        const day = advancementInfo.e.querySelector('.day#to-be-checked');
        const icon = advancementInfo.e.querySelector('.icon');
        const number = advancementInfo.e.querySelector('.icon span');
        day.parentElement.scrollLeft = day.offsetLeft - day.parentElement.offsetLeft - day.parentElement.offsetWidth;
        number.textContent = GameProgression.streak - 1;
        await wait(400);
        day.parentElement.scrollTo({ left: day.offsetLeft - day.parentElement.offsetLeft - day.parentElement.offsetWidth/2 + day.offsetWidth/2, behavior: 'smooth' });
        await wait(500);
        day.classList.add("checked")
        day.classList.add("pop")
        playSound(sounds.gemPop, general_volume*0.5)
        await wait(800);
        number.classList.add("pop")
        number.textContent = GameProgression.streak;
        playSound(sounds.ding, general_volume*0.8)
        playSound(sounds.questPop, general_volume*0.8)
        playSound(sounds.chestNotif, general_volume*0.1)
        await wait(500);
        advancementInfo.e.classList.add("checked")
        icon.classList.add("ignite-fire")
        playSound(sounds.ignite, general_volume*0.5)
        await wait(200);
        icon.classList.remove("ignite-fire")
        icon.classList.add("flicker-fire")
    }

    static async animateQuestAdvancement(advancementInfo) {
        advancementInfo.e.classList.add("arise")
        await wait(100);
        playSound(sounds.load, general_volume*0.25)
        await wait(300);
        const bar = advancementInfo.e.querySelector('.progress-bar__fill');
        bar.style.width = (advancementInfo.progress*100*1.05)+"%"
        if (advancementInfo.progress >= 1) {
            await wait(600);
            playSound(sounds.ding, general_volume*0.8)
            playSound(sounds.chestNotif, general_volume*0.1)
            advancementInfo.e.querySelector('.chest').style.backgroundImage = "url('media/chest_open.png')"
            advancementInfo.e.querySelector('.chest').classList.add("big-heartbeat")
        }
    }

    static async animateGemAdvancement(advancementInfo) {
        advancementInfo.e.classList.add("arise")
        await wait(400);

        let gspan = advancementInfo.e.querySelector('span');
        let gicon = advancementInfo.e.querySelector('.icon');

        let rectDest = gicon.getBoundingClientRect();
        let dist_x = rectDest.left + rectDest.width / 2 + window.scrollX;
        let dist_y = rectDest.top + rectDest.height / 2 + window.scrollY;

        let doneSound = false;
        for (let i in GameoverAnimator.advancementsInfo) {
            if (GameoverAnimator.advancementsInfo[i].type == "quest" && GameoverAnimator.advancementsInfo[i].progress >= 1) {

                if (!doneSound) {
                    doneSound = true;
                    playSound(sounds.chestPop, general_volume)
                }
                
                let rect = GameoverAnimator.advancementsInfo[i].e.querySelector('.chest').getBoundingClientRect();
                let pos_x = rect.left + rect.width / 2 + window.scrollX;
                let pos_y = rect.top + rect.height / 2 + window.scrollY;

                let totalGemParticles = randomInt(10, 15)
                let gemParticles = 0

                for (let i = 0; i < totalGemParticles; i++) {
                    new Promise(async () => {

                        // wait before spawning a new gem particle
                        await wait(randomInt(0, 200))

                        // spawn and wait for the gem particle to die
                        let lifetime = 1 + randomFloat(0, 0.5)
                        gems.push(new Gem(pos_x, pos_y, dist_x, dist_y, lifetime))
                        await wait(lifetime*1000)

                        gicon.classList.remove("heartbeat")
                        gspan.classList.remove("heartbeat")
                        gicon.offsetWidth
                        gicon.classList.add("heartbeat")
                        gspan.classList.add("heartbeat")

                        gemParticles += 1;
                        gspan.textContent = "+" + Math.floor(gemParticles/totalGemParticles*advancementInfo.reward) + " Gemmes"
                        if (randomInt(0, 2) == 0) {
                            playSound(sounds.ding, general_volume*0.8)
                        }

                    })
                }
            }
        }
        await wait(1500)
        playSound(sounds.ding, general_volume*1)
        playSound(sounds.chestNotif, general_volume*0.1)
    }




    static generateAdvancementsInfo() {
        GameoverAnimator.advancementsInfo = []
    
        if (GameSession.gameoverInfo.continuedStreak) {
            const daysOfWeek = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
    
            // create list of 10 days before and after today
            let innerHTML = '<div class="quest-fire icon"><span>1</span></div><div class="advancement__days">'
            for (let i = 0; i < 21; i++) {
    
                let day = new Date();
                day.setUTCHours(0, -GameProgression.UTCShift, 0, 0);
                day.setUTCDate(day.getUTCDate()+i-10);
    
                if (i == 10) {
                    innerHTML += '<div class="day" id="to-be-checked"><span>'+daysOfWeek[day.getUTCDay()]+'</span><div></div></div>'
                } else {
                    innerHTML += '<div class="day"><span>'+daysOfWeek[day.getUTCDay()]+'</span><div></div></div>'
                }
            }
            innerHTML += '</div>'
    
            let element = document.createElement('div');
            element.classList.add("advancement")
            element.classList.add("streak")
            element.innerHTML = innerHTML
            GameoverAnimator.advancementsInfo.push({
                type: "streak",
                e: element
            });
        }
    
        for (let i in GameSession.gameoverInfo.updatedQuests) {
            let quest = GameSession.gameoverInfo.updatedQuests[i]
    
            let element = document.createElement('div');
            element.classList.add("advancement")
            element.classList.add("quest")
            element.innerHTML = `
            <div class="`+quest.icon+` icon"></div>
            <div class="advancement__side">
                <span>`+quest.text+`</span>
                <div class="advancement__progress">
                    <div class="progress-bar"><div class="progress-bar__fill" style="width: `+(quest.oldProgress*100*1.05)+`%"><div class="progress-bar__fill__highlight"></div></div></div>
                    <div class="chest icon"></div>
                </div>
            </div>
            `
            GameoverAnimator.advancementsInfo.push({
                type: "quest",
                progress: quest.progress,
                e: element
            });
        }
    
        if (GameSession.gameoverInfo.oldGems < GameProgression.gems) {
            let element = document.createElement('div');
            element.classList.add("advancement")
            element.classList.add("gems")
            element.innerHTML = `
            <div class="quest-gem icon"></div>
            <div class="advancement__side">
                <span></span>
            </div>
            `
            GameoverAnimator.advancementsInfo.push({
                type: "gems",
                reward: 30,
                progress: GameProgression.gems - GameSession.gameoverInfo.oldGems,
                e: element
            });
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





