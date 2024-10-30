document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.querySelector(".register-form"); // Updated selector to match your form class
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    registerForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Simple validation
        if (name === "") {
            alert("Please enter your name.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (password.length < 8) {
            alert("Password must be at least 8 characters long.");
            return;
        }

        // Here you can implement your registration logic (e.g., API call)
        // For demonstration purposes, we'll simulate a successful registration
        alert("Registration successful! Welcome, " + name + "!");
        
        // Redirect to login page after successful registration (optional)
        window.location.href = "login.html"; // Updated path to the login page
    });

    function validateEmail(email) {
        // Simple email regex for validation
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});
