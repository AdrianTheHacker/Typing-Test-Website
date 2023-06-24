import { useState } from 'react';
import { useKeyPress } from './UseKeyPressed';
import './TypingTestGameComponents.css';

function TimeRemainingDisplay({ timeRemaining }) {
    const displayText = 'Time Remaining: '.concat(timeRemaining);

    return(
        <p className='test-info-box'>{displayText}</p>
    );
}

function WordsTypedDisplay({ wordsTyped }) {
    const displayText = 'Words Typed: '.concat(wordsTyped);

    return(
        <p className='test-info-box'>{displayText}</p>
    );
}

function WordsToType({ typingWords, typedWords }) {
    return(
        <div className='words-to-type-container'>
            <span className='typed-words'>{typedWords}</span>
            <span className='typing-words'>{typingWords}</span>
        </div>
    )
}

let words = "React can be used to develop single-page, mobile, or server-rendered applications with frameworks like Next.js. Because React is only concerned with the user interface and rendering components to the DOM, React applications often rely on libraries for routing and other client-side functionality.";

export function TypingTestBase() {
    const [ typedWords, setTypedWords ] = useState('');
    const [ typingWords, setTypingWords ] = useState(words);

    useKeyPress(key => {
        console.log(key);

        if(key === typingWords.charAt(0)) {
            console.log("Matching Letters!");

            setTypedWords(typedWords.concat(typingWords.charAt(0)));
            setTypingWords(typingWords.slice(1));
        }
    }); 

    return(
        <div className='typing-test-base'>
            <WordsToType typingWords={typingWords} typedWords={typedWords}/>
            <WordsTypedDisplay wordsTyped={0}/>
            <TimeRemainingDisplay timeRemaining={30}/>
        </div>
    )
}

export function AppLogo() {
    return(
        <h2 className="app-logo-text">Typing Test</h2>
    );
}