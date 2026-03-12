import React, { useState, useEffect } from "react";

function StopWatch() {
    const [isRunning, setIsRunning] = useState(false)
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = React.useRef(null);
    const startTimeRef = React.useRef(0);

    useEffect(() => {
        if (isRunning) {
            startTimeRef.current = Date.now() - elapsedTime
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        } else {
            clearInterval(intervalIdRef.current);
        }
        return () => clearInterval(intervalIdRef.current);
    }, [isRunning]);


    const handleStart = () => {
        setIsRunning(true);
    }

    const handleStop = () => {
        setIsRunning(false);
    }

    const handleReset = () => {
        setTime(0);
        setIsRunning(false);
    }

    function formatTime() {
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);
        let milliseconds = Math.floor(elapsedTime % 1000 / 10);

        hours = hours.toString().padStart(2, '0');
        minutes = minutes.toString().padStart(2, '0');
        seconds = seconds.toString().padStart(2, '0');
        milliseconds = milliseconds.toString().padStart(2, '0');

        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    }

    return (
        <div className="stop-watch-container">
            <h1>Stop Watch</h1>
            <p>{formatTime()}</p>
            <button className="start-button" onClick={handleStart} disabled={isRunning}>Start</button>
            <button className="stop-button" onClick={handleStop} disabled={!isRunning}>Stop</button>
            <button className="reset-button" onClick={handleReset}>Reset</button>
        </div>
    )
}

export default StopWatch