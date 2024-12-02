package com.Project.BookMyMeal.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "Menu")
@Data
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String dayOfWeek;

    @Enumerated(EnumType.STRING)
    private Meal.MealType mealType;

    private String dishName;

}



