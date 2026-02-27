package com.vijay.issne.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.vijay.issne.entity.Staff;

public interface StaffRepository extends JpaRepository<Staff, Long> {
}