// LOGIN SYSTEM
function login() {
    const user = document.getElementById("loginUser").value;
    const pass = document.getElementById("loginPass").value;

    if (user === "admin" && pass === "1234") {
        localStorage.setItem("loggedIn", "true");

        document.getElementById("loginPage").style.display = "none";
        document.getElementById("app").style.display = "block";
    } else {
        alert("Invalid credentials");
    }
}

function logout() {
    localStorage.removeItem("loggedIn");
    location.reload();
}

// CHECK LOGIN
window.onload = () => {
    if (localStorage.getItem("loggedIn") === "true") {
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("app").style.display = "block";
    }
};

// NAVIGATION
function showPage(page) {
    document.querySelectorAll(".page").forEach(p => p.style.display = "none");
    document.getElementById(page).style.display = "block";
}

// TIMER
let time = 1500;
let timer;

function startTimer() {
    if (timer) return;

    timer = setInterval(() => {
        time--;
        updateTimer();

        if (time <= 0) {
            clearInterval(timer);
            timer = null;
            alert("Session Complete!");
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timer = null;
    time = 1500;
    updateTimer();
}

function updateTimer() {
    let m = Math.floor(time / 60);
    let s = time % 60;

    document.getElementById("timer").innerText =
        `${m}:${s < 10 ? "0" : ""}${s}`;
}

// TASKS
function addTask() {
    const input = document.getElementById("taskInput");
    if (!input.value) return;

    const div = document.createElement("div");
    div.innerText = input.value;

    document.getElementById("taskList").appendChild(div);
    input.value = "";
}

// FILE UPLOAD
document.getElementById("fileUpload")?.addEventListener("change", function () {
    const list = document.getElementById("fileList");
    list.innerHTML = "";

    Array.from(this.files).forEach(file => {
        const li = document.createElement("li");
        li.textContent = file.name;
        list.appendChild(li);
    });
});
