import Button from "./Button";
import React, { useContext, useState } from "react";
import Styles from "../Css/CancelPopup.module.css";
import axios from "axios";
import cookie from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import { toastStyle } from "../Constants/general";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { API_URLS } from "../Apis/endpoint";

const CancelPopup = ({
  handleCloseCancel,
  selectedDate,
  onCancel,
  mealType,
}) => {
  const { id } = JSON.parse(cookie.get("UserCookie"));
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("authToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        API_URLS.CANCEL_BOOKING(id,mealType,selectedDate),
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data, toastStyle);
        setTimeout(() => {
          handleCloseCancel();
          onCancel();
        }, 1800);
      }
    } catch (error) {
      if (error.status === 400) {
        const errorMessage =
          error.response?.data || "Something went wrong! Please try again.";
        toast.error(errorMessage, toastStyle);
      } else if (error.response.status === 401) {
        toast.error("Session Timeout Please Login Again", toastStyle);
        setTimeout(()=>{
          navigate("/login");
        },1500);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form
        className={`${Styles["cancel-main"]} animate__animated animate__fadeIn animate__fast`}
        onSubmit={handleSubmit}
      >
        <p className={`${Styles["cancel-req"]} font-weight-bold`}>
          Are you sure you want to cancel the meal?
        </p>
        <div className="mt-4">
          <Button
            className="btn btn-danger mx-2 px-4"
            type="submit"
            buttonName="Yes"
          />
          <Button
            className="btn btn-danger mx-2 px-4"
            buttonName="No"
            onClick={handleCloseCancel}
          />
        </div>
      </form>
      {loading && <Spinner />}
      <ToastContainer />
    </>
  );
};

export default CancelPopup;
