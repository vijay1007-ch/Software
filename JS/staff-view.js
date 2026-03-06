// Your exact JS + SETTINGS logout style
const API_BASE = "/api/staff";

function getQueryParam(name) {
    return new URLSearchParams(window.location.search).get(name);
}

// SETTINGS.HTML EXACT LOGOUT ✅
function logout() {
    if (confirm("🚪 Are you sure you want to logout?")) {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userRole');
        
        // Your paths + settings.html path
        const loginPaths = [
            '/HTML/loginpage.htm',  // Settings.html path
            'loginpage.html',
            './loginpage.html', 
            '../HTML/loginpage.html',
            '/loginpage.html',
            '/HTML/login.html'
        ];
        
        for (let path of loginPaths) {
            window.location.href = path;
            return;
        }
        alert('Login page not found.');
    }
}

async function loadStaffData() {
    const staffId = getQueryParam("staffId");
    const nameEl = document.getElementById("staffNameHeader");
    const idEl = document.getElementById("staffIdDisplay");
    
    idEl.textContent = staffId || "No ID";
    
    try {
        const res = await fetch(`${API_BASE}/list`);
        const staffList = await res.json();
        const staff = staffList.find(s => s.staffId === staffId);
        
        if (staff) {
            nameEl.textContent = staff.name || `Staff ${staffId}`;
            
            // Your exact sample data
            document.getElementById("hoursWorked").textContent = "42h";
            document.getElementById("hoursNote").textContent = "This Week";
            document.getElementById("attendanceStatus").textContent = "Present";
            document.getElementById("attendanceNote").textContent = "Today";
            document.getElementById("salaryAmount").textContent = "₹45,000";
            document.getElementById("salaryNote").textContent = "Mar 2026";
            document.getElementById("lastLoginTime").textContent = "Mar 5, 11:18 AM";
            document.getElementById("lastLoginNote").textContent = "IST";
            document.getElementById("payslipStatus").textContent = "Available";
            document.getElementById("payslipNote").textContent = "Feb 2026";
            document.getElementById("leavesBalance").textContent = "8";
            document.getElementById("leavesNote").textContent = "Remaining";
            
            document.getElementById("leaveStatus").textContent = "Granted";
            document.getElementById("leaveStatus").className = "request-status granted";
            document.getElementById("advanceStatus").textContent = "Denied";
        } else {
            nameEl.textContent = `Staff ${staffId} Not Found`;
        }
    } catch (error) {
        console.error("Failed to load staff data:", error);
        nameEl.textContent = "Data Loading Error";
    }
}

document.addEventListener('DOMContentLoaded', loadStaffData);
window.logout = logout; // Global access
