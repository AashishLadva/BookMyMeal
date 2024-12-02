package com.Project.BookMyMeal.Service;

import com.Project.BookMyMeal.Entity.MealBooking;
import com.Project.BookMyMeal.Repository.MealBookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;


@Service
public class CouponService {

    @Autowired
    private MealBookingRepository mealBookingRepository;

    public String getCouponCode(Long employeeId, Integer mealId, LocalDate date) {
        // Find a meal booking matching the given employeeId, mealType, and date
        MealBooking booking = mealBookingRepository.findByEmployee_IdAndMealIdAndBookingDate(employeeId, mealId, date)
                .orElseThrow(() -> new RuntimeException("No booking found for the specified parameters."));

        // Return the coupon code if a matching booking is found
        return booking.getCouponCode();
    }

}
