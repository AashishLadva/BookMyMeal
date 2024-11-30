package com.Project.BookMyMeal.Service;

import com.Project.BookMyMeal.DTO.CouponDTO;
import com.Project.BookMyMeal.Entity.MealBooking;
import com.Project.BookMyMeal.Repository.MealBookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class CouponService {

    @Autowired
    private MealBookingRepository mealBookingRepository;

    public List<CouponDTO> getCoupons() {
        List<CouponDTO> couponList = new ArrayList<>();
        List<MealBooking> bookings = mealBookingRepository.findAll();

        for (MealBooking booking : bookings) {
            String dayOfWeek = booking.getBookingDate().getDayOfWeek().name(); // Get day of the week
            String formattedDate = booking.getBookingDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

            CouponDTO couponDTO = new CouponDTO();
            couponDTO.setDate(formattedDate);
            couponDTO.setDayOfWeek(dayOfWeek);
            couponDTO.setEmployeeName(booking.getEmployee().getName());
            couponDTO.setEmployeeId(booking.getEmployee().getId());
            couponDTO.setCouponNumber(booking.getCouponCode());

            couponList.add(couponDTO);
        }

        return couponList;
    }
}
