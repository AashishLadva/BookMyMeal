import React, { useContext, useState } from "react";
import Styles from "../Css/QuickMeal.module.css";
import Button from "../Components/Button";
import InputField from "../Components/InputField";
import { contextProvider } from "../Utils/ValidationsAndItemsProvider";
import dayjs from "dayjs";
import cookies from "js-cookie";
import { toastStyle } from "../Constants/general";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Spinner from "../Components/Spinner";
import { useNavigate } from "react-router-dom";

const QuickMeal = ({ closeQuickMeal, selectedDate,isWeekend }) => {
  const { isBookingDinner, isAuthenticate } =
    useContext(contextProvider);
  const [mealType, setMealType] = useState(null);
  const { id } = JSON.parse(cookies.get("UserCookie"));
  const [loading, setLoading] = useState(false);
  const todayDateTime = dayjs();
  const token = sessionStorage.getItem("authToken");
  const navigate = useNavigate();

  const isBookingLunch = () => {
    const timeOut = todayDateTime.hour(12).minute(0);
    return todayDateTime.isBefore(timeOut);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
      setLoading(true);
      try {
        const data = {
          employeeId: id,
          mealId: parseInt(mealType === "Lunch" ? 1 : 2),
          startDate: todayDateTime.format("YYYY-MM-DD"),
          endDate: todayDateTime.format("YYYY-MM-DD"),
        };
        const response = await axios.post(
          "http://localhost:8080/meal-booking/booking",
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201) {
          toast.success(response.data, toastStyle);
          setTimeout(() => closeQuickMeal(), 1800);
        } else {
          toast.error("Failed to book meal!", toastStyle);
        }
      } catch (error) {
        if (error.response.status === 401) {
          cookies.remove("UserCookie");
          sessionStorage.removeItem("authToken");
          toast.error("Session Timeout Please Login Again", toastStyle);
          navigate("/login");
        } else if (error.response && error.response.status === 403) {
          toast.error(
            "Failed to book meal: " + (error.response?.data || error.message),
            toastStyle
          );
        } else {
          toast.error(error.message, toastStyle);
        }
      } finally {
        setLoading(false);
      }
  };
  return (
    <>
      <div
        className={`${Styles["quick-main"]} animate__animated animate__zoomIn animate__fast`}
      >
        <form onSubmit={handleOnSubmit}>
          <header>
            <h5>Book a Meal</h5>{" "}
            <Button
              type="button"
              className="btn-close"
              onClick={closeQuickMeal}
              aria-label="Close"
            />
          </header>
          <div className={`${Styles.slogan} text-start my-3`}>
            <h4>Quick Booking</h4>
            <p className="text-danger">
              {selectedDate.format("dddd, MMMM D, YYYY")}
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
                disabled={!isBookingLunch() || isWeekend(dayjs())}
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
                disabled={!isBookingDinner() || isWeekend(dayjs())}
                onChange={() => setMealType("Dinner")}
              />
              <label className="form-check-label" htmlFor="dinner">
                Dinner
              </label>
            </div>
          </div>
          <div className="mt-5">
            {mealType ? (
              <Button
                type="submit"
                buttonName="Book a Meal"
                className="btn btn-danger w-100 text-center"
              ></Button>
            ) : (
              <Button
                buttonName="Select Meal Type"
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

export default QuickMeal;
