function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.text())
    .then(data => {
        const msg = document.getElementById("errorMsg");

        if (data === "Login successful") {
            msg.style.color = "green";
            msg.innerText = "Login successful! Redirecting...";

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);
        } else {
            msg.style.color = "red";
            msg.innerText = data;
        }
    });
}


/* REGISTER FUNCTION */
function register() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
    })
    .then(res => res.text())
    .then(data => {
        const msg = document.getElementById("errorMsg");

        if (data === "Registration successful") {
            msg.style.color = "green";
            msg.innerText = "Registered! Redirecting...";

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);
        } else {
            msg.style.color = "red";
            msg.innerText = data;
        }
    });
}