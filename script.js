let time = 1500;
let timerInterval;

function login() {
    const username = document.getElementById('loginUsername').value.trim();
    if (!username) return alert('Please enter your name');

    localStorage.setItem('studyhubUser', username);
    document.getElementById('loginPage').classList.remove('active');
    document.getElementById('appPage').classList.add('active');
    document.getElementById('welcomeText').innerText = `Welcome, ${username} 👋`;
    document.getElementById('username').value = username;
}

function logout() {
    document.getElementById('appPage').classList.remove('active');
    document.getElementById('loginPage').classList.add('active');
}

function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active-section');
    });
    document.getElementById(sectionId).classList.add('active-section');
    updateAnalytics();
}

function startTimer() {
    if (timerInterval) return;
    timerInterval = setInterval(() => {
        time--;
        updateTimer();
        if (time <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            alert("Session completed!");
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    time = 1500;
    updateTimer();
}

function updateTimer() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    document.getElementById('timer').innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();
    if (!text) return;

    const div = document.createElement('div');
    div.innerHTML = `<span onclick="toggleTask(this)">${text}</span><button onclick="deleteTask(this)">X</button>`;
    document.getElementById('taskList').appendChild(div);
    input.value = '';
    saveTasks();
    updateAnalytics();
}

function toggleTask(el) {
    el.style.textDecoration = el.style.textDecoration === 'line-through' ? 'none' : 'line-through';
    saveTasks();
    updateAnalytics();
}

function deleteTask(btn) {
    btn.parentElement.remove();
    saveTasks();
    updateAnalytics();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList div').forEach(div => {
        const span = div.querySelector('span');
        tasks.push({
            text: span.innerText,
            done: span.style.textDecoration === 'line-through'
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const div = document.createElement('div');
        div.innerHTML = `<span style="text-decoration:${task.done ? 'line-through' : 'none'}" onclick="toggleTask(this)">${task.text}</span><button onclick="deleteTask(this)">X</button>`;
        document.getElementById('taskList').appendChild(div);
    });
    updateAnalytics();
}

function updateAnalytics() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const completed = tasks.filter(task => task.done).length;
    document.getElementById('totalTasks').innerText = tasks.length;
    document.getElementById('analyticsCompleted').innerText = completed;
    document.getElementById('completedCount').innerText = completed;
    document.getElementById('completionRate').innerText = tasks.length ? Math.round((completed / tasks.length) * 100) + '%' : '0%';
}

document.getElementById('fileUpload').addEventListener('change', function () {
    const list = document.getElementById('fileList');
    list.innerHTML = '';
    Array.from(this.files).forEach(file => {
        const li = document.createElement('li');
        li.textContent = file.name;
        list.appendChild(li);
    });
});

document.getElementById('avatar').onclick = () => document.getElementById('profilePic').click();

document.getElementById('profilePic').addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = e => {
            document.getElementById('avatar').src = e.target.result;
            localStorage.setItem('profilePic', e.target.result);
        };
        reader.readAsDataURL(file);
    }
});

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

window.onload = () => {
    loadTasks();
    const savedUser = localStorage.getItem('studyhubUser');
    const savedPic = localStorage.getItem('profilePic');

    if (savedUser) {
        document.getElementById('loginPage').classList.remove('active');
        document.getElementById('appPage').classList.add('active');
        document.getElementById('welcomeText').innerText = `Welcome, ${savedUser} 👋`;
        document.getElementById('username').value = savedUser;
    } else {
        document.getElementById('loginPage').classList.add('active');
    }

    if (savedPic) document.getElementById('avatar').src = savedPic;
};

