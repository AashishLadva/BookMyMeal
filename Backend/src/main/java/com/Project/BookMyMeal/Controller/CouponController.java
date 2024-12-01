package com.Project.BookMyMeal.Controller;

import com.Project.BookMyMeal.Service.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/coupons")
public class CouponController {

    @Autowired
    private CouponService couponService;

    @GetMapping("/getCouponDetails/{employeeId}/{mealId}/{date}")
    public ResponseEntity<String> getCoupons(@PathVariable("employeeId") Long employeeId,
                                             @PathVariable("mealId") Integer mealId,
                                             @PathVariable("date") LocalDate date) {
        try {
            String couponCode = couponService.getCouponCode(employeeId, mealId, date);
            return new ResponseEntity<>(couponCode, HttpStatus.OK);
        } catch (RuntimeException ex) {
            // Return an error response if no coupon code is found or any other issue
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

}

