/*
    Define a variable to keep track of the active status of the stopwatch,
    a variable for the number of sentiseconds and a variable that stores
    the interval once it is activated
*/
let stopWatchIsActive = false;
let centisecondCount = 0;
let stopWatch;

const timeDisplay = document.querySelector('.stopwatch__time');

/* 
    Define a function that calculates the current minutes, seconds and centiseconds, 
    and displays the current stopwatch time on the screen
*/
const setStopWatchTime = () => {
    let minutes = Math.floor(centisecondCount / 6000);
    let seconds = Math.floor((centisecondCount % 6000) / 100);
    let centiseconds = Math.floor(centisecondCount % 100);

    let minutesDisplay = (minutes < 10) ? `0${minutes}` : minutes;
    let secondsDisplay = (seconds < 10) ? `0${seconds}` : seconds;
    let centisecondsDisplay = (centiseconds < 10) ? `0${centiseconds}` : centiseconds;
    timeDisplay.textContent = `${minutesDisplay}:${secondsDisplay}.${centisecondsDisplay}`;

    centisecondCount++;
}

const startButton = document.querySelector('#start-button');
startButton.addEventListener('click', () => {
    stopWatchIsActive = !stopWatchIsActive;
    if (stopWatchIsActive) {
        // Store and activate interval once active
        stopWatch = setInterval(setStopWatchTime, 10);

        // Also, change the start button to a stop button
        startButton.classList.replace(startButton.classList[1], 'button--stop');
        startButton.textContent = 'Stop';
    } else {
        // Stopwatch is not active: stop the time and change back to start button
        clearInterval(stopWatch);
        startButton.classList.replace(startButton.classList[1], 'button--start');
        startButton.textContent = 'Start';
    }
});

const resetButton = document.querySelector('#reset-button');
resetButton.addEventListener('click', () => {
    // Reset all values to their initial state
    stopWatchIsActive = false;
    clearInterval(stopWatch);
    startButton.classList.replace(startButton.classList[1], 'button--start');
    startButton.textContent = 'Start';
    centisecondCount = 0;
    setStopWatchTime();
});

// Display the initial time once the page has loaded
setStopWatchTime();