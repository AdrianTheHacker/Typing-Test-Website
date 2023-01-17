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
let words = document.getElementById("typing-text");
let text = fixList(words.innerHTML);
let textLog = 0;

String.prototype.replaceAt = function (index, char) {
    let a = this.split("");
    a[index] = char;
    return a.join("");
}

window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }

    if(event.key == text[textLog]) {
        let lastArrow = words.innerHTML.lastIndexOf(">");
        let index = words.innerHTML.indexOf(event.key, lastArrow);

        newWords = words.innerHTML.replaceAt(index, `<span style="color: #a4ffbb;">${event.key}</span>`);
        words.innerHTML = newWords;

        textLog += 1;
    }
});
