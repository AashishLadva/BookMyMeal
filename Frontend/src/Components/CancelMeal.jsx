import React, { useState } from "react";
import Styles from "../Css/Home.module.css";
import { GiMeal } from "react-icons/gi";
import Button from "../Components/Button.jsx";
import CancelPopup from "./CancelPopup.jsx";
import dayjs from "dayjs";

const CancelMeal = ({ selectedDate, onCancel, mealType }) => {
  const [openCancel, setOpenCancel] = useState(false);
  const todayDateTime = dayjs();
  const cancelBtnAvailable = () => {
    if (mealType === "LUNCH") {
      return !(
        (selectedDate.isSame(todayDateTime.add(1, "day"), "day") &&
          todayDateTime.isAfter(todayDateTime.hour(22).minute(0))) ||
        selectedDate.isSame(todayDateTime, "day")
      );
    }
    if (mealType === "DINNER") {
      return !(
        todayDateTime.isAfter(todayDateTime.hour(15).minute(0)) &&
        selectedDate.isSame(todayDateTime, "day")
      );
    }
    return false;
  };

  return (
    <>
      <div
        className={`${Styles["booked-meal-wrapper"]} text-start pt-4 my-2 pb-4 ps-4 animate__animated animate__fadeIn animate__fast`}
      >
        <div className={`${Styles["booked-meal-tp"]}`}>
          <div className="row">
            <div className={`${Styles["meal-title"]} col-10`}>
              <GiMeal className="fs-4 me-1" /> Meal Booked{" "}
            </div>
            <div className={`${Styles["meal-time"]} col-2`}>
              {mealType.toLowerCase()}
            </div>
          </div>
          <div className={`${Styles["meal-dt"]} text-secondary my-1`}>
            {selectedDate.format("DD/MM/YYYY")}
          </div>
        </div>
        <div className="text-center mt-3">
          {cancelBtnAvailable() ? (
            <Button
              buttonName="Cancel Meal"
              className={Styles["cancel-btn"]}
              onClick={() => setOpenCancel(true)}
            />
          ) : (
            <Button
              buttonName="You cannot Cancel today's Meal"
              className={Styles["cancel-btn"]}
            />
          )}
        </div>
      </div>
      {openCancel && (
        <CancelPopup
          handleCloseCancel={() => setOpenCancel(false)}
          onCancel={onCancel}
          mealType={mealType}
          selectedDate={selectedDate}
        />
      )}
    </>
  );
};

export default CancelMeal;
