document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const user = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      mobile: document.getElementById("mobile").value,
      dob: document.getElementById("dob").value,
      city: document.getElementById("city").value,
      address: document.getElementById("address").value,
      username: document.getElementById("regUsername").value,
      password: document.getElementById("regPassword").value,
    };
  
    // Simulate AJAX POST using fetch (dummy POST endpoint)
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(response => response.json()).then(() => {
      // Save to localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registration successful!");
      document.getElementById("registerForm").reset();
    });
  });
  
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    const users = JSON.parse(localStorage.getItem("users") || "[]");
  
    const userFound = users.find(user => user.username === username && user.password === password);
    if (userFound) {
      alert("Login successful!");
      window.location.href = "users.html";
    } else {
      alert("Invalid credentials.");
    }
  });
  