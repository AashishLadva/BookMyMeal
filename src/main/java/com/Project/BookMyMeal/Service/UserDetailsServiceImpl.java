package com.Project.BookMyMeal.Service;

import com.Project.BookMyMeal.Entity.Employee;
import com.Project.BookMyMeal.Repository.EmployeeRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final EmployeeRepository employeeRepository;

    public UserDetailsServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        Employee employee = employeeRepository.findByName(userName)
                .orElseThrow(() -> new UsernameNotFoundException("Employee not found with userName: " + userName));

        return User.builder()
                .username(userName)
                .password(employee.getPassword())
                .roles(employee.getRole())
                .build();
    }
}

