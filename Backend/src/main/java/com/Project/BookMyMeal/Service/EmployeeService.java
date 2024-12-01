package com.Project.BookMyMeal.Service;

import com.Project.BookMyMeal.Entity.Employee;
import com.Project.BookMyMeal.Repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;


    @Autowired
    private PasswordEncoder passwordEncoder;

    public Employee saveEmployee(Employee employee) {
        if (employee.getDoj() == null) {
            employee.setDoj(LocalDate.now());
        }
        // Encrypt the password before saving
        employee.setPassword(passwordEncoder.encode(employee.getPassword()));
        return employeeRepository.save(employee);
    }

    public boolean authenticate(String email, String password) {
        Optional<Employee> employeeOptional = employeeRepository.findByEmail(email);

        if (employeeOptional.isPresent()) {
            Employee employee = employeeOptional.get();
            // Check if the password matches using BCrypt
            return passwordEncoder.matches(password, employee.getPassword()) && employee.getEmail().equals(email);
        }
        return false;
    }

    public String changePassword(Long employeeId, String currentPassword, String newPassword) {
        Optional<Employee> employeeOptional = employeeRepository.findById(employeeId);

        if (!employeeOptional.isPresent()) {
            throw new RuntimeException("Employee not found");
        }

        Employee employee = employeeOptional.get();

        // Check if the current password matches the stored password
        if (!passwordEncoder.matches(currentPassword, employee.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        // Encode and set the new password
        employee.setPassword(passwordEncoder.encode(newPassword));

        // Save the updated employee entity
        employeeRepository.save(employee);

        return "Password changed successfully";
    }


    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    public Optional<Employee> getEmployeeByUserName(String userName) {
        return employeeRepository.findByName(userName);
    }

    public Optional<Employee> getEmployeeByUserEmail(String Email) {
        return employeeRepository.findByEmail(Email);
    }

    public Employee findByEmail(String email) {
        return employeeRepository.findByEmail(email).orElse(null);
    }
}