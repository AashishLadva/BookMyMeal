package com.Project.BookMyMeal.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "meals")
public class Meal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MealType mealType;

    public enum MealType {
        LUNCH, DINNER
    }
}
