import { useEffect, useState } from 'react';
import { useModal } from 'react-hooks-use-modal';
import { useKeyPress } from './useKeyPress';
import './TypingTestGameComponents.css';

function EndScreenPopup({ closeFunction, wordsTyped, timeInSeconds }) {
    const wordsPerMinute = (wordsTyped * (timeInSeconds / 60)).toFixed(2);
    const wordsPerMinuteText = 'Words Per Minute: '.concat(wordsPerMinute);

    return(
        <div className='popup-box'>
            <p className='test-info-box'>{wordsPerMinuteText}</p>
            <button onClick={closeFunction} className='play-again-button'>Play Again</button>
        </div>
    );
}

function TimeRemainingDisplay({ timeRemaining }) {
    const displayText = 'Time Remaining: '.concat(timeRemaining);

    return (
        <p className='test-info-box'>{displayText}</p>
    );
}

function WordsTypedDisplay({ wordsTyped }) {
    const displayText = 'Words Typed: '.concat(wordsTyped);

    return (
        <p className='test-info-box'>{displayText}</p>
    );
}

function WordsToType({ notTypedCharacters, correctCharacters, wrongCharacters }) {
    return (
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
    const amountOfTime = 10;

    const [numberOfWordsTyped, setWordsTyped] = useState(0);
    const [notTypedCharacters, setNotTypedCharacters] = useState(words);
    const [correctCharacters, setCorrectCharacters] = useState('');
    const [wrongCharacters, setWrongCharacters] = useState('');
    const [timeRemaining, setTimeRemaining] = useState(amountOfTime);

    const [Modal, open, close, isOpen] = useModal('root', {
        preventScroll: true,
        closeOnOverlayClick: false
    });

    useEffect(() => {
        setTimeout(() => {
            if(isOpen) {
                setTimeRemaining(amountOfTime);
                setNotTypedCharacters(words);
                setCorrectCharacters('');
                setWrongCharacters('');
                return;
            }

            if(timeRemaining === 0) {
                open();
                return;
            }

            const newTimeRemaining = timeRemaining - 1;
            setTimeRemaining(newTimeRemaining);

        }, 1000);
    });

    useKeyPress(key => {
        if (timeRemaining === 0) { return; }

        if (key === 'Backspace') {
            const newNotTypedCharacters = wrongCharacters.charAt(wrongCharacters.length - 1).concat(notTypedCharacters);
            const newWrongCharacters = wrongCharacters.slice(0, wrongCharacters.length - 1);

            setNotTypedCharacters(newNotTypedCharacters);
            setWrongCharacters(newWrongCharacters);
        }

        if (!allowedCharacters.includes(key)) { return; }

        if (key !== notTypedCharacters.charAt(0)) {
            setWrongCharacters(wrongCharacters.concat(notTypedCharacters.charAt(0)));
            setNotTypedCharacters(notTypedCharacters.slice(1));
            return;
        }

        if (key === ' ') { setWordsTyped(numberOfWordsTyped + 1); }
        if (notTypedCharacters.length === 1) { setWordsTyped(numberOfWordsTyped + 1); }

        if (wrongCharacters !== '') {
            setWrongCharacters(wrongCharacters.concat(notTypedCharacters.charAt(0)));
            setNotTypedCharacters(notTypedCharacters.slice(1));
            return;
        }

        setCorrectCharacters(correctCharacters.concat(notTypedCharacters.charAt(0)));
        setNotTypedCharacters(notTypedCharacters.slice(1));
    });

    return (
        <div className='typing-test-base'>
            <WordsToType notTypedCharacters={notTypedCharacters} correctCharacters={correctCharacters} wrongCharacters={wrongCharacters} />
            <WordsTypedDisplay wordsTyped={numberOfWordsTyped} />
            <TimeRemainingDisplay timeRemaining={timeRemaining} />
            <Modal>
                <EndScreenPopup closeFunction={close} wordsTyped={numberOfWordsTyped} timeInSeconds={amountOfTime}/>
            </Modal>
        </div>
    )
}

export function AppLogo() {
    return (
        <h2 className="app-logo-text">Typing Test</h2>
    );
}