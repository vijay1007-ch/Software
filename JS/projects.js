/**
 * ISSNE - Projects Module
 */

document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Projects JS Loaded");
    displayProjects();
    updateStats();
});

// Project Form
const projectForm = document.getElementById("projectForm");
if (projectForm) {
    projectForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const project = {
            name: document.getElementById("projectName").value,
            location: document.getElementById("projectLocation").value,
            startDate: document.getElementById("projectStartDate").value,
            endDate: document.getElementById("projectEndDate").value,
            budget: parseFloat(document.getElementById("projectBudget").value) || 0,
            status: document.getElementById("projectStatus").value
        };
        
        DataSync.addProject(project);
        alert("✅ Project added successfully!");
        clearProjectForm();
        displayProjects();
        updateStats();
    });
}

function clearProjectForm() {
    const form = document.getElementById("projectForm");
    if (form) form.reset();
}

function displayProjects() {
    const projects = DataSync.getProjects();
    const grid = document.getElementById("projectsGrid");
    
    if (!grid) return;
    
    if (projects.length === 0) {
        grid.innerHTML = '<div class="no-data">No projects added yet. Add your first project above!</div>';
        return;
    }
    
    grid.innerHTML = projects.map((project, index) => `
        <div class="recent-staff-card">
            <div class="staff-avatar">
                ${getProjectEmoji(project.status)}
            </div>
            <div class="staff-info">
                <h4>${project.name || 'Unnamed Project'}</h4>
                <p>📍 ${project.location || 'N/A'}</p>
                <p>📅 ${project.startDate || 'N/A'} - ${project.endDate || 'N/A'}</p>
                <span class="staff-salary">₹${(project.budget || 0).toLocaleString()}</span>
            </div>
            <div style="margin-left: auto;">
                <span class="staff-salary" style="display: block; margin-bottom: 10px; padding: 5px 15px; border-radius: 20px; background: ${getStatusColor(project.status)};">${project.status || 'N/A'}</span>
                <button onclick="deleteProject(${index})" style="background: rgba(255,107,107,0.2); color: #ff6b6b; border: 1px solid #ff6b6b; padding: 8px 15px; border-radius: 20px; cursor: pointer;">🗑️ Delete</button>
            </div>
        </div>
    `).join('');
}

function getProjectEmoji(status) {
    const emojis = {
        'Planning': '📝',
        'In Progress': '🔄',
        'On Hold': '⏸️',
        'Completed': '✅'
    };
    return emojis[status] || '📋';
}

function getStatusColor(status) {
    const colors = {
        'Planning': 'rgba(120,219,255,0.3)',
        'In Progress': 'rgba(78,205,196,0.3)',
        'On Hold': 'rgba(249,202,36,0.3)',
        'Completed': 'rgba(166,227,161,0.3)'
    };
    return colors[status] || 'rgba(255,255,255,0.2)';
}

function deleteProject(index) {
    if (confirm("🗑️ Delete this project?")) {
        const projects = DataSync.getProjects();
        if (projects[index]) {
            DataSync.deleteProject(projects[index].id);
            displayProjects();
            updateStats();
        }
    }
}

function filterProjects() {
    const input = document.getElementById("projectSearch").value.toLowerCase();
    const cards = document.querySelectorAll("#projectsGrid .recent-staff-card");
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(input) ? "flex" : "none";
    });
}

function updateStats() {
    const projects = DataSync.getProjects();
    
    document.getElementById("totalProjects").textContent = projects.length;
    document.getElementById("inProgressProjects").textContent = projects.filter(p => p.status === 'In Progress').length;
    document.getElementById("completedProjects").textContent = projects.filter(p => p.status === 'Completed').length;
    
    const totalBudget = projects.reduce((sum, p) => sum + (p.budget || 0), 0);
    document.getElementById("totalBudget").textContent = '₹' + totalBudget.toLocaleString();
}

// Make functions global
window.clearProjectForm = clearProjectForm;
window.deleteProject = deleteProject;
window.filterProjects = filterProjects;
