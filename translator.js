const regex_string = `(${Object.keys(words).join('|')})(?=($|[\\W\\n]+))`


function cypher_string(s) {
    st = ""
    for (c of s) {
        ct = cypher[c];
        st += (ct != undefined) ? ct : c;
    }
    return st;
}


function translate_string(s) {
    let text_tl = "";

    let regex = RegExp(regex_string, 'g')

    // Array of all translatable words
    // [ {name: "word", start: 45, end: 49 }, ... ]
    let matched_words = [];
    let match = [];

    // Match all the words and put them in an array with start and end index
    while((match = regex.exec(s)) !== null) {
        console.log("Matched: ", match[1])
        matched_words.push({ name: match[1], start: match.index, end: regex.lastIndex} );
    }

    console.log(matched_words);

    // 
    let i_start = 0;
    for (m of matched_words) {
        // translate eveerything before the first word
        text_tl += cypher_string(s.substring(i_start, m.start));
        // translate the word
        text_tl += words[m.name]
        i_start = m.end;
    }
    text_tl += cypher_string(s.substring(i_start));
    return text_tl;
}

console.log("Fiished")
