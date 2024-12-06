package com.Project.BookMyMeal.Controller;

import com.Project.BookMyMeal.DTO.BookingDTO;
import com.Project.BookMyMeal.DTO.MealRequestDTO;
import com.Project.BookMyMeal.Service.MealBookingService;
import com.Project.BookMyMeal.Util.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/meal-booking")
@Slf4j
public class MealBookingController {

    @Autowired
    private MealBookingService mealBookingService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/booking")
    public ResponseEntity<?> bookMeal(@RequestBody MealRequestDTO bookingRequest) {

        try {
            mealBookingService.bookMeal(
                    bookingRequest.getEmployeeId(),
                    bookingRequest.getMealId(),
                    bookingRequest.getStartDate(),
                    bookingRequest.getEndDate()
            );
            return new ResponseEntity<>("Meal Booked Successfully!", HttpStatus.CREATED);
        } catch (ResponseStatusException ex) {
            return new ResponseEntity<>(ex.getReason(), ex.getStatusCode());
        } catch (RuntimeException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/{employeeId}/{mealId}/{date}/cancel-booking")
    public ResponseEntity<?> cancelBooking(@PathVariable("employeeId") Long employeeId,
                                           @PathVariable("mealId") Integer mealId,
                                           @PathVariable("date") LocalDate date) {
        try {
            mealBookingService.cancelBooking(employeeId, mealId, date);
            return new ResponseEntity<>("Meal cancelled successfully!", HttpStatus.OK);
        } catch (IllegalStateException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.FORBIDDEN);
        } catch (RuntimeException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{employeeID}/{mealID}/view-booking")
    public ResponseEntity<?> viewBooking(@PathVariable("employeeID") Long employeeID,
                                         @PathVariable("mealID") Integer mealID) {

        List<LocalDate> bookings = mealBookingService.viewBooking(employeeID, mealID);
        if (!bookings.isEmpty()) {
            return new ResponseEntity<>(bookings, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{employeeID}/display-booking")
    public ResponseEntity<?> getBookings(@PathVariable("employeeID") Long employeeID) {

        try {
            List<BookingDTO> booking = mealBookingService.getBooking(employeeID);
            return new ResponseEntity<>(booking, HttpStatus.OK);
        } catch (ResponseStatusException ex) {
            return new ResponseEntity<>(ex.getReason(), ex.getStatusCode());
        } catch (RuntimeException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/getHolidays")
    public ResponseEntity<?> getAllHolidays() {
        List<LocalDate> holidays = mealBookingService.getAllHolidays();
        return new ResponseEntity<>(holidays, HttpStatus.OK);
    }
}