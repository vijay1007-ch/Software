/**
 * ISSNE - Settings Module
 */

document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Settings JS Loaded");
    loadSettings();
});

// Load Settings
function loadSettings() {
    const settings = DataSync.getSettings();
    if (settings) {
        document.getElementById("companyName").value = settings.companyName || "ISSNE";
        document.getElementById("adminKey").value = settings.adminKey || "admin123";
        document.getElementById("hourlyRate").value = settings.hourlyRate || 250;
    }
}

// Save Settings
const settingsForm = document.getElementById("settingsForm");
if (settingsForm) {
    settingsForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const settings = {
            companyName: document.getElementById("companyName").value,
            adminKey: document.getElementById("adminKey").value,
            hourlyRate: parseFloat(document.getElementById("hourlyRate").value) || 250
        };
        
        DataSync.saveSettings(settings);
        alert("✅ Settings saved successfully!");
    });
}

// Export Data
function exportData() {
    const data = {
        staff: DataSync.getStaff(),
        projects: DataSync.getProjects(),
        machines: DataSync.getMachines(),
        attendance: DataSync.getAttendance(),
        salary: DataSync.getSalaryRecords(),
        settings: DataSync.getSettings()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "issne_backup_" + new Date().toISOString().slice(0,10) + ".json";
    a.click();
    URL.revokeObjectURL(url);
    
    alert("✅ Data exported successfully!");
}

// Import Data
function importData() {
    document.getElementById("importFile").click();
}

const importFile = document.getElementById("importFile");
if (importFile) {
    importFile.addEventListener("change", function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const data = JSON.parse(event.target.result);
                
                if (data.staff) localStorage.setItem("staffData", JSON.stringify(data.staff));
                if (data.projects) localStorage.setItem("projectsData", JSON.stringify(data.projects));
                if (data.machines) localStorage.setItem("machinesData", JSON.stringify(data.machines));
                if (data.attendance) localStorage.setItem("attendanceData", JSON.stringify(data.attendance));
                if (data.salary) localStorage.setItem("salaryRecords", JSON.stringify(data.salary));
                if (data.settings) localStorage.setItem("settingsData", JSON.stringify(data.settings));
                
                alert("✅ Data imported successfully!");
                location.reload();
            } catch (err) {
                alert("❌ Error importing data: " + err.message);
            }
        };
        reader.readAsText(file);
    });
}

// Clear All Data
function clearData() {
    if (confirm("⚠️ Are you sure you want to delete ALL data? This cannot be undone!")) {
        const key = prompt("Type 'DELETE' to confirm:");
        if (key === "DELETE") {
            localStorage.clear();
            alert("✅ All data cleared!");
            location.reload();
        } else {
            alert("❌ Confirmation failed. Data not deleted.");
        }
    }
}

// Make functions global
window.exportData = exportData;
window.importData = importData;
window.clearData = clearData;
