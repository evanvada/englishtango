





let enGrammar = [];
let enLexicon = [];
let enLexiconTags = [];

// flags
let fetchDone = false;
let fetchError = false;

function fetchFile(file, data) {
    return fetch(file).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Fetching file "' + file + '" error');
        }
    })
}

export async function fetchAll() {
    return await Promise.all([
        fetchFile("scripts/data/enGrammar.json"),
        fetchFile("scripts/data/enLexicon.json"),
        fetchFile("scripts/data/enLexiconTags.json")
    ])
    .then((values) => {
        enGrammar = values[0];
        enLexicon = values[1];
        enLexiconTags = values[2];
        fetchDone = true;
    })
    .catch(() => { fetchError = true; });
}

// select lexemes by using tag IDs
export function getLexemesWithTags(queries, lexicon = enLexicon) {
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
export function getLexemes(queries) {
    let selected = [];
    for (let i in queries) {
        let tag = enLexicon.find(lexem => lexem.id == queries[i]);
        selected.push(tag);
    }
    return selected;
}

// get tags from tag IDs
export function getTags(queries) {
    let selected = [];
    for (let i in queries) {
        let tag = enLexiconTags.find(tag => tag.id == queries[i]);
        selected.push(tag);
    }
    return selected;
}
