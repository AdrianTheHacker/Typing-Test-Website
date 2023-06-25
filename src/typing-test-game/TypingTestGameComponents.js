import { useState } from 'react';
import { useKeyPress } from './useKeyPress';
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

function WordsToType({ notTypedCharacters, correctCharacters, wrongCharacters }) {
    return(
        <div className='words-to-type-container'>
            <span className='correct-characters'>{correctCharacters}</span>
            <span className='wrong-characters'>{wrongCharacters}</span>
            <span className='not-typed-characters'>{notTypedCharacters}</span>
        </div>
    )
}

const words = "React can be used to develop single-page, mobile, or server-rendered applications with frameworks like Next.js. Because React is only concerned with the user interface and rendering components to the DOM, React applications often rely on libraries for routing and other client-side functionality.";

const singleQuotationMark = "'";
const allowedCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890`~!@#$%^&*()-_=+[{]}\;|:"<,>.?/ '.concat(singleQuotationMark);

export function TypingTestBase() {
    const [ numberOfWordsTyped, setWordsTyped ] = useState(0);
    const [ notTypedCharacters, setNotTypedCharacters ] = useState(words);
    const [ correctCharacters, setCorrectCharacters ] = useState('');
    const [ wrongCharacters, setWrongCharacters ] = useState('');
    const [ wrongLetterTyped, setWrongLetterTyped ] = useState(false);

    useKeyPress(key => {

        
        
        if(!allowedCharacters.includes(key)) { return; }

        if(key !== notTypedCharacters.charAt(0)) { 
            setWrongCharacters(wrongCharacters.concat(notTypedCharacters.charAt(0)));
            setNotTypedCharacters(notTypedCharacters.slice(1));
            setWrongLetterTyped(true);
            return; 
        }

        if(key === ' ') { setWordsTyped(numberOfWordsTyped + 1); }
        if(notTypedCharacters.length === 1) { setWordsTyped(numberOfWordsTyped + 1); }

        setCorrectCharacters(correctCharacters.concat(notTypedCharacters.charAt(0)));
        setNotTypedCharacters(notTypedCharacters.slice(1));
    }); 

    return(
        <div className='typing-test-base'>
            <WordsToType notTypedCharacters={notTypedCharacters} correctCharacters={correctCharacters} wrongCharacters={wrongCharacters}/>
            <WordsTypedDisplay wordsTyped={numberOfWordsTyped}/>
            <TimeRemainingDisplay timeRemaining={30}/>
        </div>
    )
}

export function AppLogo() {
    return(
        <h2 className="app-logo-text">Typing Test</h2>
    );
}