package com.Project.BookMyMeal.DTO;

import lombok.Data;

@Data
public class MealBookingDTO {
    private Long mealBookingId;
    private String employeeName;
    private String mealType;
    private String status;
}

