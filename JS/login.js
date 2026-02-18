document.addEventListener("DOMContentLoaded", function(){

    document.getElementById("loginForm").addEventListener("submit", function(e){
        e.preventDefault();

        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        authenticateUser(username, password);
    });

});

function authenticateUser(username, password){

    // Demo credentials
    let validUser = "admin";
    let validPass = "1234";

    if(username === validUser && password === validPass){
        alert("Login Successful!");
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid Username or Password");
    }
}

if (username === validUser.username && password === validUser.password) {
    messageElem.style.color = "green";
    messageElem.textContent = "Login successful! Redirecting...";

    setTimeout(() => {
        window.location.href = "dashboard.html";
    }, 1000);
}
