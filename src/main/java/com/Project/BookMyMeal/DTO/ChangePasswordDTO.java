package com.Project.BookMyMeal.DTO;

import lombok.Data;

@Data
public class ChangePasswordDTO {
    private Long employeeId;
    private String currentPassword;
    private String newPassword;
}
