/**
 * ISSNE - Machine Details Module
 */

document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Machine Details JS Loaded");
    displayMachines();
    updateStats();
});

// Machine Form
const machineForm = document.getElementById("machineForm");
if (machineForm) {
    machineForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const machine = {
            name: document.getElementById("machineName").value,
            machineId: document.getElementById("machineId").value,
            type: document.getElementById("machineType").value,
            manufacturer: document.getElementById("machineManufacturer").value,
            cost: parseFloat(document.getElementById("machineCost").value) || 0,
            location: document.getElementById("machineLocation").value,
            status: document.getElementById("machineStatus").value
        };
        
        DataSync.addMachine(machine);
        alert("✅ Machine added successfully!");
        clearMachineForm();
        displayMachines();
        updateStats();
    });
}

function clearMachineForm() {
    const form = document.getElementById("machineForm");
    if (form) form.reset();
}

function displayMachines() {
    const machines = DataSync.getMachines();
    const grid = document.getElementById("machinesGrid");
    
    if (!grid) return;
    
    if (machines.length === 0) {
        grid.innerHTML = '<div class="no-data">No machines added yet. Add your first machine above!</div>';
        return;
    }
    
    grid.innerHTML = machines.map((machine, index) => `
        <div class="recent-staff-card">
            <div class="staff-avatar">
                ${getMachineEmoji(machine.type)}
            </div>
            <div class="staff-info">
                <h4>${machine.name || 'Unnamed Machine'}</h4>
                <p>🏷️ ID: ${machine.machineId || 'N/A'}</p>
                <p>🔧 Type: ${machine.type || 'N/A'}</p>
                <p>📍 ${machine.location || 'N/A'}</p>
                <span class="staff-salary">₹${(machine.cost || 0).toLocaleString()}</span>
            </div>
            <div style="margin-left: auto;">
                <span class="staff-salary" style="display: block; margin-bottom: 10px; padding: 5px 15px; border-radius: 20px; background: ${getStatusColor(machine.status)};">${machine.status || 'N/A'}</span>
                <button onclick="deleteMachine(${index})" style="background: rgba(255,107,107,0.2); color: #ff6b6b; border: 1px solid #ff6b6b; padding: 8px 15px; border-radius: 20px; cursor: pointer;">🗑️ Delete</button>
            </div>
        </div>
    `).join('');
}

function getMachineEmoji(type) {
    const emojis = {
        'CNC': '🏎️',
        'Lathe': '⚙️',
        'Drill': '🔩',
        'Press': '🔧',
        'Conveyor': '➡️',
        'Welding': '🔥',
        'Other': '⚡'
    };
    return emojis[type] || '⚙️';
}

function getStatusColor(status) {
    const colors = {
        'Active': 'rgba(78,205,196,0.3)',
        'Maintenance': 'rgba(249,202,36,0.3)',
        'Inactive': 'rgba(255,255,255,0.2)',
        'Broken': 'rgba(255,107,107,0.3)'
    };
    return colors[status] || 'rgba(255,255,255,0.2)';
}

function deleteMachine(index) {
    if (confirm("🗑️ Delete this machine?")) {
        const machines = DataSync.getMachines();
        if (machines[index]) {
            DataSync.deleteMachine(machines[index].id);
            displayMachines();
            updateStats();
        }
    }
}

function filterMachines() {
    const input = document.getElementById("machineSearch").value.toLowerCase();
    const cards = document.querySelectorAll("#machinesGrid .recent-staff-card");
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(input) ? "flex" : "none";
    });
}

function updateStats() {
    const machines = DataSync.getMachines();
    
    document.getElementById("totalMachines").textContent = machines.length;
    document.getElementById("activeMachines").textContent = machines.filter(m => m.status === 'Active').length;
    document.getElementById("maintenanceMachines").textContent = machines.filter(m => m.status === 'Maintenance').length;
    
    const totalValue = machines.reduce((sum, m) => sum + (m.cost || 0), 0);
    document.getElementById("totalValue").textContent = '₹' + totalValue.toLocaleString();
}

// Make functions global
window.clearMachineForm = clearMachineForm;
window.deleteMachine = deleteMachine;
window.filterMachines = filterMachines;
