package com.Project.BookMyMeal.DTO;

import lombok.Data;

import java.time.LocalDate;

@Data
public class BookingDTO {
    private LocalDate date;
    private String mealType;
}
