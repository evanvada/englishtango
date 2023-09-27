







export default class GameQuestion {
    constructor() {
        this.title = "";
        this.prompt = "";
        this.solutions = [];
        this.answers = [];
        this.audio = null;
        this.conceptID = "";
    }

    addAnswer(text) {
        let answer = []

        // normalize and save input
        let input = text;
        input = input.replace(/[^\p{L}\s'-]+/gu, "")
        input = input.replace(/\s+/g, " ").trim();
        answer.input = input;

        // check if the answer is exact and save the result
        let lower = input.toLowerCase();
        let correct = this.solutions.includes(lower);
        answer.correct = correct;
        answer.perfect = correct;

        // TODO: check if the answer is close and save the result

        // TODO: create and save the correction showing the errors inside the near perfect answer

        // save all the possible solutions
        let solutionStr = "";
        for (let i = 0; i < this.solutions.length; i++) {
            solutionStr += this.solutions[i] + " / ";
        }
        answer.solution = solutionStr.substring(0, solutionStr.length-3)

        // return
        this.answers.unshift(answer);
        return correct;
    }
}







