document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector(".login-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Simple validation
        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (password.length < 8) {
            alert("Password must be at least 8 characters long.");
            return;
        }

        // Here you can implement your login logic (e.g., API call)
        // For demonstration purposes, we'll simulate a successful login
        if (email === "user@example.com" && password === "password123") {
            alert("Login successful!");
            // Redirect to another page, e.g., dashboard
            window.location.href = "../index.html";
        } else {
            alert("Invalid email or password. Please try again.");
        }
    });

    function validateEmail(email) {
        // Simple email regex for validation
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});