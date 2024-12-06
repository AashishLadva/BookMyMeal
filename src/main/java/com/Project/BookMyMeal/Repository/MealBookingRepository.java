package com.Project.BookMyMeal.Repository;

import com.Project.BookMyMeal.Entity.MealBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface MealBookingRepository extends JpaRepository<MealBooking, Integer> {

    List<MealBooking> findByEmployee_IdAndMeal_Id(Long employeeId, Integer mealId);

    Optional<MealBooking> findByEmployee_IdAndMeal_IdAndBookingDate(Long employeeId, Integer mealId, LocalDate bookingDate);

    List<MealBooking> findByEmployee_Id(Long employeeId);

    boolean existsByCouponCode(String newCouponCode);

    Optional<MealBooking> findByEmployee_IdAndMealIdAndBookingDate(Long employeeId, Integer mealId, LocalDate date);
}



