





class GameProgression {

    static version = "0.1";

    static gems = 0;
    static streak = 0;
    static streakHistory = [];
    static experience = 0;
    static gamesPlayed = 0;

    static lexiconProficiency = [];
    static grammarProficiency = [];

    static dailyQuestsStartTime = 0;
    static weeklyQuestsStartTime = 0;
    static dailyQuests = [];
    static weeklyQuests = [];
    static foreverQuests = [];
    static UTCShift = 0;

    static updateOnGameover() {
        if (GameSession.state == "gameover") {
            this.gamesPlayed += 1;



            let lastPlay = this.streakHistory[0];

            let today = new Date();
            today.setUTCHours(0, -UTCShift, 0, 0);
    
            let yesterday = new Date();
            yesterday.setUTCHours(0, -UTCShift, 0, 0);
            yesterday.setUTCDate(-1);
    
            let continuedStreak = false;
            if (lastPlay != null) {
                if (lastPlay.getTime() == today.getTime()) {
                    // already done today
                } else if (lastPlay.getTime() == yesterday.getTime()) {
                    // done yesterday
                    this.streakHistory.unshift(today);
                    continuedStreak = true;
                    this.streak += 1;
                } else {
                    // not done yesterday nor today
                    this.streakHistory.unshift(today);
                    continuedStreak = true;
                    this.streak = 1;
                }
            } else {
                // first time
                this.streakHistory.unshift(today);
                continuedStreak = true;
                this.streak = 1;
            }


    


            let experienceGained = GameOptions.selectedBundles.length * 10;
            let streakBonus = continuedStreak ? 10 + Math.floor(Math.sqrt(this.streak-1)*2) : 0;
            this.experience += experienceGained + streakBonus;

            let updatedQuests = this.updateQuests();
            updatedQuests = updatedQuests.filter(quest => quest.progress > quest.oldProgress);

            // return the necessary values so the correct achievements can be displayed on the gameover screen
            return {
                continuedStreak: continuedStreak,
                experienceGained: experienceGained,
                streakBonus: streakBonus,
                updatedQuests: updatedQuests,
            }
        }
    }

    // update after login but also while logged in, regurally
    static updateOnLogin() {
        // order is important
        this.updateStreak();
        this.generateQuestsIfNecessary();
        this.updateQuests();
    }



    static updateStreak() {
        let lastPlay = this.streakHistory[0];

        let today = new Date();
        today.setUTCHours(0, -UTCShift, 0, 0);

        if (lastPlay != null && lastPlay.getTime() != today.getTime() && lastPlay.getTime() != yesterday.getTime()) {
            // not done yesterday nor today so reset streak
            this.streak = 0;
        }
    }



    static updateQuests() {
        let allQuests = this.dailyQuests.concat(this.weeklyQuests).concat(this.foreverQuests);
        let updatedQuests = [];
        for (let i in allQuests) {
            let itemsTracked = null;
            switch (allQuests[i].type) {
                case "gain_xp": itemsTracked = this.experience; break;
                case "finish_games": itemsTracked = this.gamesPlayed; break;
                case "continue_streak": itemsTracked = this.streak; break;
            }
            if (itemsTracked == null) {
                continue;
            }
            // reward if there's a positive change in progress and the progress >= 1
            allQuests[i].oldProgress = allQuests[i].progress;  
            allQuests[i].progress = ( itemsTracked - allQuests[i].start ) / allQuests[i].goal;
            if (allQuests[i].progress > allQuests[i].oldProgress && allQuests[i].progress >= 1) {
                this.gems += allQuests[i].reward;
            }
            // notify of any changes
            if (allQuests[i].progress != allQuests[i].oldProgress) {
                updatedQuests.push(allQuests[i]);
            }
        }
        return updatedQuests;
    }



    static generateQuestsIfNecessary() {
        let today = new Date();
        today.setUTCHours(0, -UTCShift, 0, 0);

        let firstWeekDay = new Date();
        firstWeekDay.setUTCHours(0, -UTCShift, 0, 0);
        firstWeekDay.setUTCDate(firstWeekDay.getUTCDate() - firstWeekDay.getUTCDay() + 1);

        if (this.dailyQuestsStartTime != today) {
            this.dailyQuestsStartTime = today;
            this.dailyQuests = [];
            this.generateDailyQuests();
        }
        if (this.weeklyQuestsStartTime != firstWeekDay) {
            this.weeklyQuestsStartTime = firstWeekDay;
            this.weeklyQuests = [];
            this.generateWeeklyQuests();
        }
    }



