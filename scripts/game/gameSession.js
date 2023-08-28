

class Game {
    // static state = "none";
    static questions = [];
    static archivedQuestions = [];
    static score = 0;

    static checkAnswer() {
        if (this.questions[0].addAnswer(exerciceAnswerE.value)) {
            this.rightUpdate()
        } else {
            this.wrongUpdate()
        }
    }

    static rightUpdate() {
        showRightFeedback()
        // update game : archive the question
        this.archivedQuestions.push(this.questions.shift());
    }

    static wrongUpdate() {
        showWrongFeedback()
        // update game : repeat wrong question if option is selected
        if (GameOptions.selectedRepetitionOption == "repeat_question") {
            this.questions.splice(randomInt(0, this.questions.length-1), 0, this.questions.shift())
        } else if (GameOptions.selectedRepetitionOption == "one_chance") {
            this.archivedQuestions.push(this.questions.shift());
        }
    }

    static continueGame() {
        if (this.questions.length > 0) {
            showUserInput()
        } else {
            showGameOver()
        }
    }
    
    static generateQuestions() {
        for (let i in GameOptions.selectedBundles) {
            if (GameBundle.bundles[GameOptions.selectedBundles[i]] != null) {
                GameBundle.bundles[GameOptions.selectedBundles[i]].generateQuestions(this.questions)
            }
        }
        shuffleArray(this.questions)
    }
}

