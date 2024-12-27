document.getElementById("signupForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission to server

    console.log('Signup form submission attempt detected');

    // Capture the form values
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const contactNumber = document.getElementById("contactNumber").value.trim();
    const gender = document.getElementById("gender").value;
    const dob = document.getElementById("dob").value;
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const securityQuestion = document.getElementById("securityQuestion").value;
    const securityAnswer = document.getElementById("securityAnswer").value.trim();

    // Error message elements
    const fullNameError = document.getElementById("fullNameError");
    const emailError = document.getElementById("emailError");
    const contactNumberError = document.getElementById("contactNumberError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    const securityAnswerError = document.getElementById("securityAnswerError");

    // Reset error messages
    fullNameError.style.display = "none";
    emailError.style.display = "none";
    contactNumberError.style.display = "none";
    passwordError.style.display = "none";
    confirmPasswordError.style.display = "none";
    securityAnswerError.style.display = "none";

    let isValid = true;

    // Utility function to validate email format
    function isValidEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    // Utility function to validate password requirements
    function isValidPassword(password) {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!?@#$%^&*_\-+()[\]{}><\/\\|"'.,:;])[^\s]{8,128}$/;
        return passwordPattern.test(password);
    }

    // Validation for full name
    if (!fullName) {
        fullNameError.textContent = "Full Name is required.";
        fullNameError.style.display = "block";
        isValid = false;
    }

    // Validation for email
    if (!email) {
        emailError.textContent = "Email is required.";
        emailError.style.display = "block";
        isValid = false;
    } else if (!isValidEmail(email)) {
        emailError.textContent = "Please enter a valid email address.";
        emailError.style.display = "block";
        isValid = false;
    }

    // Validation for contact number
    if (!contactNumber) {
        contactNumberError.textContent = "Contact Number is required.";
        contactNumberError.style.display = "block";
        isValid = false;
    } else if (!/^\d{10}$/.test(contactNumber)) {
        contactNumberError.textContent = "Contact Number must be exactly 10 digits.";
        contactNumberError.style.display = "block";
        isValid = false;
    }

    // Validation for password
    if (!password) {
        passwordError.textContent = "Password is required.";
        passwordError.style.display = "block";
        isValid = false;
    } else if (!isValidPassword(password)) {
        passwordError.textContent = "Password must include at least one uppercase letter, one lowercase letter, one numeral, and one special character. No spaces allowed.";
        passwordError.style.display = "block";
        isValid = false;
    }

    // Validation for confirm password
    if (password !== confirmPassword) {
        confirmPasswordError.textContent = "Passwords do not match.";
        confirmPasswordError.style.display = "block";
        isValid = false;
    }

    // Validation for security answer
    if (!securityAnswer) {
        securityAnswerError.textContent = "Security Answer is required.";
        securityAnswerError.style.display = "block";
        isValid = false;
    }

    if (isValid) {
        // Prepare user data
        const newUser = {
            fullName,
            email,
            contactNumber,
            gender,
            dob,
            password,
            securityQuestion,
            securityAnswer
        };

        // Retrieve existing users from localStorage
        const users = JSON.parse(localStorage.getItem("users") || "[]");

        // Check if email is already registered
        const emailExists = users.some(user => user.email === email);
        if (emailExists) {
            emailError.textContent = "This email is already registered.";
            emailError.style.display = "block";
            return;
        }

        // Save the new user to localStorage
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        alert("Sign-up successful!");
        document.getElementById("signupForm").reset(); // Reset the form
    }
});
