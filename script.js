// LOGIN
function login() {
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;

    if (user === "admin" && pass === "1234") {
        localStorage.setItem("login", "true");
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("app").style.display = "flex";
    } else {
        alert("Invalid Login");
    }
}

function logout() {
    localStorage.removeItem("login");
    location.reload();
}

window.onload = () => {
    if (localStorage.getItem("login")) {
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("app").style.display = "flex";
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
        update();

        if (time <= 0) {
            clearInterval(timer);
            timer = null;
            alert("Done!");
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timer = null;
    time = 1500;
    update();
}

function update() {
    let m = Math.floor(time / 60);
    let s = time % 60;
    document.getElementById("timer").innerText =
        `${m}:${s < 10 ? "0" : ""}${s}`;
}

// TASKS
function addTask() {
    const input = document.getElementById("taskInput") || document.getElementById("taskInput2");
    if (!input.value) return;

    const div = document.createElement("div");
    div.innerText = input.value;

    document.getElementById("taskList").appendChild(div);
    input.value = "";
}

// FILES
document.getElementById("fileUpload")?.addEventListener("change", function () {
    const list = document.getElementById("fileList");
    list.innerHTML = "";

    Array.from(this.files).forEach(file => {
        const li = document.createElement("li");
        li.textContent = file.name;
        list.appendChild(li);
    });
});
