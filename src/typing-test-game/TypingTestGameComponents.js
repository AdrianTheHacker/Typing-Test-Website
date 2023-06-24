import { useState } from 'react';
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
            {typedWords}
            {typingWords}
        </div>
    )
}

let words = "React can be used to develop single-page, mobile, or server-rendered applications with frameworks like Next.js. Because React is only concerned with the user interface and rendering components to the DOM, React applications often rely on libraries for routing and other client-side functionality.";

const typingWordsAsSpan = (words) => {
    return <span className='typing-words'>{words}</span>
}

export function TypingTestBase() {
    const [ letterIndex, setLetterIndex ] = useState(0);
    const [ typingWords, setTypingWords ] = useState(typingWordsAsSpan(words));
    const [ typedWords, setTypedWords ] = useState('');

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