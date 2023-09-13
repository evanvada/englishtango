import * as DataInterface from "/scripts/data/dataInterface.js";
import GameQuestion from "/scripts/game/gameQuestion.js";

export default class GameBundle {
    static bundles = {}

    constructor(name, size) {
        this.name = name
        this.size = size
        GameBundle.bundles[this.name] = this
    }

    static getBundleByName(bundleName) {
        const bundle = GameBundle.bundles[bundleName]
        if (bundle == null) { throw new Error('Bundle "' + bundleName + '" does not exit') }
        return bundle
    }

    generateQuestions(questions) {
        throw new Error("generateQuestions() not implemented")
    }
}

















class GameIrregularVerbsBundle extends GameBundle {
    constructor(name, tenseTag, verbTags) {
        super(name, verbTags.length)
        this.verbTags = verbTags
        this.tenseTag = tenseTag
    }

    generateQuestions() {
        let questions = []

        // select lexemes that have the tags: verbTags & tenseTag
        let queries = this.verbTags.map(tag => [this.tenseTag, tag]);
        let lexemes = DataInterface.getLexemesWithTags(queries)

        // select verbTags
        let tags = DataInterface.getTags(this.verbTags)
        
        for (let i = 0; i < this.size; i++) {
            let question = new GameQuestion()

            let tempsFrancais = "";
            switch (this.tenseTag) {
                case "verb_inf":
                    tempsFrancais = "à l'Infinitif";
                    break;
                case "verb_ps":
                    tempsFrancais = "au Prétérit";
                    break;
                case "verb_pp":
                    tempsFrancais = "au Participe";
                    break;
            }
            question.title = "Traduisez ce terme en anglais"
            question.prompt = "Le verbe " + tags[i].fr + " " + tempsFrancais;
            
            for (let j in lexemes[i]) {
                question.solutions.push(lexemes[i][j].en);
                // add "to VERB" as a solution for infinitive
                if (this.tenseTag == "verb_inf") {
                    question.solutions.push("to " + lexemes[i][j].en)
                }
            }
            question.conceptID = "lexeme " + lexemes[i][0].id

            questions.push(question)
        }

        return questions
    }
}




// var verbs1 = [ "verb_base_do" ]
var verbs1 = [ "verb_base_do", "verb_base_go", "verb_base_buy", "verb_base_think", "verb_base_see", "verb_base_be", "verb_base_write", "verb_base_drive" ]
var verbs2 = [ "verb_base_seek", "verb_base_catch", "verb_base_eat", "verb_base_beat", "verb_base_freeze", "verb_base_choose", "verb_base_grow", "verb_base_know" ]
var verbs3 = [ "verb_base_take", "verb_base_shake", "verb_base_say", "verb_base_read", "verb_base_ring", "verb_base_sing", "verb_base_teach", "verb_base_fight" ]
var verbs4 = [ "verb_base_win", "verb_base_become", "verb_base_wake", "verb_base_speak", "verb_base_drink", "verb_base_shrink", "verb_base_give", "verb_base_ride" ]
var verbs5 = [ "verb_base_pay", "verb_base_make", "verb_base_send", "verb_base_bend", "verb_base_creep", "verb_base_leap", "verb_base_begin", "verb_base_spin" ]
var verbs6 = [ "verb_base_keep", "verb_base_sweep", "verb_base_leave", "verb_base_sleep", "verb_base_learn", "verb_base_burn", "verb_base_deal", "verb_base_kneel" ]
var verbs7 = [ "verb_base_sit", "verb_base_spit", "verb_base_steal", "verb_base_break", "verb_base_swim", "verb_base_sting", "verb_base_come", "verb_base_spring" ]
var verbs8 = [ "verb_base_wear", "verb_base_tear", "verb_base_throw", "verb_base_sew", "verb_base_hide", "verb_base_forgive", "verb_base_feel", "verb_base_spell" ]
var verbs9 = [ "verb_base_stick", "verb_base_strike", "verb_base_forget", "verb_base_tread", "verb_base_sell", "verb_base_tell", "verb_base_rise", "verb_base_bite" ]
var verbs10 = [ "verb_base_feed", "verb_base_flee", "verb_base_blow", "verb_base_fly", "verb_base_meet", "verb_base_weep", "verb_base_lose", "verb_base_get" ]

new GameIrregularVerbsBundle("irregular_verbs_1_inf", "verb_inf", verbs1)
new GameIrregularVerbsBundle("irregular_verbs_2_inf", "verb_inf", verbs2)
new GameIrregularVerbsBundle("irregular_verbs_3_inf", "verb_inf", verbs3)
new GameIrregularVerbsBundle("irregular_verbs_4_inf", "verb_inf", verbs4)
new GameIrregularVerbsBundle("irregular_verbs_5_inf", "verb_inf", verbs5)
new GameIrregularVerbsBundle("irregular_verbs_6_inf", "verb_inf", verbs6)
new GameIrregularVerbsBundle("irregular_verbs_7_inf", "verb_inf", verbs7)
new GameIrregularVerbsBundle("irregular_verbs_8_inf", "verb_inf", verbs8)
new GameIrregularVerbsBundle("irregular_verbs_9_inf", "verb_inf", verbs9)
new GameIrregularVerbsBundle("irregular_verbs_10_inf", "verb_inf", verbs10)

new GameIrregularVerbsBundle("irregular_verbs_1_ps", "verb_ps", verbs1)
new GameIrregularVerbsBundle("irregular_verbs_2_ps", "verb_ps", verbs2)
new GameIrregularVerbsBundle("irregular_verbs_3_ps", "verb_ps", verbs3)
new GameIrregularVerbsBundle("irregular_verbs_4_ps", "verb_ps", verbs4)
new GameIrregularVerbsBundle("irregular_verbs_5_ps", "verb_ps", verbs5)
new GameIrregularVerbsBundle("irregular_verbs_6_ps", "verb_ps", verbs6)
new GameIrregularVerbsBundle("irregular_verbs_7_ps", "verb_ps", verbs7)
new GameIrregularVerbsBundle("irregular_verbs_8_ps", "verb_ps", verbs8)
new GameIrregularVerbsBundle("irregular_verbs_9_ps", "verb_ps", verbs9)
new GameIrregularVerbsBundle("irregular_verbs_10_ps", "verb_ps", verbs10)

new GameIrregularVerbsBundle("irregular_verbs_1_pp", "verb_pp", verbs1)
new GameIrregularVerbsBundle("irregular_verbs_2_pp", "verb_pp", verbs2)
new GameIrregularVerbsBundle("irregular_verbs_3_pp", "verb_pp", verbs3)
new GameIrregularVerbsBundle("irregular_verbs_4_pp", "verb_pp", verbs4)
new GameIrregularVerbsBundle("irregular_verbs_5_pp", "verb_pp", verbs5)
new GameIrregularVerbsBundle("irregular_verbs_6_pp", "verb_pp", verbs6)
new GameIrregularVerbsBundle("irregular_verbs_7_pp", "verb_pp", verbs7)
new GameIrregularVerbsBundle("irregular_verbs_8_pp", "verb_pp", verbs8)
new GameIrregularVerbsBundle("irregular_verbs_9_pp", "verb_pp", verbs9)
new GameIrregularVerbsBundle("irregular_verbs_10_pp", "verb_pp", verbs10)






















