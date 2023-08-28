






class DataInterface {

    static enGrammar = [];
    static enLexicon = [];
    static enLexiconTags = [];
    
    // flags
    static fetchDone = false;
    static fetchError = false;
    
    static fetchFile(file, data) {
        return fetch(file).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Fetching file "' + file + '" error');
            }
        })
    }

    static fetchAll() {
        Promise.all([
            this.fetchFile("scripts/data/enGrammar.json"),
            this.fetchFile("scripts/data/enLexicon.json"),
            this.fetchFile("scripts/data/enLexiconTags.json")
        ])
        .then((values) => {
            DataInterface.enGrammar = values[0];
            DataInterface.enLexicon = values[1];
            DataInterface.enLexiconTags = values[2];
            DataInterface.fetchDone = true;
        })
        .catch(() => { DataInterface.fetchError = true; });
    }

    // select lexemes by using tag IDs
    static getLexemesWithTags(queries, lexicon = this.enLexicon) {
        let selected = [];
        for (let i in queries) {
            let selectedThisQuery = [];
            for (let j in lexicon) {
                if (queries[i].every(tag => lexicon[j].tags.includes(tag))) {
                    selectedThisQuery.push(lexicon[j]);
                }
            }
            selected.push(selectedThisQuery);
        }
        return selected;
    }
    
    // get lexemes from lexem IDs
    static getLexemes(queries) {
        let selected = [];
        for (let i in queries) {
            let tag = this.enLexicon.find(lexem => lexem.id == queries[i]);
            selected.push(tag);
        }
        return selected;
    }
    
    // get tags from tag IDs
    static getTags(queries) {
        let selected = [];
        for (let i in queries) {
            let tag = this.enLexiconTags.find(tag => tag.id == queries[i]);
            selected.push(tag);
        }
        return selected;
    }
}

DataInterface.fetchAll()
