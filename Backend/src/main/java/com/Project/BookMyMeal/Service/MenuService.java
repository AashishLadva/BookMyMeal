package com.Project.BookMyMeal.Service;

import com.Project.BookMyMeal.DTO.MenuDTO;
import com.Project.BookMyMeal.Entity.Menu;
import com.Project.BookMyMeal.Repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MenuService {
    @Autowired
    private MenuRepository menuRepository;

    public List<MenuDTO> getMenuByDay(String dayOfWeek) {
        List<Menu> menuOfDay = menuRepository.findByDayOfWeek(dayOfWeek);

        if (menuOfDay.isEmpty()) {
            return null;
        }
        List<MenuDTO> menuDTOList = new ArrayList<>();
        for (Menu menu : menuOfDay) {
            MenuDTO menuDTO = new MenuDTO();
            menuDTO.setMealType(String.valueOf(menu.getMealType()));
            menuDTO.setDishName(menu.getDishName());

            menuDTOList.add(menuDTO);
        }

        return menuDTOList;
    }
}
