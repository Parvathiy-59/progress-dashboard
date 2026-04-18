// Timer State
let timeLeft = 1500; // 25 minutes
let timerId = null;
let isRunning = false;
let mode = 'focus'; // 'focus' or 'break'

const timerDisplay = document.getElementById('timer');
const timerStatus = document.getElementById('timer-status');
const controlBtn = document.getElementById('controlBtn');
const resetBtn = document.getElementById('resetBtn');
const progressCircle = document.getElementById('timer-progress');

// Progress Ring Configuration
const RADIUS = 90;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
progressCircle.style.strokeDasharray = CIRCUMFERENCE;

function setProgress(percent) {
    const offset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;
    progressCircle.style.strokeDashoffset = offset;
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const displayString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timerDisplay.textContent = displayString;
    document.title = `${displayString} - StudySprint`;
    
    // Update progress ring
    const totalTime = mode === 'focus' ? 1500 : 300;
    const percent = ((totalTime - timeLeft) / totalTime) * 100;
    setProgress(percent);
}

function startTimer() {
    if (isRunning) {
        clearInterval(timerId);
        controlBtn.textContent = 'Resume Session';
        isRunning = false;
    } else {
        isRunning = true;
        controlBtn.textContent = 'Pause Session';
        timerId = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            
            if (timeLeft <= 0) {
                clearInterval(timerId);
                handleTimerComplete();
            }
        }, 1000);
    }
}

function handleTimerComplete() {
    isRunning = false;
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audio.play().catch(e => console.log('Audio play blocked'));
    
    if (mode === 'focus') {
        alert('Focus session complete! Take a break. ☕');
        mode = 'break';
        timeLeft = 300; // 5 minute break
        timerStatus.textContent = 'Break';
        timerStatus.style.color = 'var(--success)';
        progressCircle.style.stroke = 'var(--success)';
    } else {
        alert('Break finished! Ready to focus? 🚀');
        mode = 'focus';
        timeLeft = 1500;
        timerStatus.textContent = 'Focus';
        timerStatus.style.color = 'var(--text-secondary)';
        progressCircle.style.stroke = 'var(--accent)';
    }
    
    controlBtn.textContent = 'Start Session';
    updateTimerDisplay();
}

function resetTimer() {
    clearInterval(timerId);
    isRunning = false;
    mode = 'focus';
    timeLeft = 1500;
    timerStatus.textContent = 'Focus';
    controlBtn.textContent = 'Start Session';
    updateTimerDisplay();
}

// Event Listeners
controlBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

// Initialize
updateTimerDisplay();

// Navigation highlights
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        navItems.forEach(n => n.classList.remove('active'));
        item.classList.add('active');
    });
});
