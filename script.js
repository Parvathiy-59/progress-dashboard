// LOGIN SYSTEM
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "1234") {
        localStorage.setItem("isLoggedIn", "true");
        showMainMenu();
    } else {
        alert("Invalid Login");
    }
}

function logout() {
    localStorage.removeItem("isLoggedIn");
    location.reload();
}

function checkLogin() {
    if (localStorage.getItem("isLoggedIn") === "true") {
        showMainMenu();
    }
}

// SHOW MAIN MENU
function showMainMenu() {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("mainMenu").style.display = "block";
}

// NAVIGATION
function showPage(pageId) {
    document.querySelectorAll(".page").forEach(p => p.style.display = "none");
    document.getElementById(pageId).style.display = "block";
}

// INIT
window.onload = checkLogin;
