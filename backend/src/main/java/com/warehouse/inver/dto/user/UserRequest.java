package com.warehouse.inver.dto.user;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class UserRequest {
    @NotNull(message = "Username cannot be null")
    @Size(min = 3, max = 20, message="Username must be between 3 and 20 characters")
    private String username;

    @NotNull(message = "First name cannot be null")
    @Size(min = 3, max = 20, message="First name must be between 3 and 20 characters")
    private String firstName;

    @NotNull(message = "Last name cannot be null")
    @Size(min = 3, max = 20, message="Last name must be between 3 and 20 characters")
    private String lastName;

    @NotNull(message = "Email cannot be null")
    @Email(message = "Invalid email format")
    private String email;

    @NotNull(message = "Password cannot be null")
    @Size(min = 8, max = 20, message="Password must be between 8 and 20 characters")
    private String password;

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
}
