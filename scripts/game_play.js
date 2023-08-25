





const exerciceDisplayE = document.querySelector('.exercice__display');
const exerciceTitleE = document.querySelector('.exercice h3');

const exerciceAnswerE = document.querySelector('.exercice__answer');
const exerciceAnswerWrongE = document.querySelector('.exercice__answer--wrong');
const exerciceAnswerRightE = document.querySelector('.exercice__answer--right');

const responseE = document.querySelector('.response');
const responseWrongE = document.querySelector('.response--wrong');
const responseRightE = document.querySelector('.response--right');

const responseWrongCorrectionSpanE = document.querySelector('.response--wrong .response__correction span');
const responseRightCorrectionSpanE = document.querySelector('.response--right .response__correction span');


// exerciceDisplayE.innerHTML = "Maintenant, je mange une pomme.<br>→ I <span class='unknown'></span> an apple.";
// exerciceTitleE.innerHTML = "Complétez l'espace manquant en anglais";






function noAnswer() {
    exerciceAnswerE.value = "";
    Game.wrongUpdate();
}

function checkAnswer() {
    Game.checkAnswer();
}

function continueGame() {
    Game.continueGame();
}





















function showWrongFeedbackElements() {
    exerciceAnswerE.classList.add("hidden")
    exerciceAnswerWrongE.classList.remove("hidden")
    exerciceAnswerRightE.classList.add("hidden")

    responseE.classList.add("hidden")
    responseWrongE.classList.remove("hidden")
    responseRightE.classList.add("hidden")
}

function showRightFeedbackElements() {
    exerciceAnswerE.classList.add("hidden")
    exerciceAnswerWrongE.classList.add("hidden")
    exerciceAnswerRightE.classList.remove("hidden")

    responseE.classList.add("hidden")
    responseWrongE.classList.add("hidden")
    responseRightE.classList.remove("hidden")
}

function showUserInputElements() {
    exerciceAnswerE.classList.remove("hidden")
    exerciceAnswerWrongE.classList.add("hidden")
    exerciceAnswerRightE.classList.add("hidden")

    responseE.classList.remove("hidden")
    responseWrongE.classList.add("hidden")
    responseRightE.classList.add("hidden")
}

function showGameOver() {

}




class Game {
    // static state = "none";
    static queries = [];
    static archived_queries = [];
    static score = 0;

    static checkAnswer() {
        let answer = exerciceAnswerE.value;
        answer = answer.toLowerCase();
        // only letters
        answer = answer.replace(/[^\p{L}\s'-]+/gu, "")
        // remove unecessary spaces
        answer = answer.replace(/\s+/g, " ").trim();
        this.queries[0].answer = answer
    
        if (this.queries[0].isRight()) {
            this.rightUpdate()
        } else {
            this.wrongUpdate()
        }
    }

    static rightUpdate() {
        // feedback
        showRightFeedbackElements()
        exerciceAnswerRightE.innerHTML = exerciceAnswerE.value
        responseRightCorrectionSpanE.innerHTML = this.queries[0].getCorrection()

        // update game : archive the question
        this.queries[0].rights += 1
        this.archived_queries.push(this.queries.shift());
    }

    static wrongUpdate() {
        // feedback
        showWrongFeedbackElements()
        exerciceAnswerWrongE.innerHTML = exerciceAnswerE.value
        responseWrongCorrectionSpanE.innerHTML = this.queries[0].getCorrection()

        // update game : repeat wrong question if option is selected
        this.queries[0].wrongs += 1
        if (selectedRepetitionOption == "repeat_question") {
            this.queries.splice(randomInt(0, this.queries.length-1), 0, this.queries.shift())
        } else if (selectedRepetitionOption == "one_chance") {
            this.archived_queries.push(this.queries.shift());
        }
    }

    static continueGame() {
        if (this.queries.length > 0) {
            showUserInputElements()

            exerciceTitleE.innerHTML = this.queries[0].getTitle()
            exerciceDisplayE.innerHTML = this.queries[0].getPrompt()

            exerciceAnswerE.value = ""
            responseE.focus()
        } else {
            showGameOver()
        }
    }



    static update() {
        // go to next state when pressed Enter

        // update the particles on the canvas

    }
    
    static generateQueries() {
        for (let i = 0; i < selectedBundles.length; i++) {
            let bundle = selectedBundles[i]

            GameIrregularVerbQuery.addBundle(bundle, this.queries)
        }

        shuffleArray(this.queries)
    }
}














class GameQuery {
    static title = "";

    constructor() {
        this.solutions = [];
        this.prompt = "";
        this.answer = "";
        this.wrongs = 0;
        this.rights = 0;
    }
    
    isRight() {
        return this.solutions.includes(this.answer);
    }

    getCorrection() {
        let correction = "";
        for (let i = 0; i < this.solutions.length; i++) {
            correction += this.solutions[i] + " / ";
        }
        return correction.substring(0, correction.length-3);
    }

    getTitle() {
        return this.title;
    }

    getPrompt() {
        return this.prompt;
    }

    static addBundle() {
        throw new Error("Method 'addBundle()' must be implemented.");
    }
}




class GameIrregularVerbQuery extends GameQuery {
    static title = "Complétez l'espace manquant en anglais";

    constructor() {
        super();
    }

    // factory method
    static addBundle(bundle, queries) {
        if (bundle.includes("irregular_verbs")) {
            let bank = bundle.substring(0, bundle.lastIndexOf("_"));
            let tense = bundle.substring(bundle.lastIndexOf("_")+1);

            let verbs = irregularVerbsVocabulary.filter(item => item.name == bank)[0].items;

            for (let i = 0; i < verbs.length; i++) {
                let query = new GameIrregularVerbQuery();

                let tempsFrancais = "";
                switch (tense) {
                    case "inf":
                        tempsFrancais = "à l'Infinitif";
                        break;
                    case "ps":
                        tempsFrancais = "au Passé Simple";
                        break;
                    case "pp":
                        tempsFrancais = "au Participe Passé";
                        break;
                }

                query.prompt = "Le verbe \"" + verbs[i].fr + "\" " + tempsFrancais;
                query.solutions = [verbs[i][tense]];

                queries.push(query);
            }
        }
    }
}


class GameConjugationQuery extends GameQuery {
    constructor() {
        super();
    }
}





selectedBundles.push("irregular_verbs_1_inf")
Game.generateQueries()
console.log(Game.queries)















