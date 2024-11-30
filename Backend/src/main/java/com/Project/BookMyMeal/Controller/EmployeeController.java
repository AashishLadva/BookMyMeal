package com.Project.BookMyMeal.Controller;

import com.Project.BookMyMeal.Entity.Employee;
import com.Project.BookMyMeal.Service.EmployeeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/employees")
@CrossOrigin(origins = "http://localhost:5173")
@Slf4j
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/add")
    public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee) {
        try {
            Employee savedEmployee = employeeService.saveEmployee(employee);
            return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Error adding employee", e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Employee employee) {
        try {
            boolean isAuthenticated = employeeService.authenticate(employee.getEmail(), employee.getPassword());
            if (isAuthenticated) {
                Optional<Employee> employeeByUserEmail = employeeService.getEmployeeByUserEmail(employee.getEmail());
                return new ResponseEntity<>(employeeByUserEmail.get(), HttpStatus.OK);
            } else {
                // Authentication failed
                return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            log.error("Login failed", e);
            return new ResponseEntity<>("Login failed", HttpStatus.INTERNAL_SERVER_ERROR);
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
