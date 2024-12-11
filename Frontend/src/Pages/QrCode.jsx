import React from "react";
import Styles from "../Css/QrCode.module.css";
import QRCode from "react-qr-code";
import Button from "../Components/Button";
import dayjs from "dayjs";

const QrCode = ({ id, coupen, userName, stopQr, selectedDate }) => {
  const hasLunch = () => {
    return dayjs().hour() < 15;
  };
  return (
    <div
      className={`${Styles["qr-main"]} animate__animated animate__zoomIn animate__fast`}
    >
      <header>
        <h5>Please Scan QR</h5>{" "}
        <Button
          type="button"
          className="btn-close"
          onClick={stopQr}
          aria-label="Close"
        />
      </header>

      <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "100%", width: "50%" }}
        value={`user id:${id} , User Name:${userName}, Date:${selectedDate.format(
          "dddd, MMMM D, YYYY"
        )}, MealType:${hasLunch() ? "Lunch" : "Dinner"}, coupen:${coupen} `}
        viewBox={`0 0 256 256`}
      />
      <div className="text-center mt-3">
        <div>
          <span>User Name:</span> {userName}
        </div>
        <div>
          <span>Meal Type:</span> {hasLunch() ? "Lunch" : "Dinner"}
        </div>
        <div>
          <span>User Id:</span> {id}
        </div>
      </div>
    </div>
  );
};

export default QrCode;
