function validateForm() {
    let pass = document.getElementById("password").value;
    let confirm = document.getElementById("confirmPassword").value;
    let message = document.getElementById("message");

    if(pass !== confirm) {
        message.style.color = "red";
        message.innerText = "Passwords do not match!";
        return false;
    }

    message.style.color = "lightgreen";
    message.innerText = "Account created successfully!";
    return false; // demo purpose
}