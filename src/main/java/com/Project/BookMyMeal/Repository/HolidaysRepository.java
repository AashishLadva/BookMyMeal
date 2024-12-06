package com.Project.BookMyMeal.Repository;

import com.Project.BookMyMeal.Entity.Holidays;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;


@Repository
public interface HolidaysRepository extends JpaRepository<Holidays, Long> {
    boolean existsByDate(LocalDate date);
}

