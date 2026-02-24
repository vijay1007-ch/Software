/**
 * ISSNE - Signup Module
 */

document.addEventListener("DOMContentLoaded", function() {
    console.log("✅ Signup JS Loaded");
    
    const signupForm = document.getElementById("signupForm");
    
    if (signupForm) {
        signupForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;
            
            if (password !== confirmPassword) {
                alert("❌ Passwords do not match!");
                return;
            }
            
            // Store user (in a real app, this would go to a server)
            const users = JSON.parse(localStorage.getItem("users")) || [];
            
            // Check if username exists
            if (users.find(u => u.username === username)) {
                alert("❌ Username already exists!");
                return;
            }
            
            users.push({ username: username, password: password });
            localStorage.setItem("users", JSON.stringify(users));
            
            alert("✅ Account created successfully!");
            window.location.href = "loginpage.htm";
        });
    }
});
