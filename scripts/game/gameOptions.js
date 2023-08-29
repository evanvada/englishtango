




class GameOptions {
    
    static selectedRepetitionOption;
    static selectedQuestionOption;
    static selectedBundles;

    static gameVersion = "0.1"

    static repetitionOptions = [
        {name: "repeat_question", fr: "Répéter les question ratées"},
        {name: "one_chance", fr: "Une seule chance"},
    ]
    
    static questionOptions = [
        {name: "read_en_write_fr", fr: "Traduire en français"},
        {name: "read_fr_write_en", fr: "Traduire en anglais"},
        {name: "read_fr_choose_en", fr: "Choisir la réponse en anglais"},
        {name: "read_en_choose_fr", fr: "Choisir la réponse en français"},
    ]

    static loadAllFromLocalStorage() {
        const loaded = JSON.parse(localStorage.getItem("game_" + GameOptions.gameVersion)) || {}

        this.selectedRepetitionOption = loaded.selectedRepetitionOption || "repeat_question"
        this.selectedQuestionOption = loaded.selectedQuestionOption || "read_en_write_fr"
        this.selectedBundles = loaded.selectedBundles || []
    }

    static saveAllToLocalStorage() {
        const loading = {
            selectedRepetitionOption: this.selectedRepetitionOption,
            selectedQuestionOption: this.selectedQuestionOption,
            selectedBundles: this.selectedBundles,
        }
        localStorage.setItem("game_" + GameOptions.gameVersion, JSON.stringify(loading))
    }
}





