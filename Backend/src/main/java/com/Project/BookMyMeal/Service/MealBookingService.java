package com.Project.BookMyMeal.Service;

import com.Project.BookMyMeal.DTO.BookingDTO;
import com.Project.BookMyMeal.Entity.*;
import com.Project.BookMyMeal.Repository.*;
import com.Project.BookMyMeal.Util.CouponCodeGenerator;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @Autowired
    private EmailService emailService;

    public boolean isWeekend(LocalDate date) {
        // Check if the day is Saturday or Sunday
        return date.getDayOfWeek() == DayOfWeek.SATURDAY || date.getDayOfWeek() == DayOfWeek.SUNDAY;
    }

    public boolean isHoliday(LocalDate date) {
        return holidaysRepository.existsByDate(date);
    }


    @Transactional
    public void bookMeal(Integer employeeId, Integer mealId, LocalDate startDate, LocalDate endDate) {
        Employee employee = employeeRepository.findById((long) employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        Meal meal = mealRepository.findById(mealId)
                .orElseThrow(() -> new RuntimeException("Meal not found"));

        boolean isBookingSuccessful = false;
        LocalDate currentDate = startDate;

        while (!currentDate.isAfter(endDate)) {
            MealBooking existingBooking = mealBookingRepository.findByEmployee_IdAndMeal_IdAndBookingDate(
                    employee.getId(), meal.getId(), currentDate).orElse(null);

            if (existingBooking != null) {
                if (existingBooking.getStatus() == MealBooking.BookingStatus.CANCELLED) {
                    // Status change: Update from CANCELLED to BOOKED
                    existingBooking.setStatus(MealBooking.BookingStatus.BOOKED);

                    // Generate a unique coupon code if needed
                    String newCouponCode;
                    do {
                        newCouponCode = CouponCodeGenerator.generateCouponCode();
                    } while (mealBookingRepository.existsByCouponCode(newCouponCode));

                    existingBooking.setCouponCode(newCouponCode);
                    mealBookingRepository.save(existingBooking);
                    isBookingSuccessful = true;
                } else {
                    throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                            "Meal for this date is already booked!");
                }
            } else {
                if (!isWeekend(currentDate) && !isHoliday(currentDate)) {
                    // Create a new booking
                    String couponCode;
                    do {
                        couponCode = CouponCodeGenerator.generateCouponCode();
                    } while (mealBookingRepository.existsByCouponCode(couponCode));

                    MealBooking mealBooking = new MealBooking();
                    mealBooking.setEmployee(employee);
                    mealBooking.setMeal(meal);
                    mealBooking.setBookingDate(currentDate);
                    mealBooking.setCouponCode(couponCode);
                    mealBooking.setStatus(MealBooking.BookingStatus.BOOKED);

                    mealBookingRepository.save(mealBooking);
                    isBookingSuccessful = true;
                }
            }

            currentDate = currentDate.plusDays(1);
        }

        if (isBookingSuccessful) {
            String subject = "Meal Booking Confirmation";
            String body = String.format(
                    "Your meal '%s' has been successfully booked for the date range: %s - %s.",
                    meal.getMealType(), startDate, endDate);

            try {
                emailService.sendEmail(employee.getEmail(), subject, body);
            } catch (MessagingException e) {
                System.err.println("Failed to send booking confirmation email: " + e.getMessage());
            }
        }
    }

    @Transactional
    public void cancelBooking(Long employeeId, Integer mealId, LocalDate date) {
        MealBooking mealBooking = mealBookingRepository.findByEmployee_IdAndMeal_IdAndBookingDate(employeeId, mealId, date)
                .orElseThrow(() -> new RuntimeException("Booking not found for the specific date."));

        if (mealBooking.getStatus() == MealBooking.BookingStatus.CANCELLED) {
            throw new IllegalStateException("Meal is not found for this date.");
        }

        mealBooking.setStatus(MealBooking.BookingStatus.CANCELLED);
        mealBookingRepository.save(mealBooking);

        String userEmail = mealBooking.getEmployee().getEmail();
        String mealName = String.valueOf(mealBooking.getMeal().getMealType());
        String subject = "Meal Booking Cancellation";
        String body = String.format("Your meal booking for '%s' on %s has been successfully canceled.", mealName, date);

        try {
            emailService.sendEmail(userEmail, subject, body);
        } catch (MessagingException e) {
            System.err.println("Failed to send email: " + e.getMessage());
        }
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
