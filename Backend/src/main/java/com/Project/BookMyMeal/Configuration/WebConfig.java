package com.Project.BookMyMeal.Configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Allow CORS requests from the frontend
        registry.addMapping("/**") // Allow all endpoints
                .allowedOrigins("http://localhost:5173") // React frontend
                .allowedMethods("GET", "POST", "PUT", "DELETE") // HTTP methods to allow
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(true); // If you need cookies/session

    }
}

