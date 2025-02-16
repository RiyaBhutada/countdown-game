import { useState, useRef } from "react";
import ResultModal from "./ResultModal.jsx";
//This var is shared across all instances of thsic component
//let timer;

export default function TimerChallenge({title, targetTime}){
    const dialog = useRef();
    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
    const timer = useRef();

    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    if(timeRemaining <= 0){
        clearInterval(timer.current);
        dialog.current.showModal();
    }

    function handleReset(){
        setTimeRemaining(targetTime * 1000);
    }

    function handleStart(){
        timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
        }, 10);

        setTimerStarted(true);
    }

    function handleStop(){
        dialog.current.showModal();
        clearInterval(timer.current);
    }

    return (
        <>
            <ResultModal ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} onReset={handleReset}/>
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1? "s": ""}
                </p>
                <p>
                    <button onClick={timerIsActive? handleStop: handleStart}>
                        {timerIsActive? "Stop": "Start"}Challenge
                    </button>
                </p>
                <p className={timerIsActive? "active": ""}>
                    {timerIsActive? "Timer is running": "Timer inactive"}
                </p>
            </section>
        </>
    );
}