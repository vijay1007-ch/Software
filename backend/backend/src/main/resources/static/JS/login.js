document.addEventListener("DOMContentLoaded", function() {
    console.log("✅ Login JS Loaded");
    
    const loginForm = document.getElementById("loginForm");
    
    if (loginForm) {
        loginForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            
            authenticateUser(username, password);
        });
    }
});

function authenticateUser(username, password) {
 
    const validUser = "admin";
    const validPass = "1234";
    
    if (username === validUser && password === validPass) {
        
        localStorage.setItem('currentUser', JSON.stringify({
            username: username,
            loginTime: new Date().toISOString()
        }));
        
        alert("✅ Login Successful!");
        window.location.href = "dashboard.html";
    } else {
        alert("❌ Invalid Username or Password");
    }
}
