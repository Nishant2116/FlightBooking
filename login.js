document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission to server

  console.log('Form submission attempt detected');
  // Capture the form values
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const usernameError = document.getElementById("usernameError");
  const passwordError = document.getElementById("passwordError");

  // Reset error messages
  usernameError.style.display = "none";
  passwordError.style.display = "none";

  // Dummy hardcoded user credentials (replace this with backend API validation in production)
  const validUsers = [
      { username: "shweta@admin.com", password: "Admin@123", role: "admin" },
      { username: "customerUser", password: "Customer123$", role: "customer" },
      { username: "shwet_1606", password: "shweta@2116", role: "customer" }
  ];

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

  // Validation for username
  if (!username) {
      usernameError.textContent = "Please enter your username or email.";
      usernameError.style.display = "block";
      isValid = false;
  } else if (!isValidEmail(username)) {
      usernameError.textContent = "Please enter a valid email address.";
      usernameError.style.display = "block";
      isValid = false;
  }

  // Validation for password
  if (!password) {
      passwordError.textContent = "Please enter your password.";
      passwordError.style.display = "block";
      isValid = false;
  } else if (!isValidPassword(password)) {
      passwordError.textContent = "Password must include at least one uppercase letter, one lowercase letter, one numeral, and one special character. No spaces allowed.";
      passwordError.style.display = "block";
      isValid = false;
  }

  if (isValid) {
      // Check if credentials are valid
      const user = validUsers.find(u => u.username === username && u.password === password);

      if (user) {
          // Store user details in localStorage
          localStorage.setItem("username", username); // Store the username
          localStorage.setItem("userRole", user.role);  // Store user role (admin/customer)

          // Redirect based on user role
          if (user.role === "admin") {
              window.location.href = "index.html"; // Redirect to admin dashboard
          } else if (user.role === "customer") {
            //   window.location.href = "../html/customer_home.html"; // Redirect to customer home page
              window.location.href = "index.html"; // Redirect to customer home page
          }
      } else {
          usernameError.textContent = "Invalid username or password.";
          usernameError.style.display = "block";
      }
  }
});
