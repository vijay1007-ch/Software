let staffList = JSON.parse(localStorage.getItem("staffData")) || [];
let editIndex = -1;

document.addEventListener("DOMContentLoaded", function(){
    displayStaff();

    document.getElementById("staffForm").addEventListener("submit", function(e){
        e.preventDefault();

        let name = document.getElementById("name").value;
        let role = document.getElementById("role").value;
        let age = document.getElementById("age").value;
        let gender = document.getElementById("gender").value;
        let salary = document.getElementById("salary").value;

        let performance = calculatePerformance(age, salary);

        let staff = { name, role, age, gender, salary, performance };

        if(editIndex === -1){
            staffList.push(staff);
        } else {
            staffList[editIndex] = staff;
            editIndex = -1;
        }

        localStorage.setItem("staffData", JSON.stringify(staffList));
        displayStaff();
        this.reset();
    });
});

function displayStaff(){
    let tbody = document.querySelector("#staffTable tbody");
    tbody.innerHTML = "";

    staffList.forEach((staff, index) => {
        addRow(staff, index);
    });
}

function calculatePerformance(age, salary){
    if(salary > 500) return "Excellent";
    if(salary > 300) return "Good";
    return "Average";
}

function deleteStaff(index){
    staffList.splice(index, 1);
    localStorage.setItem("staffData", JSON.stringify(staffList));
    displayStaff();
}

function editStaff(index){
    let staff = staffList[index];

    document.getElementById("name").value = staff.name;
    document.getElementById("role").value = staff.role;
    document.getElementById("age").value = staff.age;
    document.getElementById("gender").value = staff.gender;
    document.getElementById("salary").value = staff.salary;

    editIndex = index;
}

function searchStaff() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let tbody = document.querySelector("#staffTable tbody");
    tbody.innerHTML = "";

    staffList.forEach((staff, index) => {
        if(staff.name.toLowerCase().includes(input)) {
            addRow(staff, index);
        }
    });
}

function filterByGender(gender){
    let tbody = document.querySelector("#staffTable tbody");
    tbody.innerHTML = "";

    staffList.forEach((staff, index) => {
        if(gender === "" || staff.gender === gender){
            addRow(staff, index);
        }
    });
}

function sortBySalary(){
    staffList.sort((a,b) => a.salary - b.salary);
    localStorage.setItem("staffData", JSON.stringify(staffList));
    displayStaff();
}

function sortByAge(){
    staffList.sort((a,b) => a.age - b.age);
    localStorage.setItem("staffData", JSON.stringify(staffList));
    displayStaff();
}

function addRow(staff, index){
    let tbody = document.querySelector("#staffTable tbody");
    let row = `
        <tr>
            <td>${staff.name}</td>
            <td>${staff.role}</td>
            <td>${staff.age}</td>
            <td>${staff.gender}</td>
            <td>₹ ${staff.salary}</td>
            <td>${staff.performance}</td>
            <td>
                <button onclick="editStaff(${index})">Edit</button>
                <button onclick="deleteStaff(${index})">Delete</button>
            </td>
        </tr>
    `;
    tbody.innerHTML += row;
}
