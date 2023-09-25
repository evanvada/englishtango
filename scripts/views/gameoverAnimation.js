import * as Utils from "../utils.js";

import * as GameProgression from "../game/gameProgression.js";
import * as GameSession from "../game/gameSession.js";
import * as Particles from "../game/particles.js";

import * as Main from "./playView.js";



let advancementsInfo = [];

let startAnimateTimer = 0;
let startAnimateDuration = 0;
let startAnimateIndex = 0;

export let run = false;
export let state = "" // animate_header, cooldown_update_experience, update_experience, animate_advancements, end
export let fast = false;

let updateExperienceTimer = 0;
let updateExperienceDuration = 0;

let updateExperienceCooldownTimer = 0;
let updateExperienceCooldownDuration = 0;

let lastProgress = 0;

export function start() {
    run = true
    state = "animate_header"
    generateAdvancementsInfo()
    animateHeader()
}


async function animateHeader() {
    Utils.playSound(Main.sounds.simple_win, Main.generalVolume)
    updateExperienceCooldownDuration = 0.8;
    state = "cooldown_update_experience"

    let lvl = Main.gameoverE.querySelector('.gameover__progress__level')
    lvl.textContent = "LVL " + Math.floor(GameSession.gameoverInfo.oldExperience / 100)
    let progress = GameSession.gameoverInfo.oldExperience % 100
    Main.gameoverBarE.style.width = (progress*1.05)+"%"

    Main.gameoverE.classList.add("centered")
    Main.gameoverE.querySelector(".icon").classList.add("pop")
    Main.gameoverE.querySelector(".icon").classList.remove("invisible")
    Main.gameoverE.querySelector("h3").classList.add("arise")
    Main.gameoverE.querySelector("h3").classList.remove("invisible")
    await Utils.wait(400);
    Main.gameoverE.querySelector(".gameover__progress").classList.add("arise")
    Main.gameoverE.querySelector(".gameover__progress").classList.remove("invisible")
}






export function update(deltaTime) {
    if (state == "cooldown_update_experience") {
        updateExperienceCooldownTimer += deltaTime;
        if (updateExperienceCooldownTimer > updateExperienceCooldownDuration) {
            updateExperienceDuration = 0.8;
            state = "update_experience"
            Utils.playSound(Main.sounds.load, Main.generalVolume*0.25)
        }
    }

    if (state == "update_experience") {
        updateExperienceTimer += deltaTime;

        let ease = Utils.easeInOutSine(updateExperienceTimer/updateExperienceDuration)
        let xpProgress = (GameSession.gameoverInfo.oldExperience + (GameProgression.experience - GameSession.gameoverInfo.oldExperience)*ease)
        let progress = xpProgress % 100
        Main.gameoverBarE.style.width = (progress*1.05)+"%"
        if (progress < lastProgress) {
            let lvl = Main.gameoverE.querySelector('.gameover__progress__level')
            lvl.classList.remove("big-heartbeat")
            lvl.offsetWidth
            lvl.classList.add("big-heartbeat")
            lvl.textContent = "LVL " + Math.floor(xpProgress / 100)
            Utils.playSound(Main.sounds.ding, Main.generalVolume*1)
            Utils.playSound(Main.sounds.chestNotif, Main.generalVolume*0.1)
        }
        lastProgress = progress

        if (updateExperienceTimer > updateExperienceDuration) {
            Main.gameoverE.classList.remove("centered")
            state = "animate_advancements"
            startAnimateDuration = 1;
        }
    }

    if (state == "animate_advancements") {
        // start animating each advancement one by one
        startAnimateTimer += deltaTime;
        if (startAnimateTimer > startAnimateDuration) {
            startAnimateTimer = 0;
            if (startAnimateIndex < advancementsInfo.length) {
                let advancementInfo = advancementsInfo[startAnimateIndex]

                Main.gameoverAdvancementsE.appendChild(advancementInfo.e)
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                
                switch (advancementInfo.type) {
                    case "streak":
                        startAnimateDuration = 3.5;
                        animateStreakAdvancement(advancementInfo)
                        break;
                    case "quest":
                        startAnimateDuration = 2;
                        animateQuestAdvancement(advancementInfo)
                        break;
                    case "gems":
                        startAnimateDuration = 2.5;
                        animateGemAdvancement(advancementInfo)
                        break;
                    case "text":
                        startAnimateDuration = 0;
                        animateText(advancementInfo)
                        break;
                }
                startAnimateIndex += 1;
            } else {
                state = "end"
                run = false;
                Main.continueGameoverButtonE.querySelector('span').textContent = "Continuer";
                Main.continueGameoverButtonE.className = "color1 flat-button small-heartbeat"
            }
        }
    }

    if (fast) {
        if (startAnimateDuration > 0.1) {
            startAnimateDuration = 0.1;
        }
        updateExperienceCooldownDuration = 0;
        updateExperienceDuration = 0.1;
    }
}

