import Button from "../Components/Button";
import React, { useEffect, useState } from "react";
import Styles from "../Css/CancelPopup.module.css";
import InputField from "../Components/InputField";
import axios from "axios";
import cookie from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import { SuccessToast, toastStyle } from "../Constants/general";
import Spinner from "../Components/Spinner";

const CancelPopup = ({
  handleCloseCancel,
  selectedDate,
  onCancel,
  mealType,
}) => {
  const { id } = JSON.parse(cookie.get("UserCookie"));
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:8080/meal-booking/cancel/${id}/${
          mealType === "LUNCH" ? 1 : 2
        }/${selectedDate.format("YYYY-MM-DD")}`
      );
      if (response.status === 200) {
        toast.success(response.data, SuccessToast);
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
