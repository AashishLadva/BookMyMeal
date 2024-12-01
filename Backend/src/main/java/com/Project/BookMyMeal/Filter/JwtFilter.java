package com.Project.BookMyMeal.Filter;

import com.Project.BookMyMeal.Entity.Employee;
import com.Project.BookMyMeal.Repository.EmployeeRepository;
import com.Project.BookMyMeal.Util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        String username = null;
        String token = null;

        try {
            // Extract the token and username
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7);
                username = jwtUtil.extractUsername(token);
            }

            // Authenticate the user if username is valid and no authentication exists
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                if (jwtUtil.validateToken(token)) {
                    var authToken = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);

                    // Find employee by username and set the user ID and username in cookies
                    Optional<Employee> employeeOptional = employeeRepository.findByName(userDetails.getUsername());
                    if (employeeOptional.isPresent()) {
                        Employee employee = employeeOptional.get();
                        String userId = String.valueOf(employee.getId());
                        String userName = employee.getName();

                        // Create cookies to store the user ID and username
                        Cookie userIdCookie = new Cookie("UserId", userId);
                        userIdCookie.setHttpOnly(true);
                        userIdCookie.setSecure(true); // Set to true in production to use HTTPS
                        userIdCookie.setPath("/"); // Available for all paths
                        userIdCookie.setMaxAge(1800); // Expires in 30 minutes

                        Cookie userNameCookie = new Cookie("UserName", userName);
                        userNameCookie.setHttpOnly(true);
                        userNameCookie.setSecure(true); // Set to true in production to use HTTPS
                        userNameCookie.setPath("/"); // Available for all paths
                        userNameCookie.setMaxAge(1800); // Expires in 30 minutes

                        response.addCookie(userIdCookie);
                        response.addCookie(userNameCookie);
                    }
                }
            }
        } catch (Exception e) {
            // Log the error and handle the exception
            logger.error("Failed to process JWT token", e);
        }

        // Continue with the filter chain
        chain.doFilter(request, response);
    }
}

