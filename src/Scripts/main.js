function fixList(words) {
    // Removes '~' and '\n' from list
    let text = words.split('');

    for(let character = 0; character < text.length; character ++) {
        if(text[character - 1] == "\n" || text[character + 1] == " ") {
            let characterPortion = character;
            while(text[characterPortion] == ' ') {
                characterPortion += 1
            }

            for(characterRange = character; characterRange < characterPortion; characterRange += 1) {
                text[characterRange] = '~';
            }
        }
    }

    let character = 0;
    while(character < text.length) {
        if(text[character] == "~" || text[character] == "\n") {
            text.splice(character, 1);
            character = 0;
        }

        else {character += 1;}
    }

    return text;
}

let words = document.getElementById("typing-text").innerHTML;
let text = fixList(words);
console.log(text);
