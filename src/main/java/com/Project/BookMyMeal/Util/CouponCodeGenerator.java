package com.Project.BookMyMeal.Util;

import java.util.UUID;

public class CouponCodeGenerator {
    public static String generateCouponCode() {
        return UUID.randomUUID().toString().substring(0, 8).toUpperCase(); // 8-char unique code
    }
}

