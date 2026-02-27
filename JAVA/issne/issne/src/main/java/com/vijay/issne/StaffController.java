package com.vijay.issne;

import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import java.util.List;
import com.vijay.issne.entity.Staff;
import com.vijay.issne.repository.StaffRepository;

@RestController
@RequestMapping("/staff")
@RequiredArgsConstructor
public class StaffController {

    private final StaffRepository repository;

    @PostMapping
    public Staff addStaff(@RequestBody Staff staff) {
        return repository.save(staff);
    }

    @GetMapping
    public List<Staff> getAllStaff() {
        return repository.findAll();
    }
    @DeleteMapping("/{id}")
    public void deleteStaff(@PathVariable Long id) {
        repository.deleteById(id);
    }
    @GetMapping("/{id}")
    public Staff getStaffById(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }
}