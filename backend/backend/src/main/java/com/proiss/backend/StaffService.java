package com.proiss.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StaffService {

    @Autowired
    private StaffRepository staffRepository;

    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    public Staff getStaffById(Long id) {
        if (id == null || id <= 0) {
            throw new IllegalArgumentException("Invalid staff ID: " + id);
        }
        
        return staffRepository.findById(id)
                .orElseThrow(() -> new StaffNotFoundException("Staff not found with ID: " + id));
    }

    public Staff saveStaff(Staff staff) {
        // Validate staff data
        if (staff.getName() == null || staff.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Staff name is required");
        }
        
        if (staff.getContact() == null || staff.getContact().trim().isEmpty()) {
            throw new IllegalArgumentException("Contact number is required");
        }
        
        return staffRepository.save(staff);
    }

    public Staff updateStaff(Long id, Staff staffDetails) {
        Staff staff = staffRepository.findById(id)
                .orElseThrow(() -> new StaffNotFoundException("Staff not found with ID: " + id));
        
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
        
        return staffRepository.save(staff);
    }

    public void deleteStaff(Long id) {
        if (!staffRepository.existsById(id)) {
            throw new StaffNotFoundException("Cannot delete: Staff not found with ID: " + id);
        }
        staffRepository.deleteById(id);
    }
}

