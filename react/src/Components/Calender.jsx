import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import "../Css/Calender.css";

const Calender = ({handleOnChange1}) => {
  const today = dayjs();
  const maxDate = dayjs().add(3, "month");

  const weekends = (date) => {
    const day = date.day();
    return day === 0 || day === 6;
  };

  const handleOnChange = (date) => {
    handleOnChange1(date)
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="calendar-container">
        <DateCalendar
          style={{ width: "100%" }}
          minDate={today}
          maxDate={maxDate}
          shouldDisableDate={weekends}
          onChange={handleOnChange}
        />
      </div>
    </LocalizationProvider>
  );
};

export default Calender;
