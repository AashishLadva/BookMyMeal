import React from "react";
import Styles from "../Css/Home.module.css";
import { GiMeal } from "react-icons/gi";
import Button from "../Components/Button.jsx";
import dayjs from "dayjs";

const CancelMeal = ({selectedDate,}) => {
  return (
    <>
      <div
        className={`${Styles["booked-meal-wrapper"]} text-start pt-4 pb-4 ps-4`}
      >
        <div className={`${Styles["booked-meal-tp"]}`}>
          <div className="row">
            <div className={`${Styles["meal-title"]} col-10`}>
              <GiMeal className="fs-4 me-1" /> Meal Booked{" "}
            </div>
            <div className={`${Styles["meal-time"]} col-2 `}>Lunch</div>
          </div>
          <div className={`${Styles["meal-dt"]} text-secondary my-1`}>
            {selectedDate
              ? selectedDate.format("DD/MM/YYYY")
              : dayjs().format("DD/MM/YYYY")}
          </div>
        </div>
        <div className="text-center mt-3">
          <Button
            buttonName="Cancel Meal"
            className={Styles["cancel-btn"]}
          ></Button>
        </div>
      </div>
    </>
  );
};

export default CancelMeal;
