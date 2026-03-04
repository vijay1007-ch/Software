# ISSNE - Staff Management System

A comprehensive Staff Management System built with Spring Boot (Backend) and Vanilla JavaScript/HTML/CSS (Frontend).

---

## 📚 Table of Contents

1. [DOM & Events](#dom--events)
2. [DOM Manipulation](#dom-manipulation)
3. [CORS (Cross-Origin Resource Sharing)](#cors-cross-origin-resource-sharing)
4. [Exception Handling](#exception-handling)
5. [Deployment Guide](#deployment-guide)

---

## 🌐 DOM & Events

### What is the DOM?

The **Document Object Model (DOM)** is a programming interface for web documents. It represents the page so that programs can change the document structure, style, and content.

### Event Handling in This Project

The project uses various event handling patterns:

#### 1. **DOMContentLoaded Event**
Waits for HTML to fully load before running JavaScript:

```javascript
// From JS/login.js
document.addEventListener("DOMContentLoaded", function() {
    console.log("✅ Login JS Loaded");
    
    const loginForm = document.getElementById("loginForm");
    
    if (loginForm) {
        loginForm.addEventListener("submit", function(e) {
            e.preventDefault();
            // Handle login
        });
    }
});
```

#### 2. **Form Submit Events**
Prevents default form submission and handles data:

```javascript
// From JS/addstaff.js
form.addEventListener("submit", function(e) {
    e.preventDefault(); // Prevents page reload
    
    const staff = {
        name: document.getElementById("name").value,
        contact: document.getElementById("contact").value,
        // ... more fields
    };
    
    DataSync.addStaff(staff);
    window.location.href = "staff.html";
});
```

#### 3. **Change Events**
Triggered when input values change:

```javascript
// From JS/addstaff.js - Auto-calculate age
dob.addEventListener("change", function() {
    const birth = new Date(this.value);
    const today = new Date();
    
    let calculatedAge = today.getFullYear() - birth.getFullYear();
    // Adjust for month/day
    if (today.getMonth() < birth.getMonth()) {
        calculatedAge--;
    }
    
    if (age) age.value = calculatedAge;
});
```

#### 4. **Click Events**
Handling button clicks:

```javascript
// From JS/staff.js
function deleteStaff(index) {
    if (confirm("🗑️ Delete this staff member?")) {
        const staffList = DataSync.getStaff();
        const staff = staffList[index];
        
        if (staff) {
            DataSync.deleteStaff(staff.id);
            displayStaff();
            alert("✅ Staff deleted successfully!");
        }
    }
}
```

#### 5. **Window Click Events** (Modal handling)

```javascript
// From JS/staff.js - Close modal on outside click
window.onclick = function(event) {
    const modal = document.getElementById("staffModal");
    if (event.target === modal) closeModal();
};
```

---

## 🎨 DOM Manipulation

### What is DOM Manipulation?

DOM Manipulation involves creating, modifying, or deleting HTML elements using JavaScript.

### Techniques Used in This Project

#### 1. **Selecting Elements**

```javascript
// Single element
const loginForm = document.getElementById("loginForm");
const staffGrid = document.getElementById("staffGrid");

// Multiple elements
const cards = document.querySelectorAll("#staffGrid .recent-staff-card");

// From child element
const name = card.querySelector("h4").textContent.toLowerCase();
```

#### 2. **Creating Elements**

```javascript
// From JS/staff.js
function createStaffCard(staff, index) {
    const card = document.createElement('div');
    card.className = 'recent-staff-card';
    card.innerHTML = `
        <div class="staff-avatar">
            ${staff.photo ? `<img src="${staff.photo}" alt="${staff.name}">` : '👤'}
        </div>
        <div class="staff-info">
            <h4>${staff.name || 'Unnamed'}</h4>
            <p>${staff.project || 'N/A'} - ${staff.shift || 'N/A'}</p>
            <span class="staff-salary">₹${(staff.salary || 0).toLocaleString()}</span>
        </div>
    `;
    return card;
}
```

#### 3. **Modifying Elements**

```javascript
// Setting innerHTML
grid.innerHTML = "";

// Updating text content
document.getElementById("modalName").textContent = staff.name || 'N/A';
document.getElementById("modalSalary").textContent = `₹${(staff.salary || 0).toLocaleString()}`;

// Updating attributes
document.getElementById("modalPhoto").src = staff.photo || defaultImage;

// Updating styles
card.style.display = (name.includes(input) || info.includes(input)) ? "flex" : "none";
```

#### 4. **Removing Elements**

```javascript
// Clear all content
grid.innerHTML = "";

// Remove via parent
parentElement.removeChild(child);

// Filter and rebuild (from searchStaff)
cards.forEach((card) => {
    const name = card.querySelector("h4").textContent.toLowerCase();
    card.style.display = name.includes(input) ? "flex" : "none";
});
```

#### 5. **Adding/Removing Classes**

```javascript
// Add class
card.className = 'recent-staff-card';

// Toggle with inline styles (used in this project)
card.style.display = "block"; // or "none"
```

---

## 🔒 CORS (Cross-Origin Resource Sharing)

### What is CORS?

**CORS** is a security mechanism that restricts web pages from making requests to a different domain than the one that served the web page. It's implemented by browsers to prevent malicious scripts from making unauthorized requests.

### Why Do We Need CORS?

Without CORS, a frontend running on `http://localhost:3000` cannot make API calls to a backend at `http://localhost:8080` because they're from different origins.

### How CORS Works

```
┌─────────────────┐         ┌─────────────────┐
│   Frontend      │         │   Backend       │
│  (localhost:    │  ────>  │  (localhost:    │
│   3000)         │  <────  │   8080)         │
└─────────────────┘         └─────────────────┘

1. Browser sends OPTIONS request (preflight)
2. Server responds with CORS headers
3. Browser allows/denies the actual request
```

### CORS Headers

| Header | Description |
|--------|-------------|
| `Access-Control-Allow-Origin` | Which origins can access |
| `Access-Control-Allow-Methods` | Allowed HTTP methods |
| `Access-Control-Allow-Headers` | Allowed request headers |

### Implementation in This Project

#### Adding CORS to Spring Boot Controller

```java
// File: backend/backend/src/main/java/com/proiss/backend/StaffController.java

package com.proiss.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/staff")
@CrossOrigin(origins = "*") // Allows all origins
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
        // Implementation
    }

    @DeleteMapping("/{id}")
    public String deleteStaff(@PathVariable Long id) {
        staffService.deleteStaff(id);
        return "Staff deleted with id: " + id;
    }
}
```

#### Alternative: Global CORS Configuration

You can also configure CORS globally in Spring Boot:

```java
// File: backend/backend/src/main/java/com/proiss/backend/CorsConfig.java

package com.proiss.backend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("*")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(false)
                        .maxAge(3600);
            }
        };
    }
}
```

### Making API Calls from Frontend

```javascript
// Example: Fetch API with CORS
async function fetchStaff() {
    try {
        const response = await fetch('http://localhost:8080/api/staff', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors' // Explicitly set CORS mode
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching staff:', error);
    }
}
```

---

## ⚠️ Exception Handling

### What is Exception Handling?

Exception handling is the process of responding to runtime errors (exceptions) in a controlled manner, preventing the application from crashing.

### Why Exception Handling is Important

1. **User Experience**: Show meaningful error messages
2. **Debugging**: Log errors for developers
3. **Security**: Don't expose internal error details
4. **Stability**: Prevent application crashes

### Exception Handling in Java/Spring Boot

#### 1. **Basic Exception Handling in Service**

```java
// File: backend/backend/src/main/java/com/proiss/backend/StaffService.java

package com.proiss.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public void deleteStaff(Long id) {
        if (!staffRepository.existsById(id)) {
            throw new StaffNotFoundException("Cannot delete: Staff not found with ID: " + id);
        }
        staffRepository.deleteById(id);
    }
}
```

#### 2. **Custom Exception Classes**

```java
// File: backend/backend/src/main/java/com/proiss/backend/StaffNotFoundException.java

package com.proiss.backend;

public class StaffNotFoundException extends RuntimeException {
    
    public StaffNotFoundException(String message) {
        super(message);
    }
    
    public StaffNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
```

```java
// File: backend/backend/src/main/java/com/proiss/backend/InvalidStaffDataException.java

package com.proiss.backend;

public class InvalidStaffDataException extends RuntimeException {
    
    public InvalidStaffDataException(String message) {
        super(message);
    }
}
```

#### 3. **Global Exception Handler**

```java
// File: backend/backend/src/main/java/com/proiss/backend/GlobalExceptionHandler.java

package com.proiss.backend;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    // Handle Staff Not Found Exception
    @ExceptionHandler(StaffNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleStaffNotFoundException(
            StaffNotFoundException ex, WebRequest request) {
        
        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.NOT_FOUND.value(),
                ex.getMessage(),
                request.getDescription(false),
                LocalDateTime.now()
        );
        
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    // Handle Invalid Data Exception
    @ExceptionHandler(InvalidStaffDataException.class)
    public ResponseEntity<ErrorResponse> handleInvalidDataException(
            InvalidStaffDataException ex, WebRequest request) {
        
        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                ex.getMessage(),
                request.getDescription(false),
                LocalDateTime.now()
        );
        
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    // Handle Illegal Argument Exception
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgumentException(
            IllegalArgumentException ex, WebRequest request) {
        
        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                ex.getMessage(),
                request.getDescription(false),
                LocalDateTime.now()
        );
        
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    // Handle All Other Exceptions (Catch-all)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(
            Exception ex, WebRequest request) {
        
        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "An unexpected error occurred: " + ex.getMessage(),
                request.getDescription(false),
                LocalDateTime.now()
        );
        
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
```

#### 4. **Error Response DTO**

```java
// File: backend/backend/src/main/java/com/proiss/backend/ErrorResponse.java

package com.proiss.backend;

import java.time.LocalDateTime;

public class ErrorResponse {
    
    private int status;
    private String message;
    private String path;
    private LocalDateTime timestamp;
    
    public ErrorResponse(int status, String message, String path, LocalDateTime timestamp) {
        this.status = status;
        this.message = message;
        this.path = path;
        this.timestamp = timestamp;
    }
    
    // Getters and Setters
    public int getStatus() {
        return status;
    }
    
    public void setStatus(int status) {
        this.status = status;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public String getPath() {
        return path;
    }
    
    public void setPath(String path) {
        this.path = path;
    }
    
    public LocalDateTime getTimestamp() {
        return timestamp;
    }
    
    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
```

#### 5. **Updated Controller with Better Error Handling**

```java
// File: backend/backend/src/main/java/com/proiss/backend/StaffController.java

package com.proiss.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/staff")
@CrossOrigin(origins = "*")
public class StaffController {

    @Autowired
    private StaffService staffService;

    @GetMapping
    public ResponseEntity<List<Staff>> getAllStaff() {
        try {
            List<Staff> staff = staffService.getAllStaff();
            return ResponseEntity.ok(staff);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Staff> getStaffById(@PathVariable Long id) {
        try {
            Staff staff = staffService.getStaffById(id);
            return ResponseEntity.ok(staff);
        } catch (StaffNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Staff> createStaff(@RequestBody Staff staff) {
        try {
            Staff savedStaff = staffService.saveStaff(staff);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedStaff);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Staff> updateStaff(@PathVariable Long id, @RequestBody Staff staffDetails) {
        try {
            Staff updatedStaff = staffService.updateStaff(id, staffDetails);
            return ResponseEntity.ok(updatedStaff);
        } catch (StaffNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStaff(@PathVariable Long id) {
        try {
            staffService.deleteStaff(id);
            return ResponseEntity.ok("Staff deleted successfully");
        } catch (StaffNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting staff: " + e.getMessage());
        }
    }
}
```

### Exception Handling in JavaScript (Frontend)

```javascript
// From JS/login.js - Basic error handling
function authenticateUser(username, password) {
    const validUser = "admin";
    const validPass = "1234";
    
    if (username === validUser && password === validPass) {
        localStorage.setItem('currentUser', JSON.stringify({
            username: username,
            loginTime: new Date().toISOString()
        }));
        
        alert("✅ Login Successful!");
        window.location.href = "dashboard.html";
    } else {
        alert("❌ Invalid Username or Password");
    }
}

// Try-Catch for async operations
async function fetchData() {
    try {
        const response = await fetch('http://localhost:8080/api/staff');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error.message);
        alert('Failed to fetch data. Please try again.');
    }
}
```

---

## 🚀 Deployment Guide

### Prerequisites

- Java 17 or higher
- Maven 3.6+
- Web browser (Chrome, Firefox, Edge)

### Backend Deployment

#### Option 1: Run with Maven

```bash
cd backend/backend

# Run the application
./mvnw spring-boot:run
```

#### Option 2: Build and Run JAR

```bash
cd backend/backend

# Build the JAR
./mvnw clean package -DskipTests

# Run the JAR
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

#### Option 3: Deploy to External Server

1. **Build production WAR/JAR:**
   ```bash
   ./mvnw clean package
   ```

2. **Deploy to Tomcat:**
   - Copy `target/backend-0.0.1-SNAPSHOT.war` to Tomcat's `webapps` folder

3. **Deploy to AWS/Render/Railway:**
   - Push code to GitHub
   - Connect to deployment platform
   - Set environment variables

### Frontend Deployment

#### Option 1: Local Development

Simply open `HTML/homepage.html` in a browser.

#### Option 2: Use a Simple Server

```bash
# Using Python
cd HTML
python -m http.server 3000

# Using Node.js (http-server)
npx http-server -p 3000
```

#### Option 3: Deploy to Netlify/Vercel

1. Put all HTML/CSS/JS files in a folder
2. Drag and drop to Netlify
3. Or connect GitHub repository

### Environment Configuration

```properties
# application.properties
spring.application.name=backend
server.port=8080

# H2 Database
spring.datasource.url=jdbc:h2:mem:issne
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# JPA/Hibernate
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### Production Database (Optional)

Switch to MySQL/PostgreSQL:

```properties
# MySQL
spring.datasource.url=jdbc:mysql://localhost:3306/issne
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
```

---

## 📁 Project Structure

```
PRO ISS/
├── README.md                 # This file
├── backend/
│   └── backend/
│       ├── pom.xml           # Maven dependencies
│       └── src/
│           └── main/
│               ├── java/com/proiss/backend/
│               │   ├── BackendApplication.java
│               │   ├── Staff.java
│               │   ├── StaffController.java
│               │   ├── StaffService.java
│               │   ├── StaffRepository.java
│               │   ├── StaffNotFoundException.java
│               │   ├── InvalidStaffDataException.java
│               │   ├── GlobalExceptionHandler.java
│               │   └── ErrorResponse.java
│               └── resources/
│                   └── application.properties
├── HTML/                     # Frontend HTML files
├── CSS/                      # Stylesheets
├── JS/                       # JavaScript files
│   ├── login.js
│   ├── staff.js
│   ├── addstaff.js
│   ├── datasync.js
│   └── ...
└── TODO.md                   # Project tasks
```

---

## 🔧 Key Features

- ✅ Staff Management (CRUD)
- ✅ Attendance Tracking
- ✅ Salary Management
- ✅ Project Management
- ✅ Machine Tracking
- ✅ Dashboard with Statistics
- ✅ Local Storage (DataSync)
- ✅ CORS Enabled API
- ✅ Global Exception Handling
- ✅ Responsive Design

---

## 📝 License

This project is for educational purposes.

---

**Happy Coding!** 🚀

