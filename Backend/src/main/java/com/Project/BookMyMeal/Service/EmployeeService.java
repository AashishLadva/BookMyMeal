package com.Project.BookMyMeal.Service;

import com.Project.BookMyMeal.Entity.Employee;
import com.Project.BookMyMeal.Repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public Employee saveEmployee(Employee employee) {
        if (employee.getDoj() == null) {
            employee.setDoj(LocalDate.now());
        }
        return employeeRepository.save(employee);
    }

    public boolean authenticate(String email, String password) {
        Optional<Employee> employeeOptional = employeeRepository.findByEmail(email);

        if (employeeOptional.isPresent()) {
            Employee employee = employeeOptional.get();
            return employee.getPassword().equals(password) && employee.getEmail().equals(email);
        }
        return false;
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

}