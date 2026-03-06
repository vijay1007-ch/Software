document.addEventListener("DOMContentLoaded", function() {
    console.log("✅ Login JS Loaded");
    
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const submitBtn = loginForm.querySelector(".btn-primary");
    
    [usernameInput, passwordInput].forEach(input => {
        input.addEventListener("focus", function() {
            this.parentElement.style.transform = "scale(1.02)";
            this.parentElement.style.transition = "transform 0.3s ease";
        });
        input.addEventListener("blur", function() {
            this.parentElement.style.transform = "scale(1)";
        });
    });
    
    if (loginForm) {
        loginForm.addEventListener("submit", async function(e) {
            e.preventDefault();
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();
            submitBtn.classList.add("btn-loading");
            submitBtn.textContent = "Validating";
            
            try {
                await authenticateUser(username, password);
            } catch (error) {
                console.error("Login error:", error);
            } finally {
                submitBtn.classList.remove("btn-loading");
                submitBtn.textContent = "Login";
            }
        });
    }
});

async function authenticateUser(username, password) {
    const loginBox = document.querySelector(".login-box");
    
    if (username === "admin" && password === "1234") {
        localStorage.setItem('currentUser', JSON.stringify({
            username: username, role: "admin", loginTime: new Date().toISOString()
        }));
        showSuccess("Dashboard access granted!", "dashboard.html");
        return;
    }
    
    const mockStaff = [
        { id: "STF001", password: "1234", name: "John Doe", status: "Present" },
        { id: "STF002", password: "abcd", name: "Jane Smith", status: "Absent" }
    ];
    
    const staff = mockStaff.find(s => s.id === username && s.password === password);
    if (staff) {
        localStorage.setItem('currentUser', JSON.stringify({
            username: staff.id, role: "staff", fullName: staff.name, loginTime: new Date().toISOString()
        }));
        showSuccess("Staff portal access granted!", `/HTML/staff-view.html?staffId=${staff.id}`);
        return;
    }
    
  
    loginBox.classList.add("shake");
    setTimeout(() => loginBox.classList.remove("shake"), 500);
    alert("❌ Invalid Username or Password");
}


function showSuccess(message, redirectUrl) {
    const loginBox = document.querySelector(".login-box");
    loginBox.style.animation = "slideUp 0.5s ease-out";
    loginBox.innerHTML = `
        <div class="success-container">
            <div class="success-icon">✅</div>
            <h2 class="success-title">Login Successful!</h2>
            <p class="success-message">${message}</p>
        </div>
    `;
    setTimeout(() => { window.location.href = redirectUrl; }, 1500);
}
