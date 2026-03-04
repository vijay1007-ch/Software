package com.proiss.backend.controller;

import com.proiss.backend.model.Staff;
import com.proiss.backend.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/staff")
public class StaffController {

    @Autowired
    private StaffService staffService;

    @GetMapping
    public List<Staff> getAllStaff() {
        return staffService.getAllStaff();
    }

    @GetMapping("/{id}")
    public Staff getStaffById(@PathVariable Long id) {
        return staffService.getStaffById(id);
    }

    @PostMapping
    public Staff createStaff(@RequestBody Staff staff) {
        return staffService.saveStaff(staff);
    }

    @PutMapping("/{id}")
    public Staff updateStaff(@PathVariable Long id, @RequestBody Staff staffDetails) {
        Staff staff = staffService.getStaffById(id);
        if (staff != null) {
            // Update fields from the request
            staff.setName(staffDetails.getName());
            staff.setContact(staffDetails.getContact());
            staff.setGender(staffDetails.getGender());
            staff.setBlood(staffDetails.getBlood());
            staff.setAge(staffDetails.getAge());
            staff.setDob(staffDetails.getDob());
            staff.setDoj(staffDetails.getDoj());
            staff.setExperience(staffDetails.getExperience());
            staff.setProject(staffDetails.getProject());
            staff.setShift(staffDetails.getShift());
            staff.setHealth(staffDetails.getHealth());
            staff.setMedical(staffDetails.getMedical());
            staff.setAllergies(staffDetails.getAllergies());
            staff.setSalary(staffDetails.getSalary());
            return staffService.saveStaff(staff);
        }
        return null; // or throw 404
    }

    @DeleteMapping("/{id}")
    public String deleteStaff(@PathVariable Long id) {
        staffService.deleteStaff(id);
        return "Staff deleted with id: " + id;
    }
}
