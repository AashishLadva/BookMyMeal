import React, { useState, useEffect, useRef, useContext } from "react";
import dayjs from "dayjs";
import Styles from "../Css/BookMeal.module.css";
import { FaLocationDot } from "react-icons/fa6";
import Button from "../Components/Button";
import "animate.css";
import "react-datepicker/dist/react-datepicker.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LicenseInfo } from "@mui/x-license-pro";
import { contextProvider } from "../Utils/ValidationsAndItemsProvider";
import InputField from "../Components/InputField";
import cookies from "js-cookie";
import { SuccessToast } from "../Constants/general";
import { ToastContainer, toast } from "react-toastify";
import { toastStyle } from "../Constants/general";
import axios from "axios";
import Spinner from "../Components/Spinner";

const BookMeal = ({ closePopUp }) => {
  LicenseInfo.setLicenseKey(
    "e0d9bb8070ce0054c9d9ecb6e82cb58fTz0wLEU9MzI0NzIxNDQwMDAwMDAsUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y"
  );
  const { isWeekend, isBookingDinner, isBookingLunch } =
    useContext(contextProvider);
  const [startDate, setStartDate] = useState(null);
  const [mealType, setMealType] = useState("Lunch");
  const [endDate, setEndDate] = useState(null);
  const { id } = JSON.parse(cookies.get("UserCookie"));

  const today = dayjs().add(1, "day");
  const maxDate = dayjs().add(3, "month");
  const [loading, setLoading] = useState(false);

  const handleChange = (date) => {
    const [start, end] = date;
    setStartDate(dayjs(start));
    setEndDate(dayjs(end));
  };

  const getTotalSelectedDays = () => {
    if (startDate && endDate) {
      let totalDays = 0;
      let currentDate = startDate;
      while (
        currentDate.isBefore(endDate, "day") ||
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

  const shouldDisableDate = (date) => {
    if (
      (mealType === "Dinner" &&
        date.isSame(dayjs(), "day") &&
        !isBookingDinner()) ||
      (mealType === "Lunch" && date.isSame(today, "day") && !isBookingLunch())
    ) {
      return true;
    }
    return isWeekend(date);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      toast.error("Please fill all fields", toastStyle);
      return;
    }
    setLoading(true);
    try {
      const data = {
        employeeId: id,
        mealId: parseInt(mealType === "Lunch" ? 1 : 2),
        startDate: startDate.format("YYYY-MM-DD"),
        endDate: endDate.format("YYYY-MM-DD"),
      };
      const response = await axios.post(
        "http://localhost:8080/meal-booking/booking",
        data
      );
      if (response.status === 201) {
        toast.success(response.data, SuccessToast);
        setTimeout(() => closePopUp(), 1800);
      } else {
        toast.error("Failed to book meal!", toastStyle);
      }
    } catch (error) {
      if (error.status === 403) {
        toast.error(
          "Failed to book meal: " + (error.response?.data || error.message),
          toastStyle
        );
      } else {
        toast.error(
          "Something Went Wrong",
          toastStyle
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className={`${Styles.mainn} animate__animated animate__zoomIn animate__fast`}
      >
        <form onSubmit={handleOnSubmit}>
          <header>
            <h5>Book a Meal</h5>{" "}
            <Button
              type="button"
              className="btn-close"
              onClick={closePopUp}
              aria-label="Close"
            />
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
              <InputField
                value="Lunch"
                className="form-check-input"
                type="radio"
                name="mealType"
                id="lunch"
                checked={mealType === "Lunch"}
                onChange={() => setMealType("Lunch")}
              />
              <label className="form-check-label" htmlFor="lunch">
                Lunch
              </label>
            </div>
            <div className={`${Styles.radio} form-check`}>
              <InputField
                value="Dinner"
                className="form-check-input"
                type="radio"
                name="mealType"
                id="dinner"
                checked={mealType === "Dinner"}
                onChange={() => setMealType("Dinner")}
              />
              <label className="form-check-label" htmlFor="dinner">
                Dinner
              </label>
            </div>
            <br />
            <div className={`${Styles["select-days"]} text-start my-4`}>
              <p className="text-start my-0">Select days</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["SingleInputDateRangeField"]}>
                  <DateRangePicker
                    slots={{ field: SingleInputDateRangeField }}
                    value={[startDate, endDate]}
                    onChange={handleChange}
                    shouldDisableDate={shouldDisableDate}
                    minDate={mealType == "Lunch" ? today : dayjs()}
                    maxDate={maxDate}
                    placeholder="Enter date range"
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
                buttonName="Select Date"
                className="btn btn-secondary w-100 text-center"
              ></Button>
            )}
          </div>
        </form>
      </div>
      <ToastContainer />
      {loading && <Spinner />}
    </>
  );
};

export default BookMeal;
