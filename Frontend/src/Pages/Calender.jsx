import React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import "../Css/Calender.css";
import { Badge } from "@mui/material";
import { PickersDay } from "@mui/x-date-pickers";

const Calender = ({ handleOnChange1,bookedDate,isWeekend }) => {
 
  const today = dayjs();
  const maxDate = today.add(3, "month");

  const CustomDay = (props) => {
    const { day, outsideCurrentMonth, ...other } = props;

    const greenDot = bookedDate.some((dot) => dot.date.isSame(day, "day"));

    return (
      <Badge
        key={day.toString()}
        overlap="circular"
        badgeContent={greenDot && !outsideCurrentMonth ? "🟢" : undefined}
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
