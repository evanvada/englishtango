




class GameOptions {
    
    static selectedRepetitionOption;
    static selectedQuestionOption;
    static selectedBundles;

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

    static loadFromLocalStorage() {
        this.selectedRepetitionOption = localStorage.getItem("selectedRepetitionOption") || "repeat_question"
        this.selectedQuestionOption = localStorage.getItem("selectedQuestionOption") || "read_en_write_fr"
        this.selectedBundles = JSON.parse(localStorage.getItem("selectedBundles")) || []
    }
}





