

class Game {
    // static state = "none";
    static questions = [];
    static archivedQuestions = [];
    static score = 0;

    static checkAnswer() {
        this.questions[0].answers.push(exerciceAnswerE.value)
        if (this.questions[0].isRight()) {
            this.rightUpdate()
        } else {
            this.wrongUpdate()
        }
    }

    static rightUpdate() {
        showRightFeedback()
        // update game : archive the question
        this.questions[0].rights += 1
        this.archivedQuestions.push(this.questions.shift());
    }

    static wrongUpdate() {
        showWrongFeedback()
        // update game : repeat wrong question if option is selected
        this.questions[0].wrongs += 1
        if (selectedRepetitionOption == "repeat_question") {
            this.questions.splice(randomInt(0, this.questions.length-1), 0, this.questions.shift())
        } else if (selectedRepetitionOption == "one_chance") {
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

        shuffleArray(this.questions)
    }
}

