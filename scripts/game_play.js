






function noAnswer() {

}


function checkAnswer() {
    // verifyAnswer()
}



function nextQuestion() {
    
}




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









exerciceDisplayE.innerHTML = "Maintenant, je mange une pomme.<br>→ I <span class='unknown'></span> an apple.";
exerciceTitleE.innerHTML = "Complétez l'espace manquant en anglais";















function showWrongFeedback() {
    exerciceAnswerE.classList.add("hidden")
    exerciceAnswerWrongE.classList.remove("hidden")
    exerciceAnswerRightE.classList.add("hidden")

    responseE.classList.add("hidden")
    responseWrongE.classList.remove("hidden")
    responseRightE.classList.add("hidden")
}

function showRightFeedback() {
    exerciceAnswerE.classList.add("hidden")
    exerciceAnswerWrongE.classList.add("hidden")
    exerciceAnswerRightE.classList.remove("hidden")

    responseE.classList.add("hidden")
    responseWrongE.classList.add("hidden")
    responseRightE.classList.remove("hidden")
}

function showUserInput() {
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
    constructor() {
        this.queries = [];
        this.archived_queries = [];
        this.score = 0;
    }

    verifyAnswer() {
        let answer = exerciceAnswerE.value;
        answer = answer.toLowerCase();
        // only letters
        answer = answer.replace(/[^\p{L}\s'-]+/gu, "")
        // remove unecessary spaces
        answer = answer.replace(/\s+/g, " ").trim();
        game.queries[0].answer = answer
    
        if (game.queries[0].isRight()) {
            // feedback
            showRightFeedback()
            exerciceAnswerRightE.innerHTML = exerciceAnswerE.innerHTML
            responseRightCorrectionSpanE.innerHTML = game.queries[0].getCorrection()

            // update game : archive the question
            game.queries[0].rights += 1
            game.archived_queries.push(game.queries.shift());
        } else {
            // feedback
            showWrongFeedback()
            exerciceAnswerWrongE.innerHTML = exerciceAnswerE.innerHTML
            responseWrongCorrectionSpanE.innerHTML = game.queries[0].getCorrection()

            // update game : repeat wrong question if option is selected
            game.queries[0].wrongs += 1
            if (selectedRepetitionOption == "repeat_question") {
                game.queries.splice(randomInt(0, game.queries.length-1), 0, game.queries.shift())
            } else if (selectedRepetitionOption == "one_chance") {
                game.archived_queries.push(game.queries.shift());
            }
        }
    }

    update() {
        // go to next state when pressed Enter

        // update the particles on the canvas

    }
    
    generateQueries() {
        
    }
}





class GameQuery {
    constructor() {
        this.question = "";
        // this.solutions = [];
        this.answer = "";
        this.wrongs = 0;
        this.rights = 0;
    }

    isRight() {
        throw new Error("Method 'isRight()' must be implemented.");
    }

    getCorrection() {
        throw new Error("Method 'getCorrection()' must be implemented.");
    }

    getTitle() {
        throw new Error("Method 'getTitle()' must be implemented.");
    }

    getText() {
        throw new Error("Method 'getText()' must be implemented.");
    }
}




class GameIrregularVerbQuery extends GameQuery {
    constructor() {
        super();
    }
}


class GameConjugationQuery extends GameQuery {
    constructor() {
        super();
    }
}

