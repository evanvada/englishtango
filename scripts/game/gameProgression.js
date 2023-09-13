import * as GameSession from "/scripts/game/gameSession.js";

import * as Utils from "/scripts/utils.js";



let version = "0.1";

export let gems = 0;
export let streak = 0;
export let streakHistory = [];
export let experience = 0;
export let gamesPlayed = 0;

export let lexiconProficiency = [];
export let grammarProficiency = [];

export let dailyQuestsStartTime = 0;
export let weeklyQuestsStartTime = 0;
export let dailyQuests = [];
export let weeklyQuests = [];
export let foreverQuests = [];
export let UTCShift = 0;

export function updateOnGameover() {
    if (GameSession.state == "gameover") {
        gamesPlayed += 1;

        let lastPlay = streakHistory[0];

        // the start of the day is used as anchor point of an entire day
        let today = new Date();
        today.setUTCHours(0, -UTCShift, 0, 0);

        let yesterday = new Date();
        yesterday.setUTCHours(0, -UTCShift, 0, 0);
        yesterday.setUTCDate(yesterday.getUTCDate()-1);

        let continuedStreak = false;
        if (lastPlay != null) {
            if (lastPlay == today.getTime()) {
                // already done today
            } else if (lastPlay == yesterday.getTime()) {
                // done yesterday
                streakHistory.unshift(today.getTime());
                continuedStreak = true;
                streak += 1;
            } else {
                // not done yesterday nor today
                streakHistory.unshift(today.getTime());
                continuedStreak = true;
                streak = 1;
            }
        } else {
            // first time
            streakHistory.unshift(today.getTime());
            continuedStreak = true;
            streak = 1;
        }

        let oldExperience = experience;
        let gameExpBonus = 1 + Math.floor(GameSession.rights / GameSession.archivedQuestions.length * 9);
        let streakExpBonus = continuedStreak ? 10 + Math.floor(Math.sqrt(streak-1)*2) : 0;
        experience += gameExpBonus + streakExpBonus;

        let oldGems = gems;
        let updatedQuests = updateQuestsProgression();
        updatedQuests = updatedQuests.filter(quest => quest.progress > quest.oldProgress);

        saveAllToLocalStorage();

        // return the necessary values so the correct achievements can be displayed on the gameover screen
        return {
            continuedStreak: continuedStreak,
            oldExperience: oldExperience,
            oldGems: oldGems,
            gameExpBonus: gameExpBonus,
            streakExpBonus: streakExpBonus,
            updatedQuests: updatedQuests,
        }
    }
}

// to be called regurally
export function updateAll() {
    loadAllFromLocalStorage();

    // order is important
    updateStreak();
    generateQuestsIfNecessary();
    updateQuestsProgression();

    saveAllToLocalStorage();
}















function updateStreak() {
    let lastPlay = streakHistory[0];

    // the start of the day is used as anchor point of an entire day
    let today = new Date();
    today.setUTCHours(0, -UTCShift, 0, 0);

    let yesterday = new Date();
    yesterday.setUTCHours(0, -UTCShift, 0, 0);
    yesterday.setUTCDate(yesterday.getUTCDate()-1);

    if (lastPlay != null
        && lastPlay != today.getTime()
        && lastPlay != yesterday.getTime()) {
        // not done yesterday nor today so reset streak
        streak = 0;
    }
}



function updateQuestsProgression() {
    let allQuests = dailyQuests.concat(weeklyQuests).concat(foreverQuests);
    let updatedQuests = [];
    for (let quest of allQuests) {
        let itemsTracked = null;
        switch (quest.type) {
            case "gain_xp": itemsTracked = experience; break;
            case "finish_games": itemsTracked = gamesPlayed; break;
            case "continue_streak": itemsTracked = streak; break;
        }
        if (itemsTracked == null) {
            continue;
        }
        if (quest.progress >= 1) {
            continue;
        }
        // reward if there's a positive change in progress
        quest.oldProgress = quest.progress;
        quest.progress = ( itemsTracked - quest.start ) / quest.goal;
        if (quest.progress > quest.oldProgress && quest.progress >= 1) {
            gems += quest.reward;
        }
        if (quest.progress != quest.oldProgress) {
            updatedQuests.push(quest);
        }
    }
    return updatedQuests;
}



function generateQuestsIfNecessary() {
    let today = new Date();
    today.setUTCHours(0, -UTCShift, 0, 0);

    let firstWeekDay = new Date();
    firstWeekDay.setUTCHours(0, -UTCShift, 0, 0);
    firstWeekDay.setUTCDate(firstWeekDay.getUTCDate() - firstWeekDay.getUTCDay() + 1);

    if (dailyQuestsStartTime != today.getTime()) {
        dailyQuestsStartTime = today.getTime();
        dailyQuests = [];
        generateDailyQuests();
    }
    if (weeklyQuestsStartTime != firstWeekDay.getTime()) {
        weeklyQuestsStartTime = firstWeekDay.getTime();
        weeklyQuests = [];
        generateWeeklyQuests();
    }
}



