/**
 * ISSNE - Attendance Module
 */

document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Attendance JS Loaded");
    
    // Initialize DataSync
    DataSync.init();
    
    // Update time
    updateTime();
    setInterval(updateTime, 1000);
    
    // Load staff dropdown
    loadStaffDropdown();
    
    // Load today's attendance
    displayTodayAttendance();
    
    // Update stats
    updateStats();
});

// Update current time
function updateTime() {
    const now = new Date();
    const timeEl = document.getElementById("currentTime");
    const dateEl = document.getElementById("currentDate");
    
    if (timeEl) timeEl.textContent = now.toLocaleTimeString();
    if (dateEl) dateEl.textContent = now.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function loadStaffDropdown() {
    const staff = DataSync.getStaff();
    const select = document.getElementById("attendanceStaffSelect");
    const deleteSelect = document.getElementById("deleteStaffSelect");
    
    // Clear existing options (except first)
    if (select) {
        select.innerHTML = '<option value="">-- Select Staff --</option>';
        staff.forEach(s => {
            const option = document.createElement("option");
            option.value = s.id;
            option.textContent = s.name;
            select.appendChild(option);
        });
    }
    
    if (deleteSelect) {
        deleteSelect.innerHTML = '<option value="">Select Staff to Delete</option>';
        staff.forEach(s => {
            const option = document.createElement("option");
            option.value = s.id;
            option.textContent = s.name;
            deleteSelect.appendChild(option);
        });
    }
}

function clockIn() {
    const staffId = document.getElementById("attendanceStaffSelect").value;
    
    if (!staffId) {
        alert("Please select a staff member!");
        return;
    }
    
    const staff = DataSync.getStaff().find(s => s.id == staffId);
    if (!staff) return;
    
    const today = new Date().toISOString().split('T')[0];
    const time = new Date().toLocaleTimeString();
    
    let attendance = DataSync.getAttendance();
    
    // Check if already clocked in
    const existing = attendance.find(a => a.staffId == staffId && a.date === today && a.clockIn);
    if (existing) {
        alert("You have already clocked in today!");
        return;
    }
    
    // Add new attendance record
    attendance.push({
        id: Date.now(),
        staffId: staffId,
        staffName: staff.name,
        date: today,
        clockIn: time,
        clockOut: null
    });
    
    localStorage.setItem("attendanceData", JSON.stringify(attendance));
    
    document.getElementById("clockInBtn").disabled = true;
    document.getElementById("clockOutBtn").disabled = false;
    
    document.getElementById("statusMessage").innerHTML = 
        `<span style="color: #4ecdc4;">✅ Clocked in at ${time}</span>`;
    
    displayTodayAttendance();
    updateStats();
}

function clockOut() {
    const staffId = document.getElementById("attendanceStaffSelect").value;
    
    if (!staffId) {
        alert("Please select a staff member!");
        return;
    }
    
    const today = new Date().toISOString().split('T')[0];
    const time = new Date().toLocaleTimeString();
    
    let attendance = DataSync.getAttendance();
    
    // Find today's record
    const record = attendance.find(a => a.staffId == staffId && a.date === today && a.clockIn && !a.clockOut);
    
    if (!record) {
        alert("You haven't clocked in today!");
        return;
    }
    
    record.clockOut = time;
    
    localStorage.setItem("attendanceData", JSON.stringify(attendance));
    
    document.getElementById("clockInBtn").disabled = false;
    document.getElementById("clockOutBtn").disabled = true;
    
    document.getElementById("statusMessage").innerHTML = 
        `<span style="color: #ff6b6b;">⏹️ Clocked out at ${time}</span>`;
    
    displayTodayAttendance();
    updateStats();
}

function displayTodayAttendance() {
    const today = new Date().toISOString().split('T')[0];
    const attendance = DataSync.getAttendance().filter(a => a.date === today);
    const staff = DataSync.getStaff();
    
    const grid = document.getElementById("todayAttendanceTable");
    if (!grid) return;
    
    if (attendance.length === 0) {
        grid.innerHTML = '<div class="no-data">No attendance records for today.</div>';
        return;
    }
    
    grid.innerHTML = attendance.map(record => {
        const staffMember = staff.find(s => s.id == record.staffId);
        return `
            <div class="recent-staff-card">
                <div class="staff-avatar">👤</div>
                <div class="staff-info">
                    <h4>${record.staffName || 'Unknown'}</h4>
                    <p>▶️ In: ${record.clockIn || 'N/A'}</p>
                    <p>⏹️ Out: ${record.clockOut || 'Working...'}</p>
                </div>
                <div style="margin-left: auto;">
                    <span class="staff-salary" style="padding: 5px 15px; border-radius: 20px; background: ${record.clockOut ? 'rgba(166,227,161,0.3)' : 'rgba(249,202,36,0.3)'};">
                        ${record.clockOut ? '✅ Completed' : '🔄 In Progress'}
                    </span>
                </div>
            </div>
        `;
    }).join('');
}

function updateStats() {
    const staff = DataSync.getStaff();
    const today = new Date().toISOString().split('T')[0];
    const attendance = DataSync.getAttendance().filter(a => a.date === today);
    
    const present = attendance.length;
    const absent = staff.length - present;
    
    document.getElementById("presentCount").textContent = present;
    document.getElementById("absentCount").textContent = absent;
    document.getElementById("totalStaffCount").textContent = staff.length;
}

function deleteStaffSecure() {
    const staffId = document.getElementById("deleteStaffSelect").value;
    const adminKey = document.getElementById("adminKey").value;
    const settings = DataSync.getSettings();
    
    if (!staffId) {
        alert("Please select a staff member!");
        return;
    }
    
    if (adminKey !== settings?.adminKey && adminKey !== "admin123") {
        alert("❌ Incorrect Admin Key!");
        return;
    }
    
    if (confirm("⚠️ This will permanently delete the staff and ALL their data. Continue?")) {
        DataSync.deleteStaff(staffId);
        
        // Reload dropdowns
        loadStaffDropdown();
        
        // Reload attendance
        displayTodayAttendance();
        updateStats();
        
        alert("✅ Staff deleted successfully!");
    }
}

// Global functions
window.clockIn = clockIn;
window.clockOut = clockOut;
window.deleteStaffSecure = deleteStaffSecure;
