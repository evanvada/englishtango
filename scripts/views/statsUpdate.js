import * as GameProgression from "../game/gameProgression.js";

GameProgression.updateAll();

const statsHeaderItemsE = document.querySelectorAll('.stats-header nav ul li');

export function showStatsHeaderDropdown(element) {
	let clickedItemE = element.parentNode;

	// unselect all statsHeaderItemsE except this one
    statsHeaderItemsE.forEach((item) => {
        if (item !== clickedItemE) {
            item.classList.remove('selected');
            item.querySelector('.stats-header__dropdown').classList.add('hidden');
            item.querySelector('.stats-header__dropdown-pointer').classList.add('hidden');
        }
    });

	// swich state of item
	let dropdownE = clickedItemE.querySelector('.stats-header__dropdown');
	let dropdownPointerE = clickedItemE.querySelector('.stats-header__dropdown-pointer');
	if (dropdownE.classList.contains('hidden')) {
		dropdownE.classList.remove('hidden');
		dropdownPointerE.classList.remove('hidden');
	} else {
		dropdownE.classList.add('hidden');
		dropdownPointerE.classList.add('hidden');
	}
}

document.querySelectorAll('.stats-header__dropdown').forEach((overlay) => {
	overlay.addEventListener('click', (e) => {
		statsHeaderItemsE.forEach((item) => {
			item.classList.remove('selected');
			item.querySelector('.stats-header__dropdown').classList.add('hidden');
			item.querySelector('.stats-header__dropdown-pointer').classList.add('hidden');
		});
	});
});

let expStatE = document.querySelector('.experience > span');
let streakStatE = document.querySelector('.streak > span');
let gemsStatE = document.querySelector('.gems > span');

expStatE.innerHTML = GameProgression.experience;
streakStatE.innerHTML = GameProgression.streak;
gemsStatE.innerHTML = GameProgression.gems;

expStatE = document.querySelector('.experience > button > span');
streakStatE = document.querySelector('.streak > button > span');
gemsStatE = document.querySelector('.gems > button > span');

expStatE.innerHTML = GameProgression.experience;
streakStatE.innerHTML = GameProgression.streak;
gemsStatE.innerHTML = GameProgression.gems;




let questDisplay = document.querySelector('.infos-aside__submenu.quest')
if (questDisplay != null && GameProgression.dailyQuests.length > 0) {
	let quest = GameProgression.dailyQuests[0];

    let element = document.createElement('div');
    element.classList.add("advancement")
	element.style.border = "none";
	element.style.borderRadius = "0";
	element.style.padding = "0";
	element.style.minHeight = "80px";
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
    if (quest.progress >= 1) {
        element.querySelector('.chest').style.backgroundImage = "url('media/chest_open.png')"
    }
    questDisplay.appendChild(element)
}



document.querySelectorAll('.unloaded').forEach((element) => {
	element.classList.remove('unloaded');
});











