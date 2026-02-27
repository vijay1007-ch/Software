
const DataSync = {
    KEYS: {
        STAFF: 'staffData',
        ATTENDANCE: 'attendanceData',
        SALARY: 'salaryRecords',
        PROJECTS: 'projectsData',
        MACHINES: 'machinesData',
        SETTINGS: 'settingsData',
        LOGIN: 'currentUser'
    },

    init() {
        console.log("🔄 ISSNE Data Sync Initialized");
        this.ensureDataExists();
    },

    ensureDataExists() {
        if (!localStorage.getItem(this.KEYS.STAFF)) {
            localStorage.setItem(this.KEYS.STAFF, JSON.stringify([]));
        }
        if (!localStorage.getItem(this.KEYS.ATTENDANCE)) {
            localStorage.setItem(this.KEYS.ATTENDANCE, JSON.stringify([]));
        }
        if (!localStorage.getItem(this.KEYS.SALARY)) {
            localStorage.setItem(this.KEYS.SALARY, JSON.stringify([]));
        }
        if (!localStorage.getItem(this.KEYS.PROJECTS)) {
            localStorage.setItem(this.KEYS.PROJECTS, JSON.stringify([]));
        }
        if (!localStorage.getItem(this.KEYS.MACHINES)) {
            localStorage.setItem(this.KEYS.MACHINES, JSON.stringify([]));
        }
        if (!localStorage.getItem(this.KEYS.SETTINGS)) {
            localStorage.setItem(this.KEYS.SETTINGS, JSON.stringify({
                companyName: 'ISSNE',
                adminKey: 'admin123',
                hourlyRate: 250,
                otRate: 375
            }));
        }
    },

    // Generic CRUD operations
    getData(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    },

    setData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
        this.notifyChange(key);
    },

    addItem(key, item) {
        const data = this.getData(key);
        if (!item.id) {
            item.id = Date.now();
        }
        item.createdAt = new Date().toISOString();
        data.push(item);
        this.setData(key, data);
        return item.id;
    },

    updateItem(key, id, updates) {
        const data = this.getData(key);
        const index = data.findIndex(item => item.id == id);
        if (index !== -1) {
            data[index] = { ...data[index], ...updates, updatedAt: new Date().toISOString() };
            this.setData(key, data);
            return true;
        }
        return false;
    },

    deleteItem(key, id) {
        const data = this.getData(key);
        const filtered = data.filter(item => item.id != id);
        this.setData(key, filtered);
    },

    // Get single item by ID
    getItemById(key, id) {
        const data = this.getData(key);
        return data.find(item => item.id == id);
    },

    // Staff specific methods
    getStaff() {
        return this.getData(this.KEYS.STAFF);
    },

    addStaff(staff) {
        if (!staff.id) {
            staff.id = Date.now();
        }
        return this.addItem(this.KEYS.STAFF, staff);
    },

    updateStaff(staffOrId, updates) {
        // Handle both updateStaff(staff) and updateStaff(id, updates)
        if (typeof staffOrId === 'object') {
            const staff = staffOrId;
            return this.updateItem(this.KEYS.STAFF, staff.id, staff);
        } else {
            return this.updateItem(this.KEYS.STAFF, staffOrId, updates);
        }
    },

    deleteStaff(id) {
        // Also delete related attendance and salary records
        this.deleteItem(this.KEYS.STAFF, id);
        
        const attendance = this.getData(this.KEYS.ATTENDANCE);
        const filtered = attendance.filter(a => a.staffId != id);
        this.setData(this.KEYS.ATTENDANCE, filtered);
        
        const salary = this.getData(this.KEYS.SALARY);
        const filteredSalary = salary.filter(s => s.staffId != id);
        this.setData(this.KEYS.SALARY, filteredSalary);
    },

    setItem(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    // Attendance specific methods
    getAttendance() {
        return this.getData(this.KEYS.ATTENDANCE);
    },

    // Salary specific methods
    getSalaryRecords() {
        return this.getData(this.KEYS.SALARY);
    },

    // Projects specific methods
    getProjects() {
        return this.getData(this.KEYS.PROJECTS);
    },

    addProject(project) {
        if (!project.id) {
            project.id = Date.now();
        }
        return this.addItem(this.KEYS.PROJECTS, project);
    },

    updateProject(id, updates) {
        return this.updateItem(this.KEYS.PROJECTS, id, updates);
    },

    deleteProject(id) {
        this.deleteItem(this.KEYS.PROJECTS, id);
    },

    // Machines specific methods
    getMachines() {
        return this.getData(this.KEYS.MACHINES);
    },

    addMachine(machine) {
        if (!machine.id) {
            machine.id = Date.now();
        }
        return this.addItem(this.KEYS.MACHINES, machine);
    },

    updateMachine(id, updates) {
        return this.updateItem(this.KEYS.MACHINES, id, updates);
    },

    deleteMachine(id) {
        this.deleteItem(this.KEYS.MACHINES, id);
    },

    // Settings
    getSettings() {
        return this.getData(this.KEYS.SETTINGS);
    },

    saveSettings(settings) {
        this.setData(this.KEYS.SETTINGS, settings);
    },

    updateSettings(updates) {
        const settings = this.getSettings();
        this.setData(this.KEYS.SETTINGS, { ...settings, ...updates });
    },

    // Statistics
    getStats() {
        const staff = this.getData(this.KEYS.STAFF);
        const attendance = this.getData(this.KEYS.ATTENDANCE);
        const projects = this.getData(this.KEYS.PROJECTS);
        const machines = this.getData(this.KEYS.MACHINES);
        const salary = this.getData(this.KEYS.SALARY);

        const today = new Date().toISOString().split('T')[0];
        const todayAttendance = attendance.filter(a => a.date === today && a.clockIn);

        // Calculate total salary
        const totalSalary = salary.reduce((sum, s) => sum + (s.salary || 0), 0);

        // Calculate average attendance
        const totalDays = attendance.length;
        const presentDays = attendance.filter(a => a.status === 'Present').length;
        const attendanceRate = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

        return {
            totalStaff: staff.length,
            totalProjects: projects.length,
            totalMachines: machines.length,
            todayPresent: todayAttendance.length,
            totalSalary: totalSalary,
            attendanceRate: attendanceRate,
            totalAttendance: totalDays
        };
    },

    // Event listeners for data changes
    listeners: {},

    on(key, callback) {
        if (!this.listeners[key]) {
            this.listeners[key] = [];
        }
        this.listeners[key].push(callback);
    },

    notifyChange(key) {
        if (this.listeners[key]) {
            this.listeners[key].forEach(callback => callback(this.getData(key)));
        }
        // Notify global listeners
        if (this.listeners['*']) {
            this.listeners['*'].forEach(callback => callback(key, this.getData(key)));
        }
    },

    // Clear all data (for testing/reset)
    clearAll() {
        Object.values(this.KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
        this.init();
        console.log("🗑️ All data cleared!");
    }
};

// Auto-initialize when loaded
document.addEventListener('DOMContentLoaded', () => {
    DataSync.init();
});
