/**
 * ISSNE - Salary Module
 */

document.addEventListener("DOMContentLoaded", function() {
    console.log("✅ Salary JS LOADED");
    
    // Get Elements
    const totalHours = document.getElementById("totalHours");
    const otHours = document.getElementById("otHours");
    const calculateBtn = document.getElementById("calculateBtn");
    const predictBtn = document.getElementById("predictBtn");
    const saveBtn = document.getElementById("saveBtn");
    const currentSalary = document.getElementById("currentSalary");
    const predictedSalary = document.getElementById("predictedSalary");
    const performanceStatus = document.getElementById("performanceStatus");
    const staffSelect = document.getElementById("staffSelect");
    
    // Load staff into select
    if (staffSelect) {
        const staff = DataSync.getStaff();
        staff.forEach(s => {
            const option = document.createElement("option");
            option.value = s.id;
            option.textContent = s.name;
            staffSelect.appendChild(option);
        });
    }
    
    // Display saved records
    displayRecords();
    
    // Button Event Listeners
    if (calculateBtn) calculateBtn.addEventListener("click", calculateSalary);
    if (predictBtn) predictBtn.addEventListener("click", predictSalary);
    if (saveBtn) saveBtn.addEventListener("click", saveRecord);
    
    // Auto calculate on input change
    if (totalHours) totalHours.addEventListener("input", calculateSalary);
    if (otHours) otHours.addEventListener("input", calculateSalary);
    
    function calculateSalary() {
        const hours = parseFloat(totalHours?.value) || 0;
        const ot = parseFloat(otHours?.value) || 0;
        const settings = DataSync.getSettings();
        const rate = settings?.hourlyRate || 250;
        const otRate = rate * 1.5;
        
        const regularPay = hours * rate;
        const otPay = ot * otRate;
        const total = regularPay + otPay;
        
        // Update Display
        if (currentSalary) currentSalary.textContent = `₹${total.toLocaleString('en-IN')}`;
        if (performanceStatus) performanceStatus.textContent = getPerformance(hours + ot);
        
        console.log(`✅ Salary: ₹${total.toLocaleString('en-IN')}`);
    }
    
    function predictSalary() {
        const currentTotal = parseFloat(currentSalary?.textContent?.replace(/[₹,]/g, '') || '0');
        const predicted = currentTotal * (30 / 22); // Full 30 days prediction
        
        if (predictedSalary) predictedSalary.textContent = `₹${predicted.toLocaleString('en-IN')}`;
        console.log("🔮 Full Month Predicted: ₹" + predicted.toLocaleString('en-IN'));
    }
    
    function saveRecord() {
        const staffId = staffSelect?.value;
        const staff = DataSync.getStaff().find(s => s.id == staffId);
        
        if (!staff) {
            alert("Please select a staff member first!");
            return;
        }
        
        const record = {
            staffId: staff.id,
            staffName: staff.name,
            totalHours: parseFloat(totalHours?.value) || 0,
            otHours: parseFloat(otHours?.value) || 0,
            salary: parseFloat(currentSalary?.textContent?.replace(/[₹,]/g, '') || '0'),
            date: new Date().toISOString().split('T')[0]
        };
        
        // Save to localStorage
        let records = DataSync.getSalaryRecords();
        records.push(record);
        localStorage.setItem("salaryRecords", JSON.stringify(records));
        
        alert(`✅ Salary record saved for ${staff.name}!`);
        displayRecords();
    }
    
    function getPerformance(totalHours) {
        if (totalHours >= 200) return "⭐⭐⭐⭐⭐";
        if (totalHours >= 160) return "⭐⭐⭐⭐";
        if (totalHours >= 120) return "⭐⭐⭐";
        return "⭐⭐";
    }
    
    function displayRecords() {
        const records = DataSync.getSalaryRecords();
        const tbody = document.getElementById("recordsTableBody");
        
        if (!tbody) return;
        
        if (records.length === 0) {
            tbody.innerHTML = '<div class="no-data">No salary records saved yet.</div>';
            return;
        }
        
        tbody.innerHTML = records.map((record, index) => `
            <div class="recent-staff-card">
                <div class="staff-avatar">💰</div>
                <div class="staff-info">
                    <h4>${record.staffName || 'Unknown'}</h4>
                    <p>📅 ${record.date}</p>
                    <p>⏱️ ${record.totalHours}hrs + ${record.otHours} OT</p>
                    <span class="staff-salary">₹${(record.salary || 0).toLocaleString()}</span>
                </div>
                <div style="margin-left: auto;">
                    <button onclick="deleteRecord(${index})" style="background: rgba(255,107,107,0.2); color: #ff6b6b; border: 1px solid #ff6b6b; padding: 8px 15px; border-radius: 20px; cursor: pointer;">🗑️</button>
                </div>
            </div>
        `).join('');
    }
    
    // Initial calculation
    calculateSalary();
});

// Global functions
window.deleteRecord = function(index) {
    if (confirm("🗑️ Delete this salary record?")) {
        const records = JSON.parse(localStorage.getItem("salaryRecords")) || [];
        records.splice(index, 1);
        localStorage.setItem("salaryRecords", JSON.stringify(records));
        location.reload();
    }
};