export function goFaster() {
    fast = true;
}










async function animateText(advancementInfo) {
    advancementInfo.e.classList.add("arise")
}

async function animateStreakAdvancement(advancementInfo) {
    advancementInfo.e.classList.add("arise")
    const day = advancementInfo.e.querySelector('.day#to-be-checked');
    const icon = advancementInfo.e.querySelector('.icon');
    const number = advancementInfo.e.querySelector('.icon span');
    day.parentElement.scrollLeft = day.offsetLeft - day.parentElement.offsetLeft - day.parentElement.offsetWidth;
    number.textContent = GameProgression.streak - 1;
    await Utils.wait(400);
    day.parentElement.scrollTo({ left: day.offsetLeft - day.parentElement.offsetLeft - day.parentElement.offsetWidth/2 + day.offsetWidth/2, behavior: 'smooth' });
    await Utils.wait(500);
    day.classList.add("checked")
    day.classList.add("pop")
    Utils.playSound(Main.sounds.gemPop, Main.generalVolume*0.5)
    await Utils.wait(800);
    number.classList.add("pop")
    number.textContent = GameProgression.streak;
    Utils.playSound(Main.sounds.ding, Main.generalVolume*0.8)
    Utils.playSound(Main.sounds.questPop, Main.generalVolume*0.8)
    Utils.playSound(Main.sounds.chestNotif, Main.generalVolume*0.1)
    await Utils.wait(500);
    advancementInfo.e.classList.add("checked")
    icon.classList.add("ignite-fire")
    Utils.playSound(Main.sounds.ignite, Main.generalVolume*0.5)
    await Utils.wait(200);
    icon.classList.remove("ignite-fire")
    icon.classList.add("flicker-fire")
}

async function animateQuestAdvancement(advancementInfo) {
    advancementInfo.e.classList.add("arise")
    await Utils.wait(100);
    Utils.playSound(Main.sounds.load, Main.generalVolume*0.25)
    await Utils.wait(300);
    const bar = advancementInfo.e.querySelector('.progress-bar__fill');
    bar.style.width = (advancementInfo.progress*100*1.05)+"%"
    if (advancementInfo.progress >= 1) {
        await Utils.wait(600);
        Utils.playSound(Main.sounds.ding, Main.generalVolume*0.8)
        Utils.playSound(Main.sounds.chestNotif, Main.generalVolume*0.1)
        advancementInfo.e.querySelector('.chest').style.backgroundImage = "url('media/chest_open.png')"
        advancementInfo.e.querySelector('.chest').classList.add("big-heartbeat")
    }
}

