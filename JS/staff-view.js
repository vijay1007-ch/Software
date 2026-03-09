const API_BASE = "/api/staff";

function getQueryParam(name) {
    return new URLSearchParams(window.location.search).get(name);
}

function logout() {
    if (confirm("🚪 Are you sure you want to logout?")) {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userRole');
   
        const loginPaths = [
            '/HTML/loginpage.htm',  
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

// ================= REQUEST BUTTON ACTIONS =================
let currentRequestType = ''; // 'leave' or 'salary'

function openLeaveRequest() {
    currentRequestType = 'leave';
    document.getElementById('modalTitle').textContent = '🍃 Request Leave';
    document.getElementById('modalLabel').textContent = 'Leave Dates';
    document.getElementById('dateFrom').value = '';
    document.getElementById('dateTo').value = '';
    document.getElementById('reasonText').value = '';
    document.getElementById('requestModal').style.display = 'flex';
}

function openSalaryAdvance() {
    currentRequestType = 'salary';
    document.getElementById('modalTitle').textContent = '💸 Salary Advance';
    document.getElementById('modalLabel').textContent = 'Date';
    document.getElementById('dateFrom').value = '';
    document.getElementById('dateTo').value = '';
    document.getElementById('reasonText').value = '';
    document.getElementById('requestModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('requestModal').style.display = 'none';
}

function submitRequest() {
    const fromDate = document.getElementById('dateFrom').value;
    const toDate = document.getElementById('dateTo').value;
    const reason = document.getElementById('reasonText').value.trim();

    // Validation
    if (!fromDate) {
        alert('Please select From date');
        return;
    }
    
    if (currentRequestType === 'leave') {
        if (!toDate || new Date(fromDate) > new Date(toDate)) {
            alert('Please select valid To date (after From date)');
            return;
        }
        
        // Calculate days
        const from = new Date(fromDate);
        const to = new Date(toDate);
        const diffTime = Math.abs(to - from);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        
        document.getElementById('leaveStatus').textContent = 'Pending';
        document.getElementById('leaveStatus').className = 'request-status pending';
        document.getElementById('leaveDate').textContent = 
            `Applied: ${fromDate} to ${toDate} (${diffDays} days) | ${reason}`;
    } else {
        // Salary advance - single date + reason
        document.getElementById('advanceStatus').textContent = 'Pending';
        document.getElementById('advanceStatus').className = 'request-status pending';
        document.getElementById('advanceDate').textContent = 
            `Applied: ${fromDate} | ${reason}`;
    }

    if (!reason) {
        alert('Please enter a reason');
        return;
    }

    alert(`✅ ${currentRequestType.toUpperCase()} request submitted!`);
    closeModal();
}

// ================= INIT =================
document.addEventListener('DOMContentLoaded', loadStaffData);

// Make functions global for onclick in HTML
window.logout = logout;
window.openLeaveRequest = openLeaveRequest;
window.openSalaryAdvance = openSalaryAdvance;
window.closeModal = closeModal;
window.submitRequest = submitRequest;
