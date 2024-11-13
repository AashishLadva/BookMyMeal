import React, { useState } from "react";
import Styles from "../Css/BookMeal.module.css";
import { FaLocationDot } from "react-icons/fa6";
import Button from "./Button";
import "animate.css";
import "react-datepicker/dist/react-datepicker.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs"; // Import dayjs
import { LicenseInfo } from "@mui/x-license-pro";
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
// import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

const BookMeal = ({ closePopUp }) => {
  LicenseInfo.setLicenseKey(
    "e0d9bb8070ce0054c9d9ecb6e82cb58fTz0wLEU9MzI0NzIxNDQwMDAwMDAsUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y"
  );
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const today = dayjs().add(1,"day"); 
  const maxDate = dayjs().add(3, "month"); 

  const isWeekend = (date) => {
    // console.log(date)
    const day = date.day(); 
    return day === 0 || day === 6;
  };

  const handleChange = (date) => {
    console.log("dsagfd", date);
    const [start, end] = date;
    console.log("start", start);
    console.log("end", end);
    setStartDate(start);
    setEndDate(end);
  };

  const getTotalSelectedDays = () => {
    if (startDate && endDate) {
      let totalDays = 0;
      let currentDate = startDate;

      while (
        currentDate.isBefore(endDate,"day") ||
        currentDate.isSame(endDate, "day")
      ) {
        if (!isWeekend(currentDate)) {
          totalDays++;
        }
        currentDate = currentDate.add(1, "day");
      }

      return totalDays;
    }
    return 0;
  };

  return (
    <div className={`${Styles.mainn} animate__animated animate__zoomIn`}>
      <form>
        <header>
          <h5>Book a Meal</h5>{" "}
          <button
            type="button"
            className="btn-close"
            onClick={closePopUp}
            aria-label="Close"
          ></button>
        </header>
        <div className={`${Styles.slogan} text-start`}>
          <h4>New Booking</h4>
          <p className="text-danger">
            <FaLocationDot /> Vadodara
          </p>
          <p>Booking Type</p>
        </div>
        <div className="my-3 mx-1 col-12">
          <div className={`${Styles.radio} form-check`}>
            <input
              value="Lunch"
              className="form-check-input"
              type="radio"
              name="mealType"
              id="lunch"
            />
            <label className="form-check-label" htmlFor="lunch">
              Lunch
            </label>
          </div>
          <div className={`${Styles.radio} form-check`}>
            <input
              value="Dinner"
              className="form-check-input"
              type="radio"
              name="mealType"
              id="dinner"
            />
            <label className="form-check-label" htmlFor="dinner">
              Dinner
            </label>
          </div>
          <br />
          <div className={`${Styles["select-days"]} text-start my-4`}>
            <p className="text-start my-0">Select days</p>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              
            >
              <DemoContainer components={["SingleInputDateRangeField"]}>
                <DateRangePicker
                  slots={{ field: SingleInputDateRangeField }}
                  value={[startDate, endDate]}
                  onChange={handleChange}
                  shouldDisableDate={isWeekend}
                  minDate={today}
                  maxDate={maxDate} 
                  placeholder="enter date range"
                  calendars={1}
                  
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div>
            <p className="text-start text-secondary my-2">
              Total selected days: {getTotalSelectedDays()}
            </p>
          </div>
          {startDate ? (
            <Button
              type="submit"
              buttonName="Book a Meal"
              className="btn btn-danger w-100 text-center"
            ></Button>
          ) : (
            <Button
              type="submit"
              buttonName="Book a Meal"
              className="btn btn-secondary w-100 text-center"
            ></Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BookMeal;
