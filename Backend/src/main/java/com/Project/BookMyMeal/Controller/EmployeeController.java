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
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
            Employee savedEmployee = employeeService.saveEmployee(employee);
            return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED); // Respond with the saved entity and status 201 (Created)
        } catch (Exception e) {
            // Log the exception for debugging purposes
            log.error("Error adding employee", e);
            return new ResponseEntity<>("Error occurred while adding employee", HttpStatus.INTERNAL_SERVER_ERROR); // Respond with a generic error message and status 500
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
                    String token = jwtUtil.generateToken(email);

                    // Prepare the response with token, userId, and userName
                    Map<String, Object> response = new HashMap<>();
                    response.put("token", token);
                    response.put("userId", employee.getId()); // Assuming getId() returns the employee ID
                    response.put("userName", employee.getName()); // Assuming getName() returns the employee name

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
            String responseMessage = employeeService.changePassword(
                    changePasswordDTO.getEmployeeId(),
                    changePasswordDTO.getCurrentPassword(),
                    changePasswordDTO.getNewPassword()
            );
            return ResponseEntity.ok(responseMessage);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(400).body(ex.getMessage());
        }
    }


    @GetMapping()
    public ResponseEntity<List<Employee>> getAllEmployees() {
        try {
            List<Employee> employees = employeeService.getAllEmployees();
            return new ResponseEntity<>(employees, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Error fetching employees", e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getEmployeeById(@PathVariable Long id) {
        Employee employee = employeeService.getEmployeeById(id).orElse(null);
        if (employee != null) {
            return new ResponseEntity<>(employee, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("UserNotFoundException", HttpStatus.NOT_FOUND);
        }
    }
}
