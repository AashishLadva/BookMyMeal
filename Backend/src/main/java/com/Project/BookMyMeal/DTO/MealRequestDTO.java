package com.Project.BookMyMeal.DTO;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class MealRequestDTO {

    private Integer employeeId;
    private Integer mealId;
    private LocalDate startDate;
    private LocalDate endDate;
}
