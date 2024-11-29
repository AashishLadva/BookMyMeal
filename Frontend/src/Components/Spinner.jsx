import React from "react";
import Styles from "../Css/Spinner.module.css";

const Spinner = () => {
  return (
    <div
      className={`${Styles["spinner-main"]} animate__animated animate__fadeIn animate__fast text-center`}
    >
      <div className="spinner-grow text-success " role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
