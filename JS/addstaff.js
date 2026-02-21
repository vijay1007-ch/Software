document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("staffForm");
    const dob = document.getElementById("dob");
    const doj = document.getElementById("doj");
    const age = document.getElementById("age");
    const exp = document.getElementById("experience");

    dob.addEventListener("change", function () {

        const birth = new Date(this.value);
        const now = new Date();

        let calculatedAge = now.getFullYear() - birth.getFullYear();
        const m = now.getMonth() - birth.getMonth();

        if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
            calculatedAge--;
        }

        if (calculatedAge < 18 || calculatedAge > 55) {
            alert("Age must be between 18 and 55");
            age.value = "";
            return;
        }

        age.value = calculatedAge;
    });

    doj.addEventListener("change", function () {

        const join = new Date(this.value);
        const now = new Date();

        let years = now.getFullYear() - join.getFullYear();
        exp.value = years + " Years";
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const reader = new FileReader();
        const photoInput = document.getElementById("photo");

        if (photoInput.files.length > 0) {
            reader.onload = function (event) {
                saveData(event.target.result);
            };
            reader.readAsDataURL(photoInput.files[0]);
        } else {
            saveData("");
        }

        function saveData(photo) {

            let staffList = JSON.parse(localStorage.getItem("staffData")) || [];

            const staff = {
                name: name.value,
                contact: contact.value,
                age: age.value,
                dob: dob.value,
                doj: doj.value,
                experience: exp.value,
                project: project.value,
                shift: shift.value,
                health: health.value,
                salary: salary.value,
                photo: photo
            };

            staffList.push(staff);

            localStorage.setItem("staffData", JSON.stringify(staffList));

            alert("Staff Added Successfully");
            window.location.href = "staff.html";
        }

    });

});

function goStaff() {
    window.location.href = "staff.html";
}