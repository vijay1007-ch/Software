

document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Dashboard JS Loaded");
   
    DataSync.init(); 
  
    loadDashboardStats();
    loadRecentStaff();
    
    document.getElementById("lastUpdated").textContent = new Date().toLocaleTimeString();
});

function loadDashboardStats() {
    const staff = DataSync.getStaff();
    const projects = DataSync.getProjects();
    const machines = DataSync.getMachines();
    
    const today = new Date().toISOString().split('T')[0];
    const attendance = DataSync.getAttendance().filter(a => a.date === today);
    const present = attendance.length;
    
    document.getElementById("totalStaff").textContent = staff.length;
    document.getElementById("totalProjects").textContent = projects.length;
    document.getElementById("totalMachines").textContent = machines.length;
    document.getElementById("presentToday").textContent = present;
}

function loadRecentStaff() {
    const staff = DataSync.getStaff();
    const recentStaff = staff.slice(-4).reverse();
    
    const grid = document.getElementById("recentStaffGrid");
    
    if (!grid) return;
    
    if (recentStaff.length === 0) {
        grid.innerHTML = '<div class="no-data">No staff added yet. <a href="addstaff.html">Add first staff ➕</a></div>';
        return;
    }
    
    grid.innerHTML = recentStaff.map(s => `
        <div class="recent-staff-card">
            <div class="staff-avatar">
                ${s.photo ? `<img src="${s.photo}" alt="${s.name}">` : '👤'}
            </div>
            <div class="staff-info">
                <h4>${s.name || 'Unnamed'}</h4>
                <p>${s.project || 'N/A'} - ${s.shift || 'N/A'}</p>
                <span class="staff-salary">₹${(s.salary || 0).toLocaleString()}</span>
            </div>
        </div>
    `).join('');
}

window.loadDashboardStats = loadDashboardStats;
window.loadRecentStaff = loadRecentStaff;
