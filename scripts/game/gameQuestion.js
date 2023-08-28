







class GameQuestion {
    constructor() {
        this.title = "";
        this.prompt = "";
        this.solutions = [];

        this.answers = [];
        this.normalizedAnswers = [];

        this.wrongs = 0;
        this.rights = 0;

        this.conceptID = "";
    }

    normalizeAnswer() {
        let answer = this.answers[this.answers.length-1];

        answer = answer.toLowerCase();
        // only letters
        answer = answer.replace(/[^\p{L}\s'-]+/gu, "")
        // remove unecessary spaces
        answer = answer.replace(/\s+/g, " ").trim();

        // TODO: now check for typos... 2 maximum, depending on the length
        // except if the misstyped word is in the vocabulary (eg: men & man & main & many & manly, spin & span & spun, very similar but different meaning)

        this.normalizeAnswer[this.answers.length-1] = answer;
    }

    isRight() {
        this.normalizeAnswer();
        return this.solutions.includes(this.normalizedAnswers[this.answers.length-1]);
    }

    getCorrection() {
        if (this.isRight()) {
            // return the difference between the answer and the normalized answer
            let correction = "";
            let answer = this.answers[this.answers.length - 1];
            let normalizedAnswer = this.normalizedAnswers[this.normalizedAnswers.length - 1];
            for (let i = 0; i < answer.length; i++) {
                if (answer[i] === normalizedAnswer[i]) {
                    correction += answer[i];
                } else {
                    correction += "<u>" + answer[i] + "</u>";
                }
            }
            return correction;
        } else {
            // return all possible solutions
            let correction = "";
            for (let i = 0; i < this.solutions.length; i++) {
                correction += this.solutions[i] + " / ";
            }
            return correction.substring(0, correction.length-3);
        }
    }
}







