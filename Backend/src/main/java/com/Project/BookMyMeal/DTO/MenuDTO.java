package com.Project.BookMyMeal.DTO;

import com.Project.BookMyMeal.Entity.Meal;
import lombok.Data;

@Data
public class MenuDTO {
    private String mealType;
    private String dishName;
}