    static loadAllFromLocalStorage() {
        // const loaded = JSON.parse(localStorage.getItem("progress_" + this.version)) || {}
        const loaded = {}
        this.gems = loaded.gems || 0;
        this.streak = loaded.streak || 0;
        this.streakHistory = loaded.streakHistory || [];
        this.experience = loaded.experience || 0;
        this.gamesPlayed = loaded.gamesPlayed || 0;
        this.lexiconProficiency = loaded.lexiconProficiency || [];
        this.grammarProficiency = loaded.grammarProficiency || [];
        this.dailyQuestsStartTime = loaded.dailyQuestsStartTime || 0;
        this.weeklyQuestsStartTime = loaded.weeklyQuestsStartTime || 0;
        this.UTCShift = loaded.UTCShift || (new Date(Date.now())).getTimezoneOffset(); // set one time and unchangable
        this.dailyQuests = loaded.dailyQuests || [];
        this.weeklyQuests = loaded.weeklyQuests || [];
        this.foreverQuests = loaded.foreverQuests || [];
    }

    static saveAllToLocalStorage() {
        const loading = {
            gems: this.gems,
            streak: this.streak,
            streakHistory: this.streakHistory,
            experience: this.experience,
            gamesPlayed: this.gamesPlayed,
            lexiconProficiency: this.lexiconProficiency,
            grammarProficiency: this.grammarProficiency,
            dailyQuestsStartTime: this.dailyQuestsStartTime,
            weeklyQuestsStartTime: this.weeklyQuestsStartTime,
            UTCShift: this.UTCShift,
            dailyQuests: this.dailyQuests,
            weeklyQuests: this.weeklyQuests,
            foreverQuests: this.foreverQuests,
        }
        // localStorage.setItem("progress_" + this.version, JSON.stringify(loading))
    }



    static generateDailyQuests() {

        if (this.gamesPlayed == 0) {
            this.dailyQuests.unshift({ text: "Joue à ton premier exercice", type: "finish_games", start: 0, progress: 0, goal: 1, reward: 10 })
            this.dailyQuests.unshift({ text: "Gagne 50 XP", type: "gain_xp", start: 0, progress: 0, goal: 30, reward: 20 })
        } else {
            let randomGoal;

            switch (randomInt(0, 2)) {
                case 0:
                    randomGoal = randomInt(3, 20)*10;
                    this.dailyQuests.unshift({ text: "Gagne "+randomGoal+" XP", type: "gain_xp", start: 0, progress: 0, goal: randomGoal, reward: randomInt(0,5)*5+15 })
                    break;
                case 1:
                    randomGoal = randomInt(1, 3);
                    this.dailyQuests.unshift({ text: "Joue à "+randomGoal+" exercices", type: "finish_games", start: 0, progress: 0, goal: randomGoal, reward: randomInt(0,3)*5+10 })
                    break;
                case 2:
                    if (this.experience%500 > 10 && this.experience%500 < 60) {
                        randomGoal = this.experience-this.experience%500+500;
                        this.dailyQuests.unshift({ text: "Ai un total de "+randomGoal+" XP", type: "gain_xp", start: 0, progress: 0, goal: randomGoal, reward: randomInt(0,3)*10+20 })
                    }
                    break;
            }

            // copied & pasted from above
            if (randomInt(0, 1) == 1) {
                switch (randomInt(0, 2)) {
                    case 0:
                        randomGoal = randomInt(3, 20)*10;
                        this.dailyQuests.unshift({ text: "Gagne "+randomGoal+" XP", type: "gain_xp", start: 0, progress: 0, goal: randomGoal, reward: randomInt(0,5)*5+15 })
                        break;
                    case 1:
                        randomGoal = randomInt(1, 3);
                        this.dailyQuests.unshift({ text: "Joue à "+randomGoal+" exercices", type: "finish_games", start: this.experience, progress: 0, goal: randomGoal, reward: randomInt(0,3)*5+10 })
                        break;
                    case 2:
                        if (this.experience%500 > 10 && this.experience%500 < 60) {
                            randomGoal = this.experience-this.experience%500+500;
                            this.dailyQuests.unshift({ text: "Ai un total de "+randomGoal+" XP", type: "gain_xp", start: this.experience, progress: 0, goal: randomGoal, reward: randomInt(0,3)*10+20 })
                        }
                        break;
                }
            }

        }
    }

    static generateWeeklyQuests() {
        // TODO : add weekly quests
    }
}











