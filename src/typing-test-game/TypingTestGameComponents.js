import { useEffect, useState } from 'react';
import { useModal } from 'react-hooks-use-modal';
import { useKeyPress } from './useKeyPress';
import './TypingTestGameComponents.css';

function StartScreenPopup({ closeFunction }) {
    return (
        <div className='popup-box'>
            <button onClick={closeFunction} className='play-again-button'>Play</button>
        </div>
    );
}

function EndScreenPopup({ closeFunction, wordsTyped, timeInSeconds }) {
    const wordsPerMinute = (wordsTyped / (timeInSeconds / 60)).toFixed(2);
    const wordsPerMinuteText = 'Words Per Minute: '.concat(wordsPerMinute);

    return (
        <div className='popup-box'>
            <p className='test-info-box'>{wordsPerMinuteText}</p>
            <button onClick={closeFunction} className='play-again-button'>Play</button>
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

const singleQuotationMark = "'";
const allowedCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890`~!@#$%^&*()-_=+[{]}\;|:"<,>.?/ '.concat(singleQuotationMark);

function getWordsSample(words) {   
    const wordsAsArr = words.split(' ');
    const wordsSampleLength = 60;
    let wordsSample = '';

    for(let i = 0; i < wordsSampleLength - 1; i ++) {
        const index = Math.floor(Math.random() * wordsAsArr.length - 1);
        wordsSample = wordsSample.concat(wordsAsArr[index] + ' ');
    }
    wordsSample = wordsSample.concat(wordsAsArr[Math.floor(Math.random() * wordsAsArr.length - 1)] + '.');

    return wordsSample;
}

const words = 'a about all also and as at be because but by can come could day do even find first for from get give go have he her here him his how I if in into it its just know like look make man many me more my new no not now of on one only or other our out people say see she so some take tell than that the their them then there these they thing think this those time to two up use very want way we well what when which who will with would year you your';

export function TypingTestBase() { 
    const amountOfTime = 30;

    const [StartScreenModal, openStartScreen, closeStartScreen, isStartScreenOpen] = useModal('root', {
        preventScroll: true,
        closeOnOverlayClick: false
    });

    const [EndScreenModal, openEndScreen, closeEndScreen, isEndScreenOpen] = useModal('root', {
        preventScroll: true,
        closeOnOverlayClick: false
    });

    const [numberOfWordsTyped, setWordsTyped] = useState(() => {
        openStartScreen();
        return 0;
    });

    const [notTypedCharacters, setNotTypedCharacters] = useState(getWordsSample(words));
    const [correctCharacters, setCorrectCharacters] = useState('');
    const [wrongCharacters, setWrongCharacters] = useState('');
    const [timeRemaining, setTimeRemaining] = useState(amountOfTime);

    useEffect(() => {
        setTimeout(() => {
            if (isEndScreenOpen || isStartScreenOpen) { return; }

            if (timeRemaining === 0) {
                openEndScreen();
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

        if (key === ' ' && wrongCharacters === '') { setWordsTyped(numberOfWordsTyped + 1); }
        if (notTypedCharacters.length === 1) { setWordsTyped(numberOfWordsTyped + 1); }

        if (wrongCharacters !== '') {
            setWrongCharacters(wrongCharacters.concat(notTypedCharacters.charAt(0)));
            setNotTypedCharacters(notTypedCharacters.slice(1));
            return;
        }

        setCorrectCharacters(correctCharacters.concat(notTypedCharacters.charAt(0)));
        setNotTypedCharacters(notTypedCharacters.slice(1));
    });

    function startGame() {
        const newWords = getWordsSample(words);

        setWordsTyped(0);
        setTimeRemaining(amountOfTime);
        setNotTypedCharacters(newWords);
        setCorrectCharacters('');
        setWrongCharacters('');
        return closeStartScreen();
    }

    function restartGame() {
        const newWords = getWordsSample(words);

        setWordsTyped(0);
        setTimeRemaining(amountOfTime);
        setNotTypedCharacters(newWords);
        setCorrectCharacters('');
        setWrongCharacters('');
        return closeEndScreen();
    }

    return (
        <div className='typing-test-base'>
            <WordsToType notTypedCharacters={notTypedCharacters} correctCharacters={correctCharacters} wrongCharacters={wrongCharacters} />
            <WordsTypedDisplay wordsTyped={numberOfWordsTyped} />
            <TimeRemainingDisplay timeRemaining={timeRemaining} />
            <StartScreenModal>
                <StartScreenPopup closeFunction={startGame} /> 
            </StartScreenModal>
            <EndScreenModal>
                <EndScreenPopup closeFunction={restartGame} wordsTyped={numberOfWordsTyped} timeInSeconds={amountOfTime} />
            </EndScreenModal>
        </div>
    )
}

export function AppLogo() {
    return (
        <h2 className="app-logo-text">Typing Test</h2>
    );
}