document.addEventListener("DOMContentLoaded", function(){

    let staffList = JSON.parse(localStorage.getItem("staffData")) || [];
    let attendanceList = JSON.parse(localStorage.getItem("attendanceData")) || [];

    let staffSelect = document.getElementById("staffSelect");

    // Populate staff dropdown
    staffList.forEach(staff => {
        let option = document.createElement("option");
        option.value = staff.name;
        option.textContent = staff.name;
        staffSelect.appendChild(option);
    });

    displayAttendance();

    document.getElementById("attendanceForm").addEventListener("submit", function(e){
        e.preventDefault();

        let name = staffSelect.value;
        let date = document.getElementById("date").value;
        let login = document.getElementById("loginTime").value;
        let logout = document.getElementById("logoutTime").value;

        let hours = calculateHours(login, logout);

        let record = { name, date, hours };

        attendanceList.push(record);
        localStorage.setItem("attendanceData", JSON.stringify(attendanceList));

        displayAttendance();
        this.reset();
    });

    function calculateHours(login, logout){
        let loginTime = new Date("1970-01-01T" + login);
        let logoutTime = new Date("1970-01-01T" + logout);

        let diff = (logoutTime - loginTime) / (1000 * 60 * 60);
        return diff.toFixed(2);
    }

    function displayAttendance(){
        let table = document.getElementById("attendanceTable");
        table.innerHTML = "";

        attendanceList.forEach(record => {
            let row = `
                <tr>
                    <td>${record.name}</td>
                    <td>${record.date}</td>
                    <td>${record.hours}</td>
                </tr>
            `;
            table.innerHTML += row;
        });
    }

});
