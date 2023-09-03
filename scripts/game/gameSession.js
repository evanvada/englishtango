

class GameSession {
    static questions = [];
    static archivedQuestions = [];
    static rights = 0;
    static wrongs = 0;
    static state = "loading";
    
    static checkAnswer() {
        if (this.questions[0].addAnswer(exerciceAnswerE.value)) {
            this.rightUpdate()
        } else {
            this.wrongUpdate()
        }
    }

    static rightUpdate() {
        this.state = "right";
        showRightFeedback()
        // update game : archive the question
        if (this.questions[0].answers.length == 1) { this.rights += 1; }
        this.archivedQuestions.push(this.questions.shift());
    }

    static wrongUpdate() {
        this.state = "wrong";
        showWrongFeedback()
        // update game : repeat wrong question if option is selected
        this.wrongs += 1
        if (GameOptions.selectedRepetitionOption == "repeat_question") {
            this.questions.splice(randomInt(0, this.questions.length-1), 0, this.questions.shift())
        } else if (GameOptions.selectedRepetitionOption == "one_chance") {
            this.archivedQuestions.push(this.questions.shift());
        }
    }

    static continueGame() {
        if (this.questions.length > 0) {
            this.state = "question";
            showUserInput()
        } else if (this.archivedQuestions.length > 0) {
            this.state = "gameover";
            showGameOver()
        } else {
            throw new Error("No bundle selected");
        }
    }
    
    static generateQuestions() {
        for (let i in GameOptions.selectedBundles) {
            GameBundle.getBundleByName(GameOptions.selectedBundles[i]).generateQuestions(this.questions)
        }
        shuffleArray(this.questions)
    }
}

