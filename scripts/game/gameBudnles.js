

class GameBundle {
    static bundles = {}

    constructor(name, size) {
        this.name = name
        this.size = size
        GameBundle.bundles[this.name] = this
    }

    // generate questions into the given array
    generateQuestions(questions) {
        throw new Error("generateQuestions() not implemented")
    }
}
















class GameIrregularVerbsBundle extends GameBundle {
    static bundles = []

    constructor(name, tenseTag, verbTags) {
        super(name, verbTags.length)
        this.verbTags = verbTags
        this.tenseTag = tenseTag
    }

    generateQuestions(questions) {

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
            question.solutions = lexemes[i].map(lexemes => lexemes.en);
            // return the lexeme with the least amount of tags
            question.conceptID = "lexeme " + lexemes[i][0].id

            questions.push(question)
        }
    }
}


var verbs1 = [ "verb_base_be", "verb_base_buy", "verb_base_do", "verb_base_drink", "verb_base_eat", "verb_base_find", "verb_base_give", "verb_base_go", "verb_base_have", "verb_base_make", "verb_base_read", "verb_base_see", "verb_base_sleep", "verb_base_speak", "verb_base_take", "verb_base_wear", "verb_base_write", "verb_base_become" ]
var verbs2 = [ "verb_base_begin", "verb_base_hold", "verb_base_come", "verb_base_draw", "verb_base_burn", "verb_base_build", "verb_base_break", "verb_base_choose", "verb_base_fall", "verb_base_feel", "verb_base_forget", "verb_base_hear", "verb_base_cut", "verb_base_drive", "verb_base_keep", "verb_base_dream" ]
var verbs3 = [ "verb_base_know", "verb_base_learn", "verb_base_light", "verb_base_meet", "verb_base_pay", "verb_base_ride", "verb_base_ring", "verb_base_run", "verb_base_sell", "verb_base_shut", "verb_base_sing", "verb_base_spell", "verb_base_swim", "verb_base_teach", "verb_base_tell", "verb_base_think", "verb_base_understand", "verb_base_shine" ]
var verbs4 = [ "verb_base_blow", "verb_base_bring", "verb_base_catch", "verb_base_cost", "verb_base_beat", "verb_base_bite", "verb_base_bleed", "verb_base_fight", "verb_base_deal", "verb_base_dig", "verb_base_fly", "verb_base_forbid", "verb_base_freeze", "verb_base_get", "verb_base_grow", "verb_base_hide", "verb_base_let", "verb_base_hit", "verb_base_lie", "verb_base_lose", "verb_base_mean", "verb_base_leave" ]
var verbs5 = [ "verb_base_wake", "verb_base_send", "verb_base_say", "verb_base_put", "verb_base_set", "verb_base_shake", "verb_base_show", "verb_base_sit", "verb_base_spend", "verb_base_spread", "verb_base_stand", "verb_base_hurt", "verb_base_lend", "verb_base_steal", "verb_base_strike", "verb_base_swear", "verb_base_sweep", "verb_base_throw", "verb_base_weep", "verb_base_win" ]
var verbs6 = [ "verb_base_awake", "verb_base_bend", "verb_base_bet", "verb_base_breed", "verb_base_burst", "verb_base_cast", "verb_base_feed", "verb_base_forgive", "verb_base_hang", "verb_base_kneel", "verb_base_lay", "verb_base_lead", "verb_base_shoot", "verb_base_smell", "verb_base_spill", "verb_base_spoil", "verb_base_stick", "verb_base_sting", "verb_base_upset", "verb_base_withdraw", "verb_base_seek", "verb_base_rise" ]
var verbs7 = [ "verb_base_arise", "verb_base_broadcast", "verb_base_cling", "verb_base_creep", "verb_base_flee", "verb_base_forecast", "verb_base_foresee", "verb_base_freeze", "verb_base_grind", "verb_base_leap", "verb_base_mistake", "verb_base_quit", "verb_base_seek", "verb_base_bind", "verb_base_sink", "verb_base_spill", "verb_base_spit", "verb_base_split", "verb_base_spring", "verb_base_stink", "verb_base_swell", "verb_base_tear", "verb_base_undergo", "verb_base_undertake", "verb_base_swing", "verb_base_overcome" ]

new GameIrregularVerbsBundle("irregular_verbs_1_inf", "verb_inf", verbs1)
new GameIrregularVerbsBundle("irregular_verbs_2_inf", "verb_inf", verbs2)
new GameIrregularVerbsBundle("irregular_verbs_3_inf", "verb_inf", verbs3)
new GameIrregularVerbsBundle("irregular_verbs_4_inf", "verb_inf", verbs4)
new GameIrregularVerbsBundle("irregular_verbs_5_inf", "verb_inf", verbs5)
new GameIrregularVerbsBundle("irregular_verbs_6_inf", "verb_inf", verbs6)
new GameIrregularVerbsBundle("irregular_verbs_7_inf", "verb_inf", verbs7)

new GameIrregularVerbsBundle("irregular_verbs_1_ps", "verb_ps", verbs1)
new GameIrregularVerbsBundle("irregular_verbs_2_ps", "verb_ps", verbs2)
new GameIrregularVerbsBundle("irregular_verbs_3_ps", "verb_ps", verbs3)
new GameIrregularVerbsBundle("irregular_verbs_4_ps", "verb_ps", verbs4)
new GameIrregularVerbsBundle("irregular_verbs_5_ps", "verb_ps", verbs5)
new GameIrregularVerbsBundle("irregular_verbs_6_ps", "verb_ps", verbs6)
new GameIrregularVerbsBundle("irregular_verbs_7_ps", "verb_ps", verbs7)

new GameIrregularVerbsBundle("irregular_verbs_1_pp", "verb_pp", verbs1)
new GameIrregularVerbsBundle("irregular_verbs_2_pp", "verb_pp", verbs2)
new GameIrregularVerbsBundle("irregular_verbs_3_pp", "verb_pp", verbs3)
new GameIrregularVerbsBundle("irregular_verbs_4_pp", "verb_pp", verbs4)
new GameIrregularVerbsBundle("irregular_verbs_5_pp", "verb_pp", verbs5)
new GameIrregularVerbsBundle("irregular_verbs_6_pp", "verb_pp", verbs6)
new GameIrregularVerbsBundle("irregular_verbs_7_pp", "verb_pp", verbs7)






