export function loadAllFromLocalStorage() {
    let loaded = {}
    loaded = JSON.parse(localStorage.getItem("progress_" + version)) || {}
    gems = loaded.gems || 0;
    streak = loaded.streak || 0;
    streakHistory = loaded.streakHistory || [];
    experience = loaded.experience || 0;
    gamesPlayed = loaded.gamesPlayed || 0;
    lexiconProficiency = loaded.lexiconProficiency || [];
    grammarProficiency = loaded.grammarProficiency || [];
    dailyQuestsStartTime = loaded.dailyQuestsStartTime || 0;
    weeklyQuestsStartTime = loaded.weeklyQuestsStartTime || 0;
    UTCShift = loaded.UTCShift || (new Date(Date.now())).getTimezoneOffset(); // set one time and unchangable
    dailyQuests = loaded.dailyQuests || [];
    weeklyQuests = loaded.weeklyQuests || [];
    foreverQuests = loaded.foreverQuests || [];
}

export function saveAllToLocalStorage() {
    let loading = {
        gems: gems,
        streak: streak,
        streakHistory: streakHistory,
        experience: experience,
        gamesPlayed: gamesPlayed,
        lexiconProficiency: lexiconProficiency,
        grammarProficiency: grammarProficiency,
        dailyQuestsStartTime: dailyQuestsStartTime,
        weeklyQuestsStartTime: weeklyQuestsStartTime,
        UTCShift: UTCShift,
        dailyQuests: dailyQuests,
        weeklyQuests: weeklyQuests,
        foreverQuests: foreverQuests,
    }
    localStorage.setItem("progress_" + version, JSON.stringify(loading))
}



function generateDailyQuests() {
    if (gamesPlayed == 0) {
        dailyQuests.unshift({ text: "Joue à ton premier exercice", type: "finish_games", start: 0, progress: 0, goal: 1, reward: 20, icon: "quest-exercise" })
        dailyQuests.unshift({ text: "Gagne 50 XP", type: "gain_xp", start: experience, progress: 0, goal: 30, reward: 30, icon: "quest-bolt" })
    } else {
        let randomGoal = 0;
        switch (Utils.randomInt(0, 2)) {
            case 0:
                randomGoal = Utils.randomInt(3, 4)*20;
                dailyQuests.unshift({ text: "Gagne "+randomGoal+" XP", type: "gain_xp", start: experience, progress: 0, goal: randomGoal, reward: Utils.randomInt(0,5)*5+10, icon: "quest-bolt" })
                break;
            case 1:
                randomGoal = Utils.randomInt(1, 3);
                dailyQuests.unshift({ text: "Joue à "+randomGoal+" exercices", type: "finish_games", start: gamesPlayed, progress: 0, goal: randomGoal, reward: Utils.randomInt(0,5)*5+10, icon: "quest-exercise" })
                break;
            case 2:
                if (experience%100 >= 40 && experience%100 < 50) {
                    let levelStart = experience-experience%100;
                    dailyQuests.unshift({ text: "Ai un total de "+(levelStart+100)+" XP", type: "gain_xp", start: levelStart, progress: 0, goal: levelStart+100, reward: Utils.randomInt(0,3)*10+30, icon: "quest-bolt" })
                }
                break;
        }

        // copied & pasted from above
        if (Utils.randomInt(0, 1) == 1) {
            switch (Utils.randomInt(0, 2)) {
                case 0:
                    randomGoal = Utils.randomInt(3, 4)*20;
                    dailyQuests.unshift({ text: "Gagne "+randomGoal+" XP", type: "gain_xp", start: experience, progress: 0, goal: randomGoal, reward: Utils.randomInt(0,5)*5+10, icon: "quest-bolt" })
                    break;
                case 1:
                    randomGoal = Utils.randomInt(1, 3);
                    dailyQuests.unshift({ text: "Joue à "+randomGoal+" exercices", type: "finish_games", start: gamesPlayed, progress: 0, goal: randomGoal, reward: Utils.randomInt(0,5)*5+10, icon: "quest-exercise" })
                    break;
                case 2:
                    if (experience%100 >= 40 && experience%100 < 80) {
                        let levelStart = experience-experience%100;
                        dailyQuests.unshift({ text: "Ai un total de "+(levelStart+100)+" XP", type: "gain_xp", start: levelStart, progress: 0, goal: levelStart+100, reward: Utils.randomInt(0,3)*10+30, icon: "quest-bolt" })
                    }
                    break;
            }
        }

    }
}

function generateWeeklyQuests() {
    // TODO : add weekly quests
}










