




class GameOptions {
    
    static selectedRepetitionOption;
    static selectedQuestionOption;
    static selectedBundles;

    static version = "0.1"

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
        const loaded = JSON.parse(localStorage.getItem("game_" + GameOptions.version)) || {}

        GameOptions.selectedRepetitionOption = loaded.selectedRepetitionOption || "repeat_question"
        GameOptions.selectedQuestionOption = loaded.selectedQuestionOption || "read_en_write_fr"
        GameOptions.selectedBundles = loaded.selectedBundles || []
    }

    static saveAllToLocalStorage() {
        const loading = {
            selectedRepetitionOption: GameOptions.selectedRepetitionOption,
            selectedQuestionOption: GameOptions.selectedQuestionOption,
            selectedBundles: GameOptions.selectedBundles,
        }
        localStorage.setItem("game_" + GameOptions.version, JSON.stringify(loading))
    }
}





