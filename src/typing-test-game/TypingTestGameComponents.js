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

function WordsToType({ lettersAsSpansList }) {
    return(
        <div className='words-to-type-container'>
            {lettersAsSpansList}
        </div>
    )
}

const wordsList = "React can be used to develop single-page, mobile, or server-rendered applications with frameworks like Next.js. Because React is only concerned with the user interface and rendering components to the DOM, React applications often rely on libraries for routing and other client-side functionality.";
function createWordsListToListOfSpans(wordsList) {
    let wordsListAsSpan = [];
    
    [...wordsList].forEach((letter) => {
        wordsListAsSpan.push(<span className='typing-letter'>{letter}</span>);
    });

    return wordsListAsSpan;
}

export function TypingTestBase() {
    const wordsListAsSpan = createWordsListToListOfSpans(wordsList);

    return(
        <div className='typing-test-base'>
            <WordsToType lettersAsSpansList={wordsListAsSpan}/>
            <WordsTypedDisplay wordsTyped={0} />
            <TimeRemainingDisplay timeRemaining={30}/>
        </div>
    )
}

export function AppLogo() {
    return(
        <h2 className="app-logo-text">Typing Test</h2>
    );
}