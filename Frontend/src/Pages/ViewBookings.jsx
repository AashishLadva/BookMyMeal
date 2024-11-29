import React, { useContext, useEffect, useState } from "react";
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
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { contextProvider } from "../Utils/ValidationsAndItemsProvider";
import Cookie from "js-cookie";
import axios from "axios";
import { Badge } from "@mui/material";
import { PickersDay } from "@mui/x-date-pickers";
import Spinner from "../Components/Spinner";
import '../Css/ViewBookingForCalender.css'

const ViewBookings = ({ closeViewBooking }) => {
  const [value, setValue] = useState(dayjs());
  const [viewCal, setViewCal] = useState(false);
  const { isWeekend } = useContext(contextProvider);
  const [mealType, setmealType] = useState("Lunch");
  const minDate = dayjs().subtract(1, "year");
  const maxDate = dayjs();

  const [bookedDate, setBookedDate] = useState([]);
  const {id} = JSON.parse(Cookie.get("UserCookie"));
  const [loading, setLoading] = useState(false);
  const [showYear, setShowYear] = useState(dayjs().year());
  const [showMonth, setShowMonth] = useState(dayjs().month());

  useEffect(() => {
    const fetchMealBookings = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/meal-booking/view-booking/${id}/${
            mealType === "Lunch" ? 1 : 2
          }`
        );
        if (response.status === 200) {
          setBookedDate(response.data.map((date) => dayjs(date)));
        }
      } catch (error) {
        console.error("Error fetching meal bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMealBookings();
  }, [mealType, showMonth, showYear]);

  const CustomDay = (props) => {
    const { day, outsideCurrentMonth, ...other } = props;
    const isEmojiDay = bookedDate.some((emojiDay) =>
      emojiDay.isSame(day, "day")
    );

    return (
      <Badge
        key={day.toString()}
        overlap="circular"
        badgeContent={isEmojiDay && !outsideCurrentMonth ? "🟢" : undefined}
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
    <>
      <div
        className={`${Styles["view-main"]} animate__animated animate__fadeIn animate__fast`}
      >
        <header>
          <h5>View Booking</h5>{" "}
          <Button
            type="button"
            className="btn-close"
            onClick={closeViewBooking}
          />
        </header>
        <div className={Styles["view-bookings"]}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <div className="mt-4">
                <DatePicker
                  minDate={minDate}
                  maxDate={maxDate}
                  value={dayjs().year(showYear)}
                  label="Year"
                  views={["year"]}
                  openTo="year"
                  onChange={(year) => setShowYear(year.year())}
                />
              </div>
              <div className="mt-4">
                <DatePicker
                  value={dayjs().month(showMonth)}
                  onChange={(month) => setShowMonth(month.month())}
                  label="Month"
                  openTo="month"
                  views={["month"]}
                />
              </div>
              <div className="mt-4">
                <Box sx={{ width: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" >
                      Meal Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={mealType}
                      label="Meal Type"
                      onChange={(e) => setmealType(e.target.value)}
                      
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
            onClick={() => setViewCal(true)}
            className="btn btn-danger w-25"
          />
        </div>
        {viewCal && (
          <div className="text-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="custom-calendar">
                <DateCalendar className={Styles["Mui-selected"]}
                  value={dayjs()
                    .year(showYear)
                    .month(showMonth)}
                  minDate={dayjs()
                    .year(showYear)
                    .month(showMonth)
                    .subtract(2,"month")}
                  maxDate={dayjs()
                    .year(showYear)
                    .month(showMonth)
                    .add(2,"month")}
                  onChange={(newValue) => setValue(newValue)}
                  shouldDisableDate={isWeekend}
                  slots={{
                    day: CustomDay,
                  }}
                />
              </div>
            </LocalizationProvider>
          </div>
        )}
      </div>
      {loading && <Spinner />}
    </>
  );
};

export default ViewBookings;