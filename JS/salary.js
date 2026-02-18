document.addEventListener("DOMContentLoaded", function(){

    let staffList = JSON.parse(localStorage.getItem("staffData")) || [];
    let attendanceList = JSON.parse(localStorage.getItem("attendanceData")) || [];

    let table = document.getElementById("salaryTable");
    table.innerHTML = "";

    staffList.forEach(staff => {

        let totalHours = 0;

        attendanceList.forEach(record => {
            if(record.name === staff.name){
                totalHours += Number(record.hours);
            }
        });

        let totalSalary = totalHours * Number(staff.salary);

        let overtime = totalHours > 160 ? "Yes" : "No";

        let performance = totalHours >= 160 ? "Excellent" :
                          totalHours >= 120 ? "Good" :
                          "Needs Improvement";

        let row = `
            <tr>
                <td>${staff.name}</td>
                <td>${totalHours.toFixed(2)}</td>
                <td>₹ ${totalSalary.toLocaleString("en-IN")}</td>
                <td>${overtime}</td>
                <td>${performance}</td>
            </tr>
        `;

        table.innerHTML += row;
    });

});
