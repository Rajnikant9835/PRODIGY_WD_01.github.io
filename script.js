let isRunning = false;
let isPaused = false;
let interval;
let lapStartTime;
let lapNumber = 1;

function toggleStartPause() {
    if (!isRunning) {
        start();
    } else {
        isPaused = !isPaused;
        if (isPaused) {
            clearInterval(interval);
        } else {
            interval = setInterval(updateTime, 1000);
        }
    }
}

function start() {
    isRunning = true;
    isPaused = false;
    lapStartTime = Date.now();
    document.getElementById('startBtn').textContent = 'Pause';
    interval = setInterval(updateTime, 1000);
}

function lap() {
    if (isRunning && !isPaused) {
        const lapTime = calculateElapsedTime(lapStartTime);
        const lapRecord = document.getElementById('lapRecord');
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapNumber}: ${formatTime(lapTime)}`;
        lapRecord.appendChild(lapItem);
        lapNumber++;
        lapStartTime = Date.now();
    }
}

function stop() {
    isRunning = false;
    isPaused = false;
    document.getElementById('startBtn').textContent = 'Start';
    clearInterval(interval);
    lapStartTime = null;
}

function reset() {
    isRunning = false;
    isPaused = false;
    document.getElementById('startBtn').textContent = 'Start';
    clearInterval(interval);
    lapStartTime = null;
    lapNumber = 1;
    document.getElementById('lapRecord').innerHTML = '';
    updateDisplay(0);
}

function updateTime() {
    updateDisplay(calculateElapsedTime(lapStartTime));
}

function updateDisplay(elapsedTime) {
    const hourDisplay = document.getElementById('hour');
    const minuteDisplay = document.getElementById('minute');
    const secondDisplay = document.getElementById('second');

    const hours = Math.floor(elapsedTime / 3600000);
    const minutes = Math.floor((elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);

    hourDisplay.textContent = formatTime(hours);
    minuteDisplay.textContent = formatTime(minutes);
    secondDisplay.textContent = formatTime(seconds);
}

function calculateElapsedTime(startTime) {
    return isPaused ? lapStartTime : Date.now() - startTime;
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}
