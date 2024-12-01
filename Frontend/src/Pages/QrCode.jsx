import React from "react";
import Styles from "../Css/QrCode.module.css";
import QRCode from "react-qr-code";
import Button from "../Components/Button";
import axios from "axios";

function QrCode({ id, coupen, userName, hasLunch, stopQr }) {
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
        value={`${id} , ${userName}, ${coupen} ,${
          hasLunch ? "Lunch" : "Dinner"
        }`}
        viewBox={`0 0 256 256`}
      />
      <div>
        <ul className="text-start mt-4">
          <li><span>User Name:</span> {userName}</li>
          <li><span>Meal Type:</span> {hasLunch ? "Lunch" : "Dinner"}</li>
          <li><span>Coupen code:</span> {coupen}</li>
        </ul>
      </div>
    </div>
  );
}

export default QrCode;
