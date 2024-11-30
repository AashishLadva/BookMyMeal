package com.Project.BookMyMeal.Controller;

import com.Project.BookMyMeal.DTO.MenuDTO;
import com.Project.BookMyMeal.Entity.Menu;
import com.Project.BookMyMeal.Service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/menu")
public class MenuController {
    @Autowired
    private MenuService menuService;

    @GetMapping("/{day}")
    public ResponseEntity<?> getMenu(@PathVariable String day) {
        List<MenuDTO> menu = menuService.getMenuByDay(day);
        if (menu == null) {
            return new ResponseEntity<>("No menu found for " + day + ".", HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(menu);
    }
}