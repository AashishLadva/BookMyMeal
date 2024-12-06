import React, { useEffect, useState } from "react";
import Styles from "../Css/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BookMeal from "./BookMeal";
import "animate.css";
import Button from "../Components/Button";
import Calender from "../Components/Calender";
import { FaLocationDot } from "react-icons/fa6";
import dayjs from "dayjs";
import ViewBookings from "./ViewBookings";
import CancelMeal from "../Components/CancelMeal";
import MealOfTheDay from "./MealOfTheDay";
import QuickMeal from "./QuickMeal";
import axios from "axios";
import Cookie from "js-cookie";
import Spinner from "../Components/Spinner";
import QrCode from "./QrCode";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { toastStyle } from "../Constants/general";
import { API_URLS } from "../Apis/endpoint";

const Home = () => {
  const todayDateTime = dayjs();
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openViewBooking, setOpenViewBooking] = useState(false);
  const [selectedDate, setselectedDate] = useState(todayDateTime);
  const [quickMeal, setQuickMeal] = useState(false);
  const [bookedDate, setBookedDate] = useState([]);
  const { id, userName } = JSON.parse(Cookie.get("UserCookie"));
  const [loading, setLoading] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [coupen, setCoupen] = useState(null);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("authToken");
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    const fetchHoliday = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URLS.FETCH_HOLIDAYS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        if (response.status === 200) {
          const holidayDates = result.map((item) => dayjs(item));
          setHolidays(holidayDates);
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response, toastStyle);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchHoliday();
  }, []);

  const isWeekend = (date) => {
    const day = date.day();
    return (
      day === 0 ||
      day === 6 ||
      holidays.some((holiday) => holiday.isSame(date, "day"))
    );
  };

  useEffect(() => {
    const fetchMealBookings = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_URLS.DISPAL_BOOKING(id), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setBookedDate(
            response.data.map((item) => ({
              date: dayjs(item.date),
              mealType: item.mealType,
            }))
          );
        }
      } catch (error) {
        if (error.response.status === 401) {
          toast.error("Session Timeout Please Login Again", toastStyle);
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMealBookings();
  }, [openPopUp, quickMeal, refreshData]);

  const CancelMealShow = () => {
    const mealsForSelectedDate = bookedDate.filter((item) =>
      selectedDate.isSame(item.date, "day")
    );

    const hasLunch = mealsForSelectedDate.some(
      (item) => item.mealType === "LUNCH"
    );
    const hasDinner = mealsForSelectedDate.some(
      (item) => item.mealType === "DINNER"
    );

    return { hasLunch, hasDinner, mealsForSelectedDate };
  };
  const { hasLunch, hasDinner, mealsForSelectedDate } = CancelMealShow();
  const quickAddMeal = () => {
    return (
      selectedDate.isSame(todayDateTime, "day") &&
      todayDateTime.isAfter(todayDateTime.hour(10).minute(0)) &&
      todayDateTime.isBefore(todayDateTime.hour(15).minute(0)) &&
      !isWeekend(selectedDate)
    );
  };

  const showQrButtonVisible = () => {
    const isWithinTimeRange = (startHour, startMinute, endHour, endMinute) => {
      return (
        todayDateTime.isAfter(
          todayDateTime.hour(startHour).minute(startMinute)
        ) &&
        todayDateTime.isBefore(todayDateTime.hour(endHour).minute(endMinute))
      );
    };

    if (!selectedDate.isSame(todayDateTime, "day")) {
      return false;
    }

    switch (true) {
      case hasLunch && hasDinner:
        return (
          isWithinTimeRange(12, 0, 15, 0) || isWithinTimeRange(20, 0, 22, 0)
        );
      case hasLunch:
        return isWithinTimeRange(12, 0, 15, 0);
      case hasDinner:
        return isWithinTimeRange(20, 0, 22, 0);
      default:
        return false;
    }
  };

  const fetchQr = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        API_URLS.GET_COUPON_DETAILS(id, hasLunch, selectedDate),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setShowQr(true);
        setCoupen(response.data);
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("Session Timeout Please Login Again", toastStyle);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        toast.error(error.response?.data || error.message, toastStyle);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {openViewBooking && (
        <ViewBookings closeViewBooking={() => setOpenViewBooking(false)} />
      )}
      <div className={`${Styles["book-main"]} container-xl text-center my-5`}>
        <div className="row mb-3">
          <div className="col-6 text-start">
            <Button
              buttonName="View Booking"
              className="btn btn-danger"
              onClick={() => setOpenViewBooking(true)}
            />
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
            <Calender
              isWeekend={isWeekend}
              handleOnChange1={(date) => setselectedDate(date)}
              bookedDate={bookedDate}
              hasLunch={hasLunch}
            />
          </div>
          <div className="col-md-6">
            <p className={Styles.date}>
              {selectedDate.format("dddd, MMMM D, YYYY")}
            </p>
            {mealsForSelectedDate.length === 0 ? (
              <p className="my-4">No Booking found for selected Date!</p>
            ) : (
              <>
                {hasLunch && (
                  <CancelMeal
                    key="lunch"
                    selectedDate={selectedDate}
                    mealType="LUNCH"
                    onCancel={() => setRefreshData(!refreshData)}
                  />
                )}
                {hasDinner && (
                  <CancelMeal
                    key="dinner"
                    selectedDate={selectedDate}
                    mealType="DINNER"
                    onCancel={() => setRefreshData(!refreshData)}
                  />
                )}
              </>
            )}
            {showQrButtonVisible() ? (
              <Button
                buttonName="Show QR"
                className="btn btn-outline-danger border-2 animate__animated animate__fadeInUp"
                onClick={fetchQr}
              />
            ) : null}
            {showQr && (
              <QrCode
                id={id}
                coupen={coupen}
                selectedDate={selectedDate}
                userName={userName}
                stopQr={() => setShowQr(false)}
              />
            )}
            <MealOfTheDay selectedDate={selectedDate} />
          </div>
        </div>
        {quickAddMeal() && (
          <Button
            className="btn btn-danger mt-4 mx-2 animate__animated animate__fadeInUp"
            buttonName="Quick Book"
            onClick={() => setQuickMeal(true)}
          />
        )}
        <Button
          className="btn btn-danger mt-4"
          buttonName="Book a meal"
          onClick={() => setOpenPopUp(true)}
        ></Button>
        {openPopUp && (
          <BookMeal
            isWeekend={isWeekend}
            closePopUp={() => setOpenPopUp(false)}
          />
        )}
        {quickMeal && (
          <QuickMeal
            closeQuickMeal={() => setQuickMeal(false)}
            selectedDate={selectedDate}
            isWeekend={isWeekend}
          />
        )}
      </div>
      {loading && <Spinner />}
      <ToastContainer />
    </>
  );
};

export default Home;
