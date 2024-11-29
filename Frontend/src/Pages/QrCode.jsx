import React from "react";
import Styles from "../Css/QrCode.module.css";
import QRCode from "react-qr-code";
import Button from "../Components/Button";

function QrCode({ stopQr }) {
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
        value="id=1 qrCode=123"
        viewBox={`0 0 256 256`}
      />
    </div>
  );
}

export default QrCode;
