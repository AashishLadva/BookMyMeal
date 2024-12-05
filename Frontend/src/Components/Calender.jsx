import React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import "../Css/Calender.css";
import { Badge } from "@mui/material";
import { PickersDay } from "@mui/x-date-pickers";
import L from "../assets/L.png";
import D from "../assets/D.png";
import LAndD from "../assets/L&D.png";

const Calender = ({ handleOnChange1, bookedDate, isWeekend }) => {
  const today = dayjs();
  const maxDate = today.add(3, "month");
  const CustomDay = (props) => {
    const { day, outsideCurrentMonth, ...other } = props;
  
    const bookingsForDay = bookedDate.filter((dot) =>
      dayjs(dot.date).isSame(day, "day")
    );
    
    const hasLunch = bookingsForDay.some((item) => item.mealType === "LUNCH");
    const hasDinner = bookingsForDay.some((item) => item.mealType === "DINNER");
  
    const badgeContent =
      !outsideCurrentMonth && bookingsForDay.length > 0 ? (
        hasLunch && hasDinner ? (
          <img src={LAndD} alt="Lunch and Dinner" width="18" height="16" />
        ) : hasLunch ? (
          <img src={L} alt="Lunch" width="18" height="16" />
        ) : hasDinner ? (
          <img src={D} alt="Dinner" width="18" height="16" />
        ) : null
      ) : null;
  
    return (
      <Badge
        key={day.toString()}
        overlap="circular"
        badgeContent={badgeContent}
      >
        <PickersDay
          {...other}
          day={day}
          outsideCurrentMonth={outsideCurrentMonth}
        />
      </Badge>
    );
  };
  

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="calendar-container">
        <DateCalendar
          minDate={today}
          maxDate={maxDate}
          shouldDisableDate={isWeekend}
          onChange={(date) => handleOnChange1(date)}
          slots={{
            day: CustomDay,
          }}
        />
      </div>
    </LocalizationProvider>
  );
};

export default Calender;
