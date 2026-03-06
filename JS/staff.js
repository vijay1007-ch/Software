
document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Staff JS Loaded");
    displayStaff();
});

let currentIndex = -1;

DataSync.init();

function displayStaff() {
    const staffList = DataSync.getStaff();
    const grid = document.getElementById("staffGrid");
    
    if (!grid) {
        console.error("❌ Grid not found!");
        return;
    }
    
    grid.innerHTML = "";
    
    if (staffList.length === 0) {
        grid.innerHTML = '<div class="no-data">No staff added. <a href="addstaff.html">Add first staff ➕</a></div>';
        return;
    }
    
    staffList.forEach((staff, index) => {
        const card = createStaffCard(staff, index);
        grid.appendChild(card);
    });
    
    console.log(`✅ ${staffList.length} staff displayed`);
}

function createStaffCard(staff, index) {
    const card = document.createElement('div');
    card.className = 'recent-staff-card';
    card.innerHTML = `
        <div class="staff-avatar">
            ${staff.photo ? `<img src="${staff.photo}" alt="${staff.name}">` : '👤'}
        </div>
        <div class="staff-info">
            <h4>${staff.name || 'Unnamed'}</h4>
            <p>${staff.project || 'N/A'} - ${staff.shift || 'N/A'}</p>
            <span class="staff-salary">₹${(staff.salary || 0).toLocaleString()}</span>
        </div>
        <div style="margin-left: auto; display: flex; gap: 10px;">
            <button onclick="viewStaff(${index})" style="background: rgba(78,205,196,0.2); color: #4ecdc4; border: 1px solid #4ecdc4; padding: 8px 15px; border-radius: 20px; cursor: pointer;">👁️ View</button>
            <button onclick="editStaff(${index})" style="background: rgba(255,193,7,0.2); color: #ffc107; border: 1px solid #ffc107; padding: 8px 15px; border-radius: 20px; cursor: pointer;">✏️ Edit</button>
            <button onclick="deleteStaff(${index})" style="background: rgba(255,107,107,0.2); color: #ff6b6b; border: 1px solid #ff6b6b; padding: 8px 15px; border-radius: 20px; cursor: pointer;">🗑️</button>
        </div>
    `;
    return card;
}

function viewStaff(index) {
    console.log(` Viewing staff ${index}`);
    const staffList = DataSync.getStaff();
    const staff = staffList[index];
    
    if (!staff) {
        alert("❌ Staff not found!");
        return;
    }
    
    document.getElementById("modalName").textContent = staff.name || 'N/A';
    document.getElementById("modalPhoto").src = staff.photo || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="%234ecdc4" width="100" height="100"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="40">👤</text></svg>';
    document.getElementById("modalContact").textContent = staff.contact || 'N/A';
    document.getElementById("modalGender").textContent = staff.gender || 'N/A';
    document.getElementById("modalAge").textContent = staff.age || 'N/A';
    document.getElementById("modalBlood").textContent = staff.blood || 'N/A';
    document.getElementById("modalDOB").textContent = staff.dob || 'N/A';
    document.getElementById("modalDOJ").textContent = staff.doj || 'N/A';
    document.getElementById("modalExperience").textContent = staff.experience || 'N/A';
    document.getElementById("modalProject").textContent = staff.project || 'N/A';
    document.getElementById("modalShift").textContent = staff.shift || 'N/A';
    document.getElementById("modalHealth").textContent = staff.health || 'N/A';
    document.getElementById("modalAllergies").textContent = staff.allergies || 'N/A';
    document.getElementById("modalSalary").textContent = `₹${(staff.salary || 0).toLocaleString()}`;
    
    currentIndex = index;
    document.getElementById("staffModal").style.display = "block";
    document.body.style.overflow = "hidden";
}

function editStaff(index) {
    console.log(`✏️ Editing staff ${index}`);
    const staffList = DataSync.getStaff();
    const staff = staffList[index];
    
    if (!staff) {
        alert("❌ Staff not found!");
        return;
    }
    
    window.location.href = `addstaff.html?edit=${staff.id}`;
}

function deleteStaff(index) {
    if (confirm("🗑️ Delete this staff member? This will also delete all their attendance and salary records.")) {
        const staffList = DataSync.getStaff();
        const staff = staffList[index];
        
        if (staff) {
            DataSync.deleteStaff(staff.id);
            displayStaff();
            alert("✅ Staff deleted successfully!");
        }
    }
}

function searchStaff() {
    const input = document.getElementById("search").value.toLowerCase();
    const cards = document.querySelectorAll("#staffGrid .recent-staff-card");
    
    cards.forEach((card) => {
        const name = card.querySelector("h4").textContent.toLowerCase();
        const info = card.querySelector(".staff-info").textContent.toLowerCase();
        
        card.style.display = (name.includes(input) || info.includes(input)) ? "flex" : "none";
    });
}

function closeModal() {
    document.getElementById("staffModal").style.display = "none";
    document.body.style.overflow = "auto";
}

window.onclick = function(event) {
    const modal = document.getElementById("staffModal");
    if (event.target === modal) closeModal();
}

window.viewStaff = viewStaff;
window.editStaff = editStaff;
window.deleteStaff = deleteStaff;
window.searchStaff = searchStaff;
window.closeModal = closeModal;
