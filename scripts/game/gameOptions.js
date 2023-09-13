



export let selectedRepetitionOption;
export let selectedQuestionOption;
export let selectedBundles;

let version = "0.1"

export let repetitionOptions = [
    {name: "repeat_question", fr: "Répéter les question ratées"},
    {name: "one_chance", fr: "Une seule chance"},
]

export let questionOptions = [
    {name: "read_en_write_fr", fr: "Traduire en français"},
    {name: "read_fr_write_en", fr: "Traduire en anglais"},
    {name: "read_fr_choose_en", fr: "Choisir la réponse en anglais"},
    {name: "read_en_choose_fr", fr: "Choisir la réponse en français"},
]

export function setSelectedBundles(newSelectedBundles) {
    selectedBundles = newSelectedBundles
    saveAllToLocalStorage()
}

export function loadAllFromLocalStorage() {
    const loaded = JSON.parse(localStorage.getItem("game_" + version)) || {}

    selectedRepetitionOption = loaded.selectedRepetitionOption || "repeat_question"
    selectedQuestionOption = loaded.selectedQuestionOption || "read_en_write_fr"
    selectedBundles = loaded.selectedBundles || []
}

export function saveAllToLocalStorage() {
    const loading = {
        selectedRepetitionOption: selectedRepetitionOption,
        selectedQuestionOption: selectedQuestionOption,
        selectedBundles: selectedBundles,
    }
    localStorage.setItem("game_" + version, JSON.stringify(loading))
}



