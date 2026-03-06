/**
 * ISSNE - Add Staff Module
 */

document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Add Staff JS Loaded");

    const form = document.getElementById("staffForm");
    const dob = document.getElementById("dob");
    const doj = document.getElementById("doj");
    const age = document.getElementById("age");
    const exp = document.getElementById("experience");

    // Check if editing
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');
    
    if (editId) {
        loadStaffForEdit(editId);
    }

    // Age Calculation
    if (dob) {
        dob.addEventListener("change", function () {
            const birth = new Date(this.value);
            const today = new Date();

            let calculatedAge = today.getFullYear() - birth.getFullYear();
            if (
                today.getMonth() < birth.getMonth() ||
                (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
            ) {
                calculatedAge--;
            }

            if (age) age.value = calculatedAge;
        });
    }

    // Experience Calculation
    if (doj) {
        doj.addEventListener("change", function () {
            const join = new Date(this.value);
            const today = new Date();

            let years = today.getFullYear() - join.getFullYear();
            if (years < 0) years = 0;

            if (exp) exp.value = years + " Years";
        });
    }

    // Form Submit
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const staff = {
                id: editId ? parseInt(editId) : Date.now(),
                name: document.getElementById("name").value,
                contact: document.getElementById("contact").value,
                gender: document.getElementById("gender").value,
                blood: document.getElementById("blood").value,
                age: age?.value || '',
                dob: dob?.value || '',
                doj: doj?.value || '',
                experience: exp?.value || '',
                project: document.getElementById("project").value,
                shift: document.getElementById("shift").value,
                health: document.getElementById("health").value,
                medical: document.getElementById("medical").value,
                allergies: document.getElementById("allergies").value,
                salary: document.getElementById("salary").value
            };

            if (editId) {
                DataSync.updateStaff(staff);
                alert("✅ Staff updated successfully!");
            } else {
                DataSync.addStaff(staff);
                alert("✅ Staff added successfully!");
            }

            window.location.href = "staff.html";
        });
    }
});

function loadStaffForEdit(editId) {
    const staff = DataSync.getStaff().find(s => s.id == editId);
    if (!staff) return;

    document.getElementById("name").value = staff.name || '';
    document.getElementById("contact").value = staff.contact || '';
    document.getElementById("gender").value = staff.gender || '';
    document.getElementById("blood").value = staff.blood || '';
    document.getElementById("dob").value = staff.dob || '';
    document.getElementById("doj").value = staff.doj || '';
    document.getElementById("project").value = staff.project || '';
    document.getElementById("shift").value = staff.shift || '';
    document.getElementById("health").value = staff.health || '';
    document.getElementById("medical").value = staff.medical || '';
    document.getElementById("allergies").value = staff.allergies || '';
    document.getElementById("salary").value = staff.salary || '';
    document.getElementById("age").value = staff.age || '';
    document.getElementById("experience").value = staff.experience || '';
}