async function animateGemAdvancement(advancementInfo) {
    advancementInfo.e.classList.add("arise")
    await Utils.wait(400);

    let gspan = advancementInfo.e.querySelector('span');
    let gicon = advancementInfo.e.querySelector('.icon');

    let rectDest = gicon.getBoundingClientRect();
    let dist_x = rectDest.left + rectDest.width / 2 + window.scrollX;
    let dist_y = rectDest.top + rectDest.height / 2 + window.scrollY;

    let doneSound = false;
    for (let i in advancementsInfo) {
        if (advancementsInfo[i].type == "quest" && advancementsInfo[i].progress >= 1) {

            if (!doneSound) {
                doneSound = true;
                Utils.playSound(Main.sounds.chestPop, Main.generalVolume)
            }
            
            let rect = advancementsInfo[i].e.querySelector('.chest').getBoundingClientRect();
            let pos_x = rect.left + rect.width / 2 + window.scrollX;
            let pos_y = rect.top + rect.height / 2 + window.scrollY;

            let totalGemParticles = Utils.randomInt(10, 15)
            let gemParticles = 0

            for (let i = 0; i < totalGemParticles; i++) {
                new Promise(async () => {

                    // Utils.wait before spawning a new gem particle
                    await Utils.wait(Utils.randomInt(0, 200))

                    // spawn and Utils.wait for the gem particle to die
                    let lifetime = 1 + Utils.randomFloat(0, 0.5)
                    Particles.gems.push(new Particles.Gem(pos_x, pos_y, dist_x, dist_y, lifetime))
                    await Utils.wait(lifetime*1000)

                    gicon.classList.remove("heartbeat")
                    gspan.classList.remove("heartbeat")
                    gicon.offsetWidth
                    gicon.classList.add("heartbeat")
                    gspan.classList.add("heartbeat")

                    gemParticles += 1;
                    gspan.textContent = "+" + Math.floor(gemParticles/totalGemParticles*advancementInfo.reward) + " Gemmes"
                    Utils.playSound(Main.sounds.ding, Main.generalVolume*0.8)

                })
            }
        }
    }
    await Utils.wait(1500)
    Utils.playSound(Main.sounds.ding, Main.generalVolume*1)
    Utils.playSound(Main.sounds.chestNotif, Main.generalVolume*0.1)
}






















function generateAdvancementsInfo() {
    advancementsInfo = []


    if (GameSession.gameoverInfo.continuedStreak) {
        const daysOfWeek = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

        let element = document.createElement('h3');
        element.innerHTML = "Série"
        advancementsInfo.push({ type: "text", e: element});

        element = document.createElement('span');
        element.innerHTML = "Entraîne-toi chaque jour pour que ta série ne retombe pas à zéro !"
        advancementsInfo.push({ type: "text", e: element });

        // create list of 10 days before and after today
        let innerHTML = '<div class="large-fire icon"><span>1</span></div><div class="advancement__days">'
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

        element = document.createElement('div');
        element.classList.add("advancement")
        element.classList.add("streak")
        element.innerHTML = innerHTML
        advancementsInfo.push({
            type: "streak",
            e: element
        });
    }
    
    
    if (GameSession.gameoverInfo.updatedQuests.length > 0) {
        let element = document.createElement('h3');
        element.innerHTML = "Quêtes"
        advancementsInfo.push({ type: "text", e: element});
    }

    for (let quest of GameSession.gameoverInfo.updatedQuests) {
        let element = document.createElement('div');
        element.classList.add("advancement")
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
        advancementsInfo.push({
            type: "quest",
            progress: quest.progress,
            e: element
        });
    }

    if (GameSession.gameoverInfo.oldGems < GameProgression.gems) {

        let element = document.createElement('h3');
        element.innerHTML = "Récompenses des quêtes"
        advancementsInfo.push({ type: "text", e: element});
        
        element = document.createElement('div');
        element.classList.add("advancement")
        element.classList.add("gems")
        element.innerHTML = `
        <div class="large-gem icon"></div>
        <div class="advancement__side">
            <span></span>
        </div>
        `
        advancementsInfo.push({
            type: "gems",
            reward: GameProgression.gems - GameSession.gameoverInfo.oldGems,
            e: element
        });
    }

}









