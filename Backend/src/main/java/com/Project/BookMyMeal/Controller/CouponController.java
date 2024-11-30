package com.Project.BookMyMeal.Controller;

import com.Project.BookMyMeal.DTO.CouponDTO;
import com.Project.BookMyMeal.Service.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/coupons")
public class CouponController {

    @Autowired
    private CouponService couponService;

    @GetMapping("/getCouponDetails")
    public List<CouponDTO> getCoupons() {
        return couponService.getCoupons();
    }
}

