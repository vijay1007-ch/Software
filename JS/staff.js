document.addEventListener("DOMContentLoaded", function () {
    displayStaff();
});

function displayStaff() {

    const staffList = JSON.parse(localStorage.getItem("staffData")) || [];
    const table = document.getElementById("staffTableBody");
    table.innerHTML = "";

    staffList.forEach((staff, index) => {

        table.innerHTML += `
        <tr>
            <td>${staff.name}</td>
            <td>${staff.project}</td>
            <td>${staff.shift}</td>
            <td><button onclick="viewStaff(${index})">View</button></td>
        </tr>`;
    });
}

function viewStaff(index) {

    const staffList = JSON.parse(localStorage.getItem("staffData"));
    const staff = staffList[index];

    document.getElementById("modalPhoto").src = staff.photo;

    document.getElementById("details").innerHTML = `
        <p><b>Name:</b> ${staff.name}</p>
        <p><b>Contact:</b> ${staff.contact}</p>
        <p><b>Age:</b> ${staff.age}</p>
        <p><b>DOB:</b> ${staff.dob}</p>
        <p><b>DOJ:</b> ${staff.doj}</p>
        <p><b>Experience:</b> ${staff.experience}</p>
        <p><b>Project:</b> ${staff.project}</p>
        <p><b>Shift:</b> ${staff.shift}</p>
        <p><b>Health:</b> ${staff.health}</p>
        <p><b>Salary:</b> ₹ ${staff.salary}</p>
    `;

    document.getElementById("modal").style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function goAdd() {
    window.location.href = "addstaff.html";
}