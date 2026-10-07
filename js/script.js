// Signup Form Validation

const signupForm = document.getElementById("signupForm");
console.log("NEW script.js loaded");
if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            alert("Password and Confirm Password do not match.");
            return;
        }

        const email = document.getElementById("email").value;
        localStorage.setItem("userEmail", email);

        const profilePicture = document.getElementById("profilePicture");
        const file = profilePicture.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function () {
                localStorage.setItem("profilePicture", reader.result);
                alert("Signup form submitted successfully!");
            };

            reader.readAsDataURL(file);
        } else {
            alert("Signup form submitted successfully!");
        }
    });
}


// Login Form

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        alert("Login form submitted successfully!");
    });
}


// Google Login

const googleLogin = document.getElementById("googleLogin");

if (googleLogin) {
    googleLogin.addEventListener("click", function () {
        window.location.href = "http://127.0.0.1:8000/auth/login";
    });
}