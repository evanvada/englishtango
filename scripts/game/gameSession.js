import * as GameProgression from "./gameProgression.js";
import * as GameOptions from "./gameOptions.js";
import GameBundle from "./gameBundles.js";

import * as Utils from "../utils.js";

export let questions = [];
export let archivedQuestions = [];
export let gameoverInfo = [];
export let rights = 0;
export let wrongs = 0;
export let state = "loading";

export function checkAnswer(input, showRight, showWrong) {
    if (questions[0].addAnswer(input)) {
        rightUpdate(showRight)
    } else {
        wrongUpdate(showWrong)
    }
}

export function rightUpdate(showRight) {
    state = "right";
    showRight()
    // update game : archive the question
    if (questions[0].answers.length == 1) { rights += 1; }
    archivedQuestions.push(questions.shift());
}

export function wrongUpdate(showWrong) {
    state = "wrong";
    showWrong()
    // update game : repeat wrong question if option is selected
    wrongs += 1
    if (GameOptions.selectedRepetitionOption == "repeat_question") {
        questions.splice(Utils.randomInt(0, questions.length-1), 0, questions.shift())
    } else if (GameOptions.selectedRepetitionOption == "one_chance") {
        archivedQuestions.push(questions.shift());
    }
}

export function continueGame(showUserInput, showGameover) {
    if (questions.length > 0) {
        state = "question";
        showUserInput()
    } else if (archivedQuestions.length > 0) {
        state = "gameover";
        gameoverInfo = GameProgression.updateOnGameover()
        showGameover()
    } else {
        throw new Error("No bundle selected");
    }
}

export function generateQuestions() {
    for (let i in GameOptions.selectedBundles) {
        let generatedQuestions = GameBundle.getBundleByName(GameOptions.selectedBundles[i]).generateQuestions()
        questions = questions.concat(generatedQuestions)
    }
    Utils.shuffleArray(questions)
}
