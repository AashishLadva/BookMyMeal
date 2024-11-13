import React, { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Styles from "../Css/ViewBookings.module.css";
import "animate.css";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Button from "../Components/Button";
import dayjs from "dayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const ViewBookings = ({ closeViewBooking }) => {
  const [value, setValue] = useState(dayjs("2022-04-17"));
  const [mealType, setmealType] = useState("Meal Type");
  const today = dayjs().subtract(1, "year");
  const maxDate = dayjs();

  const handleChange = (event) => {
    setmealType(event.target.value);
  };

  const [viewCal, setViewCal] = useState(false);
  const handleOnClick = () => {
    setViewCal(true);
  };
  return (
    <div className={`${Styles["view-main"]} animate__animated animate__fadeIn`}>
      <header>
        <h5>View Booking</h5>{" "}
        <button
          type="button"
          className="btn-close"
          onClick={closeViewBooking}
          aria-label="Close"
        ></button>
      </header>
      <div className={Styles["view-bookings"]}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            <div className="mt-4">
              <DatePicker
                style={{ height: "10px" }}
                minDate={today}
                maxDate={maxDate}
                label={'"year"'}
                views={["year"]}
                openTo="year"
              />
            </div>
            <div className="mt-4">
              <DatePicker label={'"month"'} openTo="month" views={["month"]} />
            </div>
            <div className="mt-4">
              <Box sx={{ width: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Meal Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={mealType}
                    label="Meal Type"
                    onChange={handleChange}
                  >
                    <MenuItem value="Lunch">Lunch</MenuItem>
                    <MenuItem value="Dinner">Dinner</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <div className="my-3 text-center">
        <Button
          buttonName="view"
          onClick={handleOnClick}
          className="btn btn-danger w-25"
        />
      </div>
      {viewCal && (
        <div className="text-center">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateCalendar", "DateCalendar"]}>
              <DemoItem>
                <div className="text-center">
                  <DateCalendar
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                  />
                </div>
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
        </div>
      )}
    </div>
  );
};

export default ViewBookings;
