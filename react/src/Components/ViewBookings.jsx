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

const ViewBookings = ({ closeViewBooking }) => {
  const [mealType, setmealType] = useState("Select Meal Type");

  const handleChange = (event) => {
    setmealType(event.target.value);
  };
  return (
    <div className={`${Styles["view-main"]} animate__animated animate__zoomIn`}>
      <header>
        <h5>View Booking</h5>{" "}
        <button
          type="button"
          className="btn-close"
          onClick={closeViewBooking}
          aria-label="Close"
        ></button>
      </header>
      <div className="row">
        <div className="col-8">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker label={'"year"'} views={["year"]} openTo="year" />
              <DatePicker label={'"month"'} openTo="month" views={["month"]} />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div className="col-2 mt-2">
          <Box sx={{ width: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Meal Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={mealType}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value="Lunch">Lunch</MenuItem>
                <MenuItem value="Dinner">Dinner</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default ViewBookings;
