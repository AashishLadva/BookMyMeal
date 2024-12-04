package com.Project.BookMyMeal.Controller;

import com.Project.BookMyMeal.DTO.ChangePasswordDTO;
import com.Project.BookMyMeal.Entity.Employee;
import com.Project.BookMyMeal.Service.EmployeeService;
import com.Project.BookMyMeal.Util.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/employees")
@Slf4j
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/add")
    public ResponseEntity<?> addEmployee(@RequestBody Employee employee) {
        try {
            // Save employee if authentication succeeds
            Employee savedEmployee = employeeService.saveEmployee(employee);
            return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);

        } catch (Exception e) {
            log.error("Error adding employee", e);
            return new ResponseEntity<>("Error occurred while adding employee", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        try {
            boolean isAuthenticated = employeeService.authenticate(email, password);

            if (isAuthenticated) {
                // Retrieve the authenticated employee
                Employee employee = employeeService.findByEmail(email);

                if (employee != null) {
                    String token = jwtUtil.generateToken(employee.getName());

                    // Prepare the response with token, userId, and userName
                    Map<String, Object> response = new HashMap<>();
                    response.put("token", token);
                    response.put("userId", employee.getId()); // getId() returns the employee ID
                    response.put("userName", employee.getName()); // getName() returns the employee name

                    return ResponseEntity.ok(response);
                } else {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Employee not found");
                }
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Login failed");
        }
    }


    @PostMapping("/changePassword")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordDTO changePasswordDTO) {
        try {
            employeeService.changePassword(
                    changePasswordDTO.getEmployeeId(),
                    changePasswordDTO.getCurrentPassword(),
                    changePasswordDTO.getNewPassword()
            );
            return ResponseEntity.ok("Password changed successfully: ");
        } catch (RuntimeException ex) {
            return ResponseEntity.status(400).body(ex.getMessage());
        }
    }
}
