package com.Project.BookMyMeal.Service;

import com.Project.BookMyMeal.DTO.BookingDTO;
import com.Project.BookMyMeal.Entity.*;
import com.Project.BookMyMeal.Repository.*;
import com.Project.BookMyMeal.Util.CouponCodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.*;

@Service
public class MealBookingService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private MealRepository mealRepository;

    @Autowired
    private MealBookingRepository mealBookingRepository;

    @Autowired
    private HolidaysRepository holidaysRepository;

    public boolean isWeekend(LocalDate date) {
        // Check if the day is Saturday or Sunday
        return date.getDayOfWeek() == DayOfWeek.SATURDAY || date.getDayOfWeek() == DayOfWeek.SUNDAY;
    }

    public boolean isHoliday(LocalDate date) {
        return holidaysRepository.existsByDate(date);
    }


    @Transactional
    public void bookMeal(Integer employeeId, Integer mealId, LocalDate startDate, LocalDate endDate) {
        // Fetch employee and meal from repository
        Employee employee = employeeRepository.findById((long) employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        Meal meal = mealRepository.findById(mealId)
                .orElseThrow(() -> new RuntimeException("Meal not found"));

        // Process each day between startDate and endDate
        LocalDate currentDate = startDate;
        while (!currentDate.isAfter(endDate)) {
            // Check if there's an existing booking for the current date
            MealBooking existingBooking = mealBookingRepository.findByEmployee_IdAndMeal_IdAndBookingDate(
                    employee.getId(), meal.getId(), currentDate).orElse(null);

            if (existingBooking != null) {
                // If the booking exis+ts and the status is CANCELLED, update it to BOOKED
                if (existingBooking.getStatus() == MealBooking.BookingStatus.CANCELLED) {
                    existingBooking.setStatus(MealBooking.BookingStatus.BOOKED);
                    existingBooking.setCouponCode(CouponCodeGenerator.generateCouponCode());
                    mealBookingRepository.save(existingBooking);
                } else {
                    // If the meal is already booked and not cancelled, throw an error
                    throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                            "Meal for this date is already booked!");
                }
            } else {
                // If no booking exists for the date, create a new one
                if (!isWeekend(currentDate) && !isHoliday(currentDate)) {
                    // Generate a coupon code for the meal booking
                    String couponCode = CouponCodeGenerator.generateCouponCode();

                    // Create a new meal booking entry for the current date
                    MealBooking mealBooking = new MealBooking();
                    mealBooking.setEmployee(employee);
                    mealBooking.setMeal(meal);
                    mealBooking.setBookingDate(currentDate);
                    mealBooking.setCouponCode(couponCode);
                    mealBooking.setStatus(MealBooking.BookingStatus.BOOKED); // Set status as BOOKED

                    // Save the meal booking
                    mealBookingRepository.save(mealBooking);
                }
            }

            // Move to the next day
            currentDate = currentDate.plusDays(1);
        }
    }


    public void cancelBooking(Long employeeId, Integer mealId, LocalDate date) {
        // Fetch the meal booking based on employee ID, meal ID, and booking date
        MealBooking mealBooking = mealBookingRepository.findByEmployee_IdAndMeal_IdAndBookingDate(employeeId, mealId, date)
                .orElseThrow(() -> new RuntimeException("Booking not found for the specific date."));

        // Set the booking status as CANCELLED
        mealBooking.setStatus(MealBooking.BookingStatus.CANCELLED);
        mealBookingRepository.save(mealBooking);

    }


    public List<LocalDate> viewBooking(Long employeeId, Integer mealId) {
        // Fetch bookings for the given employee and meal
        List<MealBooking> bookings = mealBookingRepository.findByEmployee_IdAndMeal_Id(employeeId, mealId);

        // Create a list to store the booking dates
        List<LocalDate> bookingDates = new ArrayList<>();

        // Iterate through the bookings and collect the booking dates if the status is not CANCELLED
        for (MealBooking booking : bookings) {
            if (booking.getStatus() != MealBooking.BookingStatus.CANCELLED) {
                bookingDates.add(booking.getBookingDate());
            }
        }

        // Return the list of booking dates
        return bookingDates;
    }

    public List<BookingDTO> getBooking(Long employeeId) {

        List<MealBooking> bookings = mealBookingRepository.findByEmployee_Id(employeeId);


        List<BookingDTO> allBookings = new ArrayList<>();

        for (MealBooking booking : bookings) {
            BookingDTO bookingDTO = new BookingDTO();
            if (booking.getStatus() != MealBooking.BookingStatus.CANCELLED) {
                bookingDTO.setDate(booking.getBookingDate());
                bookingDTO.setMealType(String.valueOf(booking.getMeal().getMealType()));
                allBookings.add(bookingDTO);
            }
        }
        return allBookings;
    }

    public List<LocalDate> getAllHolidays() {
        // Fetch all holidays from the repository
        List<Holidays> holidaysDates = holidaysRepository.findAll();

        // Extract dates from the entities
        List<LocalDate> holidays = new ArrayList<>();
        for (Holidays holiday : holidaysDates) {
            holidays.add(holiday.getDate()); // Use getDate() to access the LocalDate field
        }

        return holidays;
    }


}
