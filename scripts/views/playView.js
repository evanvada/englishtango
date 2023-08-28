








const mainE = document.querySelector('main');

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




function showRightFeedback() {
    exerciceAnswerRightE.innerHTML = Game.questions[0].answers[0].input
    responseRightCorrectionSpanE.innerHTML = Game.questions[0].answers[0].solution
    
    exerciceAnswerE.classList.add("hidden")
    exerciceAnswerWrongE.classList.add("hidden")
    exerciceAnswerRightE.classList.remove("hidden")

    responseE.classList.add("hidden")
    responseWrongE.classList.add("hidden")
    responseRightE.classList.remove("hidden")
}

function showWrongFeedback() {
    exerciceAnswerWrongE.innerHTML = Game.questions[0].answers[0].input
    responseWrongCorrectionSpanE.innerHTML = Game.questions[0].answers[0].solution

    exerciceAnswerE.classList.add("hidden")
    exerciceAnswerWrongE.classList.remove("hidden")
    exerciceAnswerRightE.classList.add("hidden")

    responseE.classList.add("hidden")
    responseWrongE.classList.remove("hidden")
    responseRightE.classList.add("hidden")
}

function showUserInput() {

    exerciceTitleE.innerHTML = Game.questions[0].title
    exerciceDisplayE.innerHTML = Game.questions[0].prompt

    exerciceAnswerE.value = ""
    responseE.focus()

    exerciceAnswerE.classList.remove("hidden")
    exerciceAnswerWrongE.classList.add("hidden")
    exerciceAnswerRightE.classList.add("hidden")

    responseE.classList.remove("hidden")
    responseWrongE.classList.add("hidden")
    responseRightE.classList.add("hidden")
}

function showGameOver() {
    
}





// onclick functions

function noAnswer() {
    exerciceAnswerE.value = "";
    Game.checkAnswer();
}

function checkAnswer() {
    Game.checkAnswer();
}

function continueGame() {
    Game.continueGame();
}






DataInterface.fetchAll().then(() => {

    GameOptions.loadFromLocalStorage();
    GameOptions.selectedBundles = ["irregular_verbs_1_inf"]
    Game.generateQuestions();
    Game.continueGame();

    mainE.classList.remove("hidden");
})






