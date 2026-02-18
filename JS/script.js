// script.js
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Simple hardcoded user for demo
  const validUser = {
    username: 'staff1',
    password: 'password123'
  };

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  const messageElem = document.getElementById('message');

  if (username === validUser.username && password === validUser.password) {
    messageElem.style.color = 'green';
    messageElem.textContent = 'Login successful! Redirecting...';
    // Here you can redirect or proceed after login
  } else {
    messageElem.style.color = 'red';
    messageElem.textContent = 'Invalid username or password.';
  }
});
