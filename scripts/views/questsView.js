import * as GameProgression from "../game/gameProgression.js";

GameProgression.updateAll();

const questWall = document.querySelector(".wall__subsection");

let title = document.createElement('h2');
title.innerHTML = "Quêtes du jour"
questWall.appendChild(title)

for (let quest of GameProgression.dailyQuests) {

    let element = document.createElement('div');
    element.classList.add("advancement")
    element.innerHTML = `
    <div class="`+quest.icon+` icon"></div>
    <div class="advancement__side">
        <span>`+quest.text+`</span>
        <div class="advancement__progress">
            <div class="progress-bar"><div class="progress-bar__fill" style="width: `+(quest.progress*100*1.05)+`%"><div class="progress-bar__fill__highlight"></div></div></div>
            <div class="chest icon"></div>
        </div>
    </div>
    `
    questWall.appendChild(element)
}


let title2 = document.createElement('h2');
title2.innerHTML = "Quêtes de la semaine"
questWall.appendChild(title2)


let element = document.createElement('div');
element.classList.add("locked")
element.classList.add("advancement")
element.innerHTML = `
<div class="large-locked icon"></div>
    Nouvelles quêtes bientôt
</div>
`
questWall.appendChild(element)





