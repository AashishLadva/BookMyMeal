import React, { useState } from "react";
import Styles from "../Css/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BookMeal from "../Components/BookMeal";
import "animate.css";
import Button from "../Components/Button";
import Calender from "../Components/Calender";
import { FaLocationDot } from "react-icons/fa6";
import dayjs from "dayjs";
import ViewBookings from "../Components/ViewBookings";
import CancelMeal from "../Components/CancelMeal";
import MealOfTheDay from "../Components/MealOfTheDay";

const Home = () => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const handleOnclick = () => {
    setOpenPopUp(true);
  };
  const closePopUp = () => {
    setOpenPopUp(false);
  };

  const [openViewBooking, setOpenViewBooking] = useState(false);
  const handleOnClick=()=>{
    setOpenViewBooking(true);
  }
  const closeViewBooking=()=>{
    setOpenViewBooking(false);
  }

  const [selectedDate, setselectedDate] = useState(null);
  const handleOnChange = (date) => {
    setselectedDate(date);
    console.log("jp",date);
  };
  return (
    <>
    {openViewBooking && <ViewBookings closeViewBooking={closeViewBooking}/>}
      <div className={`${Styles["book-main"]} container-xl text-center my-5`}>
        <div className="row mb-3">
          <div className="col-6 text-start">
            <Button
              buttonName="View Booking"
              className="btn btn-danger"
              onClick={handleOnClick}
            ></Button>
          </div>
          <div
            className="text-danger col-6 text-end"
            style={{ fontWeight: "600" }}
          >
            <FaLocationDot /> Vadodara
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Calender handleOnChange1={handleOnChange} />
          </div>
          <div className="col-md-6">
            <p className={Styles.date}>
              {selectedDate
                ? selectedDate.format("dddd, MMMM D, YYYY")
                : dayjs().format("dddd, MMMM D, YYYY")}
            </p>
            <CancelMeal selectedDate={selectedDate} />
            <MealOfTheDay />
          </div>
        </div>
        <Button
          className="btn btn-danger mt-4"
          buttonName="Book a meal"
          onClick={handleOnclick}
        ></Button>
        {openPopUp && <BookMeal closePopUp={closePopUp} />}
      </div>
    </>
  );
};

export default Home;
