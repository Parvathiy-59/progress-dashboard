// ---------------- TIMER ----------------
let time = 1500;
let timerInterval;

function startTimer() {
    if (timerInterval) return;

    timerInterval = setInterval(() => {
        time--;
        updateTimer();

        if (time <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            alert("Time's up!");
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
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    document.getElementById("timer").innerText =
        `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// ---------------- TASKS ----------------
function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (!text) return;

    const div = document.createElement("div");
    div.innerHTML = `
        <span onclick="toggleTask(this)">${text}</span>
        <button onclick="deleteTask(this)">X</button>
    `;

    document.getElementById("taskList").appendChild(div);

    saveTasks();
    input.value = "";
}

function toggleTask(el) {
    el.style.textDecoration =
        el.style.textDecoration === "line-through" ? "none" : "line-through";

    saveTasks();
}

function deleteTask(btn) {
    btn.parentElement.remove();
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList div").forEach(div => {
        const span = div.querySelector("span");

        tasks.push({
            text: span.innerText,
            done: span.style.textDecoration === "line-through"
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        const div = document.createElement("div");

        div.innerHTML = `
            <span style="text-decoration:${task.done ? "line-through" : "none"}"
            onclick="toggleTask(this)">
                ${task.text}
            </span>
            <button onclick="deleteTask(this)">X</button>
        `;

        document.getElementById("taskList").appendChild(div);
    });
}

// ---------------- FILE UPLOAD ----------------
document.getElementById("fileUpload").addEventListener("change", function () {
    const list = document.getElementById("fileList");
    list.innerHTML = "";

    Array.from(this.files).forEach(file => {
        const li = document.createElement("li");
        li.textContent = file.name;
        list.appendChild(li);
    });
});

// ---------------- PROFILE ----------------
document.getElementById("avatar").onclick = () => {
    document.getElementById("profilePic").click();
};

document.getElementById("profilePic").addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = e => {
            document.getElementById("avatar").src = e.target.result;
            localStorage.setItem("profilePic", e.target.result);
        };

        reader.readAsDataURL(file);
    }
});

// ---------------- LOAD ----------------
window.onload = () => {
    loadTasks();

    const savedPic = localStorage.getItem("profilePic");
    if (savedPic) {
        document.getElementById("avatar").src = savedPic;
    }
};
