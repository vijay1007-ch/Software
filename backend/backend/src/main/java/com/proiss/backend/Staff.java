package com.proiss.backend;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "staff")
public class Staff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String contact;
    private String gender;
    private String blood;
    private Integer age;
    private String dob;          // you can also use LocalDate
    private String doj;          // or use LocalDate
    private String experience;   // you can compute this from doj
    private String project;
    private String shift;
    private String health;
    private String medical;
    private String allergies;
    private Double salary;       // salary in ₹

    // Default constructor
    public Staff() {
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getContact() { return contact; }
    public void setContact(String contact) { this.contact = contact; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getBlood() { return blood; }
    public void setBlood(String blood) { this.blood = blood; }

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public String getDob() { return dob; }
    public void setDob(String dob) { this.dob = dob; }

    public String getDoj() { return doj; }
    public void setDoj(String doj) { this.doj = doj; }

    public String getExperience() { return experience; }
    public void setExperience(String experience) { this.experience = experience; }

    public String getProject() { return project; }
    public void setProject(String project) { this.project = project; }

    public String getShift() { return shift; }
    public void setShift(String shift) { this.shift = shift; }

    public String getHealth() { return health; }
    public void setHealth(String health) { this.health = health; }

    public String getMedical() { return medical; }
    public void setMedical(String medical) { this.medical = medical; }

    public String getAllergies() { return allergies; }
    public void setAllergies(String allergies) { this.allergies = allergies; }

    public Double getSalary() { return salary; }
    public void setSalary(Double salary) { this.salary = salary; }
}
