package com.proiss.backend;

/**
 * Custom exception thrown when a staff member is not found in the database.
 */
public class StaffNotFoundException extends RuntimeException {
    
    public StaffNotFoundException(String message) {
        super(message);
    }
    
    public StaffNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}

