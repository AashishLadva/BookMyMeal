import React, { useState } from "react";
import Styles from "../Css/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BookMeal from "../Components/BookMeal";
import "animate.css";
import Button from "../Components/Button";
import Calender from "../Components/Calender";
import { FaLocationDot } from "react-icons/fa6";
import { GiMeal } from "react-icons/gi";
import dayjs from "dayjs";
import ViewBookings from "../Components/ViewBookings";

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

  
  const lunch = ["chole", "Giloda", "Punjabi dal", "Rice", "roti"];
  const dinner = ["Choli Red", "Paneer Tikka", "Veg Pulao", "Curd", "Roti"];
  const note = "Menu is subject to change on basis of availability.";

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
            <div
              className={`${Styles["booked-meal-wrapper"]} text-start pt-4 pb-4 ps-4`}
            >
              <div className={`${Styles["booked-meal-tp"]}`}>
                <div className="row">
                  <div className={`${Styles["meal-title"]} col-10`}>
                    <GiMeal className="fs-4 me-1"/> Meal Booked{" "}
                  </div>
                  <div className={`${Styles["meal-time"]} col-2 `}>
                    Lunch
                  </div>
                </div>
                <div className={`${Styles["meal-dt"]} text-secondary my-1`}>
                  {selectedDate
                    ? selectedDate.format("DD/MM/YYYY")
                    : new Date().toLocaleDateString()}
                </div>
              </div>
              <div className="text-center mt-3">
                <Button
                  buttonName="Cancel Meal"
                  className={Styles["cancel-btn"]}
                ></Button>
              </div>
            </div>
            <div className="text-start mx-2 my-3">
              <h5>Meal of the day</h5>
              <div className={`${Styles.food} row text-light`}>
                <div className="col-6">
                  <h4>Lunch</h4>
                  <ul>
                    {lunch.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="col-6">
                  <h4>Dinner</h4>
                  <ul>
                    {dinner.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <footer>{note}</footer>
              </div>
            </div>
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
