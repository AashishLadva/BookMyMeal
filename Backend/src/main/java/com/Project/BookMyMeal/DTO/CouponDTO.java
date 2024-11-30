package com.Project.BookMyMeal.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CouponDTO {
    private String date;
    private String dayOfWeek;
    private String employeeName;
    private Long employeeId;
    private String couponNumber;
}

