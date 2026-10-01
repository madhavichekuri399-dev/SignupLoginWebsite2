// ================================
// Signup Form Validation
// ================================

const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const password = document.getElementById("password").value;
        const confirmPassword =
            document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            alert("Password and Confirm Password do not match.");
            return;
        }

        alert("Signup form submitted successfully!");
    });
}


// ================================
// Login Form
// ================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        alert("Login form submitted successfully!");
    });
}


// ================================
// Google Login
// ================================

const googleLogin = document.getElementById("googleLogin");

if (googleLogin) {
    googleLogin.addEventListener("click", function () {

        window.location.href = "http://127.0.0.1:8000/auth/login";

    });
